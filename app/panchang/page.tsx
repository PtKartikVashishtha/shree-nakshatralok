import { prisma } from "@/lib/prisma";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import PanchangViewClient, { PublicPanchangData } from "@/components/panchang/PanchangViewClient";
import type { Metadata } from "next";

const siteUrl = "https://shree-nakshatralok.vercel.app";

type Props = {
  searchParams: Promise<{ date?: string }>;
};

// Helper for Indian Standard Time today string YYYY-MM-DD
function getTodayIST(): string {
  const istOffset = 5.5 * 60 * 60 * 1000;
  const nowIST = new Date(Date.now() + istOffset);
  return nowIST.toISOString().split("T")[0];
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { date } = await searchParams;
  const today = getTodayIST();
  const targetDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : today;

  const entry = await prisma.panchang.findFirst({
    where: { date: targetDate, status: "PUBLISHED" },
  });

  const [y, m, d] = targetDate.split("-").map(Number);
  const formatted = new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const title = `Aaj Ka Panchang - ${formatted} | Daily Vedic Almanac | Shree Nakshatralok`;

  const description = entry
    ? `Daily Vedic Panchang for ${formatted}: Tithi: ${entry.tithi}, Nakshatra: ${entry.nakshatra}, Sunrise: ${entry.sunrise}, Sunset: ${entry.sunset}, Abhijit Muhurat: ${entry.abhijitMuhurat || "Available"}, Rahukaal: ${entry.rahukaal || "Check timings"}.`
    : `Daily Vedic Panchang for ${formatted} with Tithi, Nakshatra, Yoga, Karana, Abhijit Muhurat and Rahukaal from Shree Nakshatralok Jyotish Sansthan.`;

  return {
    title,
    description,
    keywords: [
      "Aaj Ka Panchang",
      "Today Panchang",
      "Daily Panchang",
      "Hindu Calendar",
      "Tithi Today",
      "Nakshatra Today",
      "Abhijit Muhurat Today",
      "Rahukaal Today",
      "Muzaffarnagar Panchang",
      "Vedic Panchang",
    ],
    alternates: {
      canonical: date ? `/panchang?date=${targetDate}` : "/panchang",
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/panchang${date ? `?date=${targetDate}` : ""}`,
      type: "website",
      siteName: "Shree Nakshatralok Jyotish Sansthan",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Shree Nakshatralok Daily Panchang",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function PanchangPage({ searchParams }: Props) {
  const { date } = await searchParams;
  const todayDate = getTodayIST();
  const targetDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : todayDate;

  // Only published Panchang
  const entry = await prisma.panchang.findFirst({
    where: {
      date: targetDate,
      status: "PUBLISHED",
    },
  });

  const formattedPanchang: PublicPanchangData | null = entry
    ? {
        id: entry.id,
        date: entry.date,
        dayName: entry.dayName,
        location: entry.location,
        sunrise: entry.sunrise,
        sunset: entry.sunset,
        moonrise: entry.moonrise,
        moonset: entry.moonset,
        tithi: entry.tithi,
        nakshatra: entry.nakshatra,
        yoga: entry.yoga,
        karana: entry.karana,
        paksha: entry.paksha,
        vikramSamvat: entry.vikramSamvat,
        shakaSamvat: entry.shakaSamvat,
        ayana: entry.ayana,
        ritu: entry.ritu,
        moonSign: entry.moonSign,
        sunSign: entry.sunSign,
        rahukaal: entry.rahukaal,
        yamaganda: entry.yamaganda,
        gulikaKaal: entry.gulikaKaal,
        abhijitMuhurat: entry.abhijitMuhurat,
        brahmaMuhurat: entry.brahmaMuhurat,
        auspiciousTimings: entry.auspiciousTimings,
        inauspiciousTimings: entry.inauspiciousTimings,
        festivals: entry.festivals,
        specialNotes: entry.specialNotes,
      }
    : null;

  // JSON-LD structured data
  const panchangStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Daily Vedic Panchang for ${targetDate}`,
    description: `Vedic Panchang calendar including Tithi, Nakshatra, Yoga, Karana, and Muhurat timings for ${targetDate}.`,
    url: `${siteUrl}/panchang?date=${targetDate}`,
    publisher: {
      "@type": "Organization",
      name: "Shree Nakshatralok Jyotish Sansthan",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
    about: {
      "@type": "Thing",
      name: "Panchangam / Hindu Vedic Calendar",
    },
  };

  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(panchangStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <PublicHeader activePage="panchang" />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#300604] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute -right-12 -top-20 h-80 w-80 rounded-full border border-[#d7ad63]" />
          <div className="absolute left-[-10rem] bottom-[-16rem] h-[32rem] w-[32rem] rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#d7ad63]">
              ॥ श्री गणेशाय नमः ॥ · दैनिक वैदिक पञ्चाङ्ग
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-[#f5dfad] sm:text-5xl md:text-6xl">
              आज का पंचांग एवं
              <br />
              <em>शुभ मुहूर्त</em>
            </h1>
            <p className="mt-5 text-base leading-8 text-[#d8c8b8] md:text-lg max-w-2xl">
              ऋषि परंपरा और वैदिक ज्योतिष के प्रामाणिक सिद्धांतों पर आधारित दैनिक तिथि, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त, अभिजीत मुहूर्त एवं राहुकाल का सम्पूर्ण विवरण।
            </p>
          </div>
        </div>
      </section>

      {/* PANCHANG CONTAINER */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <PanchangViewClient
          currentDate={targetDate}
          panchang={formattedPanchang}
          todayDate={todayDate}
        />
      </section>

      <PublicFooter />
    </main>
  );
}
