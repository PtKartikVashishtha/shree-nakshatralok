import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import PanchangListClient, { PanchangListItem } from "@/components/admin/PanchangListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panchang Management | Admin | Shree Nakshatralok",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPanchangPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  const entries = await prisma.panchang.findMany({
    orderBy: { date: "desc" },
  });

  const formattedEntries: PanchangListItem[] = entries.map((e) => ({
    id: e.id,
    date: e.date,
    dayName: e.dayName,
    location: e.location,
    sunrise: e.sunrise,
    sunset: e.sunset,
    tithi: e.tithi,
    nakshatra: e.nakshatra,
    paksha: e.paksha,
    festivals: e.festivals,
    status: e.status as "DRAFT" | "PUBLISHED",
    createdAt: e.createdAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-[#f5efe4] text-[#291412]">
      <AdminNav userEmail={session.user.email} onLogout={logout} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            DAILY CALENDAR & MUHURAT
          </p>
          <div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-4xl font-medium text-[#57120d] md:text-5xl">
                Daily Panchang CMS
              </h1>
              <p className="mt-2 text-sm text-[#806d66]">
                Publish daily Vedic Panchang, Tithi, Nakshatra, Yoga, Muhurats, and festival timings for your devotees and visitors.
              </p>
            </div>
          </div>
        </div>

        <PanchangListClient initialEntries={formattedEntries} />
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
