import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const MIME_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

function verifyMagicBytes(buffer: Buffer, mime: string): boolean {
  if (mime === "image/jpeg") {
    return (
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    );
  }
  if (mime === "image/png") {
    return (
      buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    );
  }
  if (mime === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    );
  }
  return false;
}

export async function POST(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit." },
        { status: 400 }
      );
    }

    const ext = MIME_MAP[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Invalid image format. Allowed: JPG, PNG, WEBP." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!verifyMagicBytes(buffer, file.type)) {
      return NextResponse.json(
        { error: "File contents do not match genuine image signature." },
        { status: 400 }
      );
    }

    // Safe random filename to prevent path traversal
    const safeFilename = `sn_${crypto.randomUUID()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    const fullPath = path.join(uploadDir, safeFilename);

    await writeFile(fullPath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${safeFilename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Image upload failed." },
      { status: 500 }
    );
  }
}
