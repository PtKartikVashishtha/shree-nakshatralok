import { NextResponse } from "next/server";
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

  const filePath = path.join(process.cwd(), "public", "uploads", filename);

  try {
    const buffer = await readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType = MIME_MAP[ext] || "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
