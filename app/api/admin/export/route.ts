import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function csv(value: string) {
  return `"${String(value)
    .replaceAll('"', '""')
    .replaceAll("\r", " ")
    .replaceAll("\n", " ")}"`;
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const submissions =
      await prisma.submission.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    const header = [
      "Name",
      "Date of Birth",
      "Birth Time",
      "Address",
      "Question",
      "Status",
      "Created At",
    ];

    const rows = submissions.map((item) => [
      item.name,
      item.dob,
      item.birthTime,
      item.address,
      item.question,
      item.status,
      item.createdAt.toISOString(),
    ]);

    const csvContent = [
      header.map(csv).join(","),
      ...rows.map((row) =>
        row.map(csv).join(",")
      ),
    ].join("\r\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type":
          "text/csv; charset=utf-8",

        "Content-Disposition":
          'attachment; filename="nakshatralok-submissions.csv"',

        "Cache-Control":
          "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error(
      "CSV export error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to export submissions.",
      },
      {
        status: 500,
      }
    );
  }
}