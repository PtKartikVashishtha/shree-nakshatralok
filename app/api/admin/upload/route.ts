import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 15 MB limit to accommodate high-res camera photos from phones and desktops
const MAX_SIZE = 15 * 1024 * 1024;

interface DetectedImage {
  ext: string;
  mime: string;
}

/**
 * Robust binary inspection to detect genuine image signatures
 * independent of client-reported MIME types or OS differences.
 */
function detectImageType(buffer: Buffer): DetectedImage | null {
  // JPEG (SOI: 0xFF 0xD8)
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    return { ext: ".jpg", mime: "image/jpeg" };
  }

  // PNG (\x89PNG\r\n\x1a\n)
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { ext: ".png", mime: "image/png" };
  }

  // WebP (RIFF .... WEBP)
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return { ext: ".webp", mime: "image/webp" };
  }

  // GIF (GIF87a or GIF89a)
  if (
    buffer.length >= 6 &&
    (buffer.toString("ascii", 0, 6) === "GIF87a" ||
      buffer.toString("ascii", 0, 6) === "GIF89a")
  ) {
    return { ext: ".gif", mime: "image/gif" };
  }

  // AVIF (....ftypavif or ....ftypavis)
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 4, 8) === "ftyp" &&
    (buffer.toString("ascii", 8, 12) === "avif" ||
      buffer.toString("ascii", 8, 12) === "avis")
  ) {
    return { ext: ".avif", mime: "image/avif" };
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 15MB limit. Please choose a smaller image." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "Uploaded file is empty." },
        { status: 400 }
      );
    }

    const detected = detectImageType(buffer);
    if (!detected) {
      return NextResponse.json(
        {
          error:
            "Invalid image format. Genuine JPG, PNG, WEBP, GIF, or AVIF files are supported.",
        },
        { status: 400 }
      );
    }

    // Safe random filename to prevent path traversal
    const safeFilename = `sn_${crypto.randomUUID()}${detected.ext}`;

    // 1. Persist directly into MongoDB (Atlas) - works 100% reliably in serverless / Vercel
    await prisma.uploadedImage.upsert({
      where: { filename: safeFilename },
      create: {
        filename: safeFilename,
        mimeType: detected.mime,
        data: buffer,
        size: buffer.length,
      },
      update: {
        mimeType: detected.mime,
        data: buffer,
        size: buffer.length,
      },
    });

    // 2. Best-effort write to local filesystem (works in local dev, caught gracefully on read-only serverless)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const fullPath = path.join(uploadDir, safeFilename);
      await writeFile(fullPath, buffer);
    } catch {
      // On Vercel / serverless environments the filesystem is read-only.
      // The image is already safely stored in MongoDB and served via /uploads/[filename].
    }

    return NextResponse.json({
      success: true,
      url: `/uploads/${safeFilename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Image upload failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
