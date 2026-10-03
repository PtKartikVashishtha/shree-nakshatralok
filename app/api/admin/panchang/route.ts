import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { panchangSchema } from "@/lib/validations/panchang";

export async function GET(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date")?.trim();
    const month = searchParams.get("month")?.trim(); // e.g. "2026-10"
    const status = searchParams.get("status")?.trim();

    const where: Record<string, unknown> = {};

    if (date) {
      where.date = date;
    } else if (month) {
      where.date = { startsWith: month };
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    const entries = await prisma.panchang.findMany({
      where,
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Fetch panchang list error:", error);
    return NextResponse.json(
      { error: "Unable to retrieve panchang records." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = panchangSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check for duplicate date
    const existing = await prisma.panchang.findUnique({
      where: { date: data.date },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: `A Panchang entry for date ${data.date} already exists. Please edit the existing entry instead.`,
        },
        { status: 409 }
      );
    }

    // Parse date for dateObj sorting
    const parsedDate = new Date(`${data.date}T12:00:00Z`);

    const panchang = await prisma.panchang.create({
      data: {
        date: data.date,
        dateObj: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
        dayName: data.dayName,
        location: data.location || "Muzaffarnagar, Uttar Pradesh",
        sunrise: data.sunrise,
        sunset: data.sunset,
        moonrise: data.moonrise || null,
        moonset: data.moonset || null,
        tithi: data.tithi,
        nakshatra: data.nakshatra,
        yoga: data.yoga,
        karana: data.karana,
        paksha: data.paksha,
        vikramSamvat: data.vikramSamvat || null,
        shakaSamvat: data.shakaSamvat || null,
        ayana: data.ayana || null,
        ritu: data.ritu || null,
        moonSign: data.moonSign || null,
        sunSign: data.sunSign || null,
        rahukaal: data.rahukaal || null,
        yamaganda: data.yamaganda || null,
        gulikaKaal: data.gulikaKaal || null,
        abhijitMuhurat: data.abhijitMuhurat || null,
        brahmaMuhurat: data.brahmaMuhurat || null,
        auspiciousTimings: data.auspiciousTimings || null,
        inauspiciousTimings: data.inauspiciousTimings || null,
        festivals: data.festivals || null,
        specialNotes: data.specialNotes || null,
        status: data.status,
      },
    });

    return NextResponse.json({ success: true, panchang }, { status: 201 });
  } catch (error: unknown) {
    console.error("Create panchang error:", error);

    // Handle race condition Prisma P2002 duplicate key constraint
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A Panchang entry for this date already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Unable to create Panchang entry." },
      { status: 500 }
    );
  }
}
