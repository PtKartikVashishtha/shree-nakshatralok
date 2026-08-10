import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const allowedStatuses = [
  "NEW",
  "CONTACTED",
  "COMPLETED",
] as const;

type Status = (typeof allowedStatuses)[number];

export async function PATCH(
  request: Request,
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

    const body = await request.json();

    const status = body.status as Status;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status." },
        { status: 400 }
      );
    }

    const existing = await prisma.submission.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Submission not found." },
        { status: 404 }
      );
    }

    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        status: submission.status,
      },
    });
  } catch (error) {
    console.error("Update status error:", error);

    return NextResponse.json(
      {
        error: "Unable to update submission status.",
      },
      {
        status: 500,
      }
    );
  }
}