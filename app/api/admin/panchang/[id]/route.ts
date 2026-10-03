import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { panchangSchema } from "@/lib/validations/panchang";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const entry = await prisma.panchang.findUnique({
      where: { id },
    });

    if (!entry) {
      return NextResponse.json(
        { error: "Panchang entry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ entry });
  } catch (error) {
    console.error("Get panchang error:", error);
    return NextResponse.json(
      { error: "Unable to retrieve panchang entry." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.panchang.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Panchang entry not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const partialSchema = panchangSchema.partial();
    const validation = partialSchema.safeParse(body);

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

    // Check date uniqueness if date is being modified
    if (data.date && data.date !== existing.date) {
      const conflict = await prisma.panchang.findFirst({
        where: {
          date: data.date,
          NOT: { id },
        },
        select: { id: true },
      });

      if (conflict) {
        return NextResponse.json(
          {
            error: `Another Panchang entry for date ${data.date} already exists.`,
          },
          { status: 409 }
        );
      }
    }

    const updatePayload: Record<string, unknown> = {};

    if (data.date !== undefined) {
      updatePayload.date = data.date;
      const parsed = new Date(`${data.date}T12:00:00Z`);
      if (!isNaN(parsed.getTime())) {
        updatePayload.dateObj = parsed;
      }
    }
    if (data.dayName !== undefined) updatePayload.dayName = data.dayName;
    if (data.location !== undefined) updatePayload.location = data.location;
    if (data.sunrise !== undefined) updatePayload.sunrise = data.sunrise;
    if (data.sunset !== undefined) updatePayload.sunset = data.sunset;
    if (data.moonrise !== undefined) updatePayload.moonrise = data.moonrise || null;
    if (data.moonset !== undefined) updatePayload.moonset = data.moonset || null;
    if (data.tithi !== undefined) updatePayload.tithi = data.tithi;
    if (data.nakshatra !== undefined) updatePayload.nakshatra = data.nakshatra;
    if (data.yoga !== undefined) updatePayload.yoga = data.yoga;
    if (data.karana !== undefined) updatePayload.karana = data.karana;
    if (data.paksha !== undefined) updatePayload.paksha = data.paksha;
    if (data.vikramSamvat !== undefined) updatePayload.vikramSamvat = data.vikramSamvat || null;
    if (data.shakaSamvat !== undefined) updatePayload.shakaSamvat = data.shakaSamvat || null;
    if (data.ayana !== undefined) updatePayload.ayana = data.ayana || null;
    if (data.ritu !== undefined) updatePayload.ritu = data.ritu || null;
    if (data.moonSign !== undefined) updatePayload.moonSign = data.moonSign || null;
    if (data.sunSign !== undefined) updatePayload.sunSign = data.sunSign || null;
    if (data.rahukaal !== undefined) updatePayload.rahukaal = data.rahukaal || null;
    if (data.yamaganda !== undefined) updatePayload.yamaganda = data.yamaganda || null;
    if (data.gulikaKaal !== undefined) updatePayload.gulikaKaal = data.gulikaKaal || null;
    if (data.abhijitMuhurat !== undefined) updatePayload.abhijitMuhurat = data.abhijitMuhurat || null;
    if (data.brahmaMuhurat !== undefined) updatePayload.brahmaMuhurat = data.brahmaMuhurat || null;
    if (data.auspiciousTimings !== undefined) updatePayload.auspiciousTimings = data.auspiciousTimings || null;
    if (data.inauspiciousTimings !== undefined) updatePayload.inauspiciousTimings = data.inauspiciousTimings || null;
    if (data.festivals !== undefined) updatePayload.festivals = data.festivals || null;
    if (data.specialNotes !== undefined) updatePayload.specialNotes = data.specialNotes || null;
    if (data.status !== undefined) updatePayload.status = data.status;

    const updated = await prisma.panchang.update({
      where: { id },
      data: updatePayload,
    });

    return NextResponse.json({ success: true, panchang: updated });
  } catch (error) {
    console.error("Update panchang error:", error);
    return NextResponse.json(
      { error: "Unable to update panchang entry." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.panchang.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Panchang entry not found." },
        { status: 404 }
      );
    }

    await prisma.panchang.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete panchang error:", error);
    return NextResponse.json(
      { error: "Unable to delete panchang entry." },
      { status: 500 }
    );
  }
}
