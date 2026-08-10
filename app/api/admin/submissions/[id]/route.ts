import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await prisma.submission.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Submission not found." },
        { status: 404 }
      );
    }

    await prisma.submission.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete submission error:", error);

    return NextResponse.json(
      {
        error: "Unable to delete submission.",
      },
      {
        status: 500,
      }
    );
  }
}