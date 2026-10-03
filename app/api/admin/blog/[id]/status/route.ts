import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

const allowedStatuses = ["DRAFT", "PUBLISHED"] as const;
type Status = (typeof allowedStatuses)[number];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const status = body.status as Status;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be DRAFT or PUBLISHED." },
        { status: 400 }
      );
    }

    const existing = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found." },
        { status: 404 }
      );
    }

    const updateData: { status: Status; publishedAt?: Date } = { status };
    if (status === "PUBLISHED" && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      post: {
        id: updated.id,
        status: updated.status,
        publishedAt: updated.publishedAt,
      },
    });
  } catch (error) {
    console.error("Update blog status error:", error);
    return NextResponse.json(
      { error: "Unable to update status." },
      { status: 500 }
    );
  }
}
