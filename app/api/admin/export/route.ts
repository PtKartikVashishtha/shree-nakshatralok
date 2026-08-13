import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function csv(value: string | null | undefined) {
  return `"${String(value ?? "")
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
      "Type",

      "Requester Name",
      "Requester Address",

      "Name",
      "Date of Birth",
      "Birth Time",

      "Person 1 Name",
      "Person 1 Date of Birth",
      "Person 1 Birth Time",
      "Person 1 Birth Place",

      "Person 2 Name",
      "Person 2 Date of Birth",
      "Person 2 Birth Time",
      "Person 2 Birth Place",

      "Question",

      "Status",
      "Created At",
    ];

    const rows = submissions.map((item) => [
      item.type,

      item.name,
      item.address,

      item.name,
      item.dob,
      item.birthTime,

      item.person1Name,
      item.person1Dob,
      item.person1BirthTime,
      item.person1BirthPlace,

      item.person2Name,
      item.person2Dob,
      item.person2BirthTime,
      item.person2BirthPlace,

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
        error:
          "Unable to export submissions.",
      },
      {
        status: 500,
      }
    );
  }
}