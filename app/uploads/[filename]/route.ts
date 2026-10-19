import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Security: prevent directory traversal or suspicious filenames
  if (
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\") ||
    !/^sn_[a-zA-Z0-9_\-.]+\.[a-zA-Z0-9]+$/.test(filename)
  ) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const ext = path.extname(filename).toLowerCase();
  const defaultContentType = MIME_MAP[ext] || "application/octet-stream";

  // 1. Try reading from local filesystem (fastest on localhost or if cached)
  try {
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": defaultContentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // If not on local disk (normal on Vercel serverless), fall through to MongoDB
  }

  // 2. Fallback: Query MongoDB (Atlas) where images are persistently stored
  try {
    const record = await prisma.uploadedImage.findUnique({
      where: { filename },
      select: { data: true, mimeType: true },
    });

    if (record && record.data) {
      return new NextResponse(Buffer.from(record.data), {
        headers: {
          "Content-Type": record.mimeType || defaultContentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (dbErr) {
    console.error("Error retrieving image from database:", dbErr);
  }

  return NextResponse.json({ error: "Image not found" }, { status: 404 });
}
