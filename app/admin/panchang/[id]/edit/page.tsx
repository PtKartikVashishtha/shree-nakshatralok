import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import PanchangForm, { PanchangFormData } from "@/components/admin/PanchangForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Panchang | Admin | Shree Nakshatralok",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditPanchangPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const entry = await prisma.panchang.findUnique({
    where: { id },
  });

  if (!entry) {
    notFound();
  }

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  const initialData: PanchangFormData = {
    id: entry.id,
    date: entry.date,
    dayName: entry.dayName,
    location: entry.location,
    sunrise: entry.sunrise,
    sunset: entry.sunset,
    moonrise: entry.moonrise || "",
    moonset: entry.moonset || "",
    tithi: entry.tithi,
    nakshatra: entry.nakshatra,
    yoga: entry.yoga,
    karana: entry.karana,
    paksha: entry.paksha,
    vikramSamvat: entry.vikramSamvat || "",
    shakaSamvat: entry.shakaSamvat || "",
    ayana: entry.ayana || "",
    ritu: entry.ritu || "",
    moonSign: entry.moonSign || "",
    sunSign: entry.sunSign || "",
    rahukaal: entry.rahukaal || "",
    yamaganda: entry.yamaganda || "",
    gulikaKaal: entry.gulikaKaal || "",
    abhijitMuhurat: entry.abhijitMuhurat || "",
    brahmaMuhurat: entry.brahmaMuhurat || "",
    auspiciousTimings: entry.auspiciousTimings || "",
    inauspiciousTimings: entry.inauspiciousTimings || "",
    festivals: entry.festivals || "",
    specialNotes: entry.specialNotes || "",
    status: entry.status as "DRAFT" | "PUBLISHED",
  };

  return (
    <main className="min-h-screen bg-[#f5efe4] text-[#291412]">
      <AdminNav userEmail={session.user.email} onLogout={logout} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <PanchangForm initialData={initialData} isEditing />
      </section>

      <footer className="border-t border-[#d8c9b3] bg-[#eee6d8] mt-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-center text-[10px] tracking-wide text-[#8c796b] md:flex-row md:items-center md:justify-between md:px-8 md:text-left">
          <span>© {new Date().getFullYear()} Shree Nakshatralok Jyotish Sansthan</span>
          <span className="font-medium text-[#7a6456]">
            Made by Kartik Vashishtha <span className="text-[#c93b3b] font-sans">♥</span>
          </span>
          <span className="text-[#a2742e]">सत्य · सेवा · विश्वास</span>
        </div>
      </footer>
    </main>
  );
}
