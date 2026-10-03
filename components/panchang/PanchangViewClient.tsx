"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatHindiDateWithDay } from "@/lib/date";

export type PublicPanchangData = {
  id: string;
  date: string;
  dayName: string;
  location: string;
  sunrise: string;
  sunset: string;
  moonrise: string | null;
  moonset: string | null;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  paksha: string;
  vikramSamvat: string | null;
  shakaSamvat: string | null;
  ayana: string | null;
  ritu: string | null;
  moonSign: string | null;
  sunSign: string | null;
  rahukaal: string | null;
  yamaganda: string | null;
  gulikaKaal: string | null;
  abhijitMuhurat: string | null;
  brahmaMuhurat: string | null;
  auspiciousTimings: string | null;
  inauspiciousTimings: string | null;
  festivals: string | null;
  specialNotes: string | null;
};

type Props = {
  currentDate: string;
  panchang: PublicPanchangData | null;
  todayDate: string;
};

export default function PanchangViewClient({
  currentDate,
  panchang,
  todayDate,
}: Props) {
  const router = useRouter();

  // Helper to get previous or next date string
  const getAdjacentDate = (dateStr: string, offsetDays: number) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + offsetDays);
    const ny = date.getFullYear();
    const nm = String(date.getMonth() + 1).padStart(2, "0");
    const nd = String(date.getDate()).padStart(2, "0");
    return `${ny}-${nm}-${nd}`;
  };

  const prevDate = getAdjacentDate(currentDate, -1);
  const nextDate = getAdjacentDate(currentDate, 1);
  const isToday = currentDate === todayDate;

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      router.push(`/panchang?date=${val}`);
    }
  };

  // Deterministic human readable date format in Hindi with day name
  const formattedDisplayDate = formatHindiDateWithDay(currentDate);

  return (
    <div className="space-y-10">
      {/* DATE NAVIGATION BAR */}
      <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={`/panchang?date=${prevDate}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#ded1be] bg-[#faf5eb] px-4 py-2 text-xs font-semibold text-[#57120d] hover:bg-[#ede3d1] transition"
              title="पिछला दिन"
            >
              <span>←</span>
              <span>पिछला दिन</span>
            </Link>

            <Link
              href={`/panchang?date=${nextDate}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#ded1be] bg-[#faf5eb] px-4 py-2 text-xs font-semibold text-[#57120d] hover:bg-[#ede3d1] transition"
              title="अगला दिन"
            >
              <span>अगला दिन</span>
              <span>→</span>
            </Link>

            {!isToday && (
              <Link
                href="/panchang"
                className="rounded-full bg-[#5c130d] px-4 py-2 text-xs font-semibold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition"
              >
                आज का पंचांग
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-[#8c7462]">
              दिनांक चुनें (Select Date):
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={handleDateSelect}
              className="rounded-xl border border-[#ded1be] bg-[#faf5eb] px-3.5 py-1.5 text-xs font-medium text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>
        </div>

        {/* CURRENT DATE TITLE BANNER */}
        <div className="mt-6 border-t border-[#ebdcca] pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                दैनिक वैदिक पंचांग (Daily Vedic Almanac)
              </span>
              {isToday && (
                <span className="rounded-full bg-[#5c130d] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f2d99d]">
                  आज (TODAY)
                </span>
              )}
            </div>
            <h2 className="mt-1 font-serif text-3xl md:text-4xl text-[#57120d] font-medium leading-snug" suppressHydrationWarning>
              {formattedDisplayDate}
            </h2>
          </div>

          <div className="text-xs text-[#8c796b] md:text-right">
            <p className="font-semibold text-[#57120d]">
              📍 {panchang?.location || "मुजफ्फरनगर, उत्तर प्रदेश (Muzaffarnagar)"}
            </p>
            <p className="mt-0.5">भारतीय मानक समय (IST · UTC+5:30)</p>
          </div>
        </div>
      </div>

      {!panchang ? (
        /* EMPTY STATE FOR UNPUBLISHED DATE */
        <div className="rounded-3xl border border-dashed border-[#d8c9b5] bg-[#fffdf8] px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b976] bg-[#f8efdf] text-2xl text-[#ad7e2d]">
            ☉
          </div>
          <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
            इस दिनांक का पंचांग अभी उपलब्ध नहीं है
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#8c796c] leading-relaxed">
            {formattedDisplayDate} के लिए पारंपरिक वैदिक पंचांग अभी प्रकाशित नहीं हुआ है। आप आज का पंचांग देख सकते हैं अथवा कोई अन्य दिनांक चुन सकते हैं।
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/panchang"
              className="rounded-full bg-[#5c130d] px-7 py-3 text-xs font-bold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition"
            >
              आज का पंचांग देखें
            </Link>
            <a
              href="/#contact"
              className="rounded-full border border-[#ded1be] bg-[#fffdf8] px-6 py-3 text-xs font-semibold text-[#57120d] hover:bg-[#faf5eb] transition"
            >
              ज्योतिषी से परामर्श लें
            </a>
          </div>
        </div>
      ) : (
        /* FULL PANCHANG CARDS */
        <div className="space-y-8">
          {/* FESTIVAL / SPECIAL ALERT IF PRESENT */}
          {panchang.festivals && (
            <div className="overflow-hidden rounded-2xl border border-[#d7ad63] bg-gradient-to-r from-[#fff9ea] via-[#fffdf8] to-[#fff9ea] p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-[#a2742e]">🎉</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                    आज का प्रमुख पर्व / व्रत (Festival / Vrat of the Day)
                  </p>
                  <p className="font-serif text-xl font-semibold text-[#57120d]">
                    {panchang.festivals}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 1. SUN & MOON GOLD CARD */}
          <div className="rounded-3xl border border-[#ded1be] bg-gradient-to-br from-[#300604] to-[#4d100c] text-white p-8 shadow-md">
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#e5c67d]">
              सूर्य एवं चन्द्र समय · खगोलीय गणना
            </p>
            <div className="mt-6 grid gap-6 grid-cols-2 md:grid-cols-4">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <span className="text-2xl">🌅</span>
                <p className="mt-2 text-[11px] font-bold text-[#e5c67d]">
                  सूर्योदय (Sunrise)
                </p>
                <p className="mt-1 font-serif text-2xl font-semibold text-[#fffdf8]">
                  {panchang.sunrise}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <span className="text-2xl">🌇</span>
                <p className="mt-2 text-[11px] font-bold text-[#e5c67d]">
                  सूर्यास्त (Sunset)
                </p>
                <p className="mt-1 font-serif text-2xl font-semibold text-[#fffdf8]">
                  {panchang.sunset}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <span className="text-2xl">🌙</span>
                <p className="mt-2 text-[11px] font-bold text-[#e5c67d]">
                  चन्द्रोदय (Moonrise)
                </p>
                <p className="mt-1 font-serif text-2xl font-semibold text-[#fffdf8]">
                  {panchang.moonrise || "—"}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <span className="text-2xl">🌑</span>
                <p className="mt-2 text-[11px] font-bold text-[#e5c67d]">
                  चन्द्रास्त (Moonset)
                </p>
                <p className="mt-1 font-serif text-2xl font-semibold text-[#fffdf8]">
                  {panchang.moonset || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* 2. FIVE ELEMENTS (PANCHA-ANGA) */}
          <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-8 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
              पञ्चाङ्ग के मुख्य पाँच अंग
            </p>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#57120d]">
              वैदिक काल-गणना के पाँच प्रमुख स्तंभ
            </h3>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-6">
                <span className="text-xs font-bold tracking-widest text-[#a2742e]">
                  ०१ · तिथि (TITHI)
                </span>
                <h4 className="mt-2 font-serif text-2xl text-[#57120d]">
                  {panchang.tithi}
                </h4>
                <p className="mt-2 text-xs text-[#8c796b]">
                  पक्ष: <strong className="text-[#3b2520]">{panchang.paksha}</strong>
                </p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-6">
                <span className="text-xs font-bold tracking-widest text-[#a2742e]">
                  ०२ · नक्षत्र (NAKSHATRA)
                </span>
                <h4 className="mt-2 font-serif text-2xl text-[#57120d]">
                  {panchang.nakshatra}
                </h4>
                <p className="mt-2 text-xs text-[#8c796b]">चन्द्रमा का गोचर नक्षत्र</p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-6">
                <span className="text-xs font-bold tracking-widest text-[#a2742e]">
                  ०३ · योग (YOGA)
                </span>
                <h4 className="mt-2 font-serif text-2xl text-[#57120d]">
                  {panchang.yoga}
                </h4>
                <p className="mt-2 text-xs text-[#8c796b]">सूर्य एवं चन्द्र का कोणीय योग</p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-6">
                <span className="text-xs font-bold tracking-widest text-[#a2742e]">
                  ०४ · करण (KARANA)
                </span>
                <h4 className="mt-2 font-serif text-2xl text-[#57120d]">
                  {panchang.karana}
                </h4>
                <p className="mt-2 text-xs text-[#8c796b]">सक्रिय तिथि का आधा भाग</p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-6">
                <span className="text-xs font-bold tracking-widest text-[#a2742e]">
                  ०५ · वार (VAAR / DAY)
                </span>
                <h4 className="mt-2 font-serif text-2xl text-[#57120d]">
                  {panchang.dayName}
                </h4>
                <p className="mt-2 text-xs text-[#8c796b]">दिन के अधिपति ग्रह</p>
              </div>
            </div>
          </div>

          {/* 3. AUSPICIOUS & INAUSPICIOUS TIMINGS (MUHURAT) */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* AUSPICIOUS (SHUBH) */}
            <div className="rounded-3xl border border-green-200 bg-[#f8fbf8] p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-sm text-green-700 font-bold">
                  ✓
                </span>
                <h3 className="font-serif text-2xl text-[#1e5422]">
                  शुभ मुहूर्त (Auspicious Timings)
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {panchang.abhijitMuhurat && (
                  <div className="rounded-2xl border border-green-100 bg-white p-4">
                    <p className="text-[11px] font-bold text-green-800">
                      अभिजीत मुहूर्त (Abhijit Muhurat)
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-[#1e5422]">
                      {panchang.abhijitMuhurat}
                    </p>
                    <p className="mt-1 text-xs text-[#6e8570]">
                      दिन का सबसे शुभ समय — सभी नए व मांगलिक कार्यों हेतु उत्तम।
                    </p>
                  </div>
                )}

                {panchang.brahmaMuhurat && (
                  <div className="rounded-2xl border border-green-100 bg-white p-4">
                    <p className="text-[11px] font-bold text-green-800">
                      ब्रह्म मुहूर्त (Brahma Muhurat)
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-[#1e5422]">
                      {panchang.brahmaMuhurat}
                    </p>
                    <p className="mt-1 text-xs text-[#6e8570]">
                      पूजा, ध्यान, मन्त्र जाप एवं योग साधना हेतु सर्वश्रेष्ठ काल।
                    </p>
                  </div>
                )}

                {panchang.auspiciousTimings && (
                  <div className="rounded-2xl border border-green-100 bg-white p-4">
                    <p className="text-[11px] font-bold text-green-800">
                      अन्य शुभ चौघड़िया व वेला
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#1e5422] leading-relaxed">
                      {panchang.auspiciousTimings}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* INAUSPICIOUS (VARJYA / ASHUBH) */}
            <div className="rounded-3xl border border-red-200 bg-[#fdfaf9] p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-sm text-red-700 font-bold">
                  ✕
                </span>
                <h3 className="font-serif text-2xl text-[#6e1e17]">
                  अशुभ एवं वर्ज्य समय (Inauspicious Timings)
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {panchang.rahukaal && (
                  <div className="rounded-2xl border border-red-100 bg-white p-4">
                    <p className="text-[11px] font-bold text-red-800">
                      राहुकाल (Rahukaal)
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-[#6e1e17]">
                      {panchang.rahukaal}
                    </p>
                    <p className="mt-1 text-xs text-[#8c6b68]">
                      इस समयावधि में नया कार्य आरंभ करना अथवा शुभ यात्रा वर्जित है।
                    </p>
                  </div>
                )}

                {panchang.yamaganda && (
                  <div className="rounded-2xl border border-red-100 bg-white p-4">
                    <p className="text-[11px] font-bold text-red-800">
                      यमगण्ड (Yamaganda)
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-[#6e1e17]">
                      {panchang.yamaganda}
                    </p>
                  </div>
                )}

                {panchang.gulikaKaal && (
                  <div className="rounded-2xl border border-red-100 bg-white p-4">
                    <p className="text-[11px] font-bold text-red-800">
                      गुलिक काल (Gulika Kaal)
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-[#6e1e17]">
                      {panchang.gulikaKaal}
                    </p>
                  </div>
                )}

                {panchang.inauspiciousTimings && (
                  <div className="rounded-2xl border border-red-100 bg-white p-4">
                    <p className="text-[11px] font-bold text-red-800">
                      दुर्मुहूर्त एवं विशेष विचार
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#6e1e17] leading-relaxed">
                      {panchang.inauspiciousTimings}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. SAMVAT & ASTROLOGICAL DETAILS */}
          <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-8 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
              संवत एवं खगोलीय स्थिति
            </p>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#57120d]">
              वैदिक संवत व ग्रह स्थिति
            </h3>

            <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 text-center">
              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-4">
                <span className="text-[11px] font-bold text-[#a2742e]">
                  विक्रम संवत
                </span>
                <p className="mt-1 font-serif text-xl font-semibold text-[#57120d]">
                  {panchang.vikramSamvat || "2083"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-4">
                <span className="text-[11px] font-bold text-[#a2742e]">
                  शक संवत
                </span>
                <p className="mt-1 font-serif text-xl font-semibold text-[#57120d]">
                  {panchang.shakaSamvat || "1948"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-4">
                <span className="text-[11px] font-bold text-[#a2742e]">
                  अयन
                </span>
                <p className="mt-1 font-serif text-base font-semibold text-[#57120d]">
                  {panchang.ayana || "दक्षिणायन"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-4">
                <span className="text-[11px] font-bold text-[#a2742e]">
                  ऋतु
                </span>
                <p className="mt-1 font-serif text-base font-semibold text-[#57120d]">
                  {panchang.ritu || "शरद"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-4">
                <span className="text-[11px] font-bold text-[#a2742e]">
                  चन्द्र राशि
                </span>
                <p className="mt-1 font-serif text-base font-semibold text-[#57120d] truncate">
                  {panchang.moonSign || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#ebdcca] bg-[#fbf7ef] p-4">
                <span className="text-[11px] font-bold text-[#a2742e]">
                  सूर्य राशि
                </span>
                <p className="mt-1 font-serif text-base font-semibold text-[#57120d] truncate">
                  {panchang.sunSign || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* 5. SPECIAL GUIDANCE */}
          {panchang.specialNotes && (
            <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-8 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
                दैनिक ज्योतिषीय परामर्श एवं सुविचार
              </p>
              <h3 className="mt-1 font-serif text-2xl text-[#57120d]">
                विशेष आध्यात्मिक मार्गदर्शन
              </h3>
              <p className="mt-4 text-base leading-8 text-[#53433b] whitespace-pre-wrap">
                {panchang.specialNotes}
              </p>
            </div>
          )}

          {/* CONSULTATION BANNER */}
          <div className="rounded-3xl bg-[#300604] p-8 md:p-12 text-white text-center shadow-lg">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#d7ad63]">
              ॥ शुभ मुहूर्त एवं वैदिक परामर्श ॥
            </p>
            <h3 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl text-[#f3dca8]">
              विवाह, गृह प्रवेश या व्यापार हेतु श्रेष्ठ मुहूर्त जानना चाहते हैं?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#d4c3b5]">
              अपनी जन्म कुंडली के ग्रहों की अनुकूलता के आधार पर सटीक शुभ मुहूर्त निर्धारण एवं वैदिक मार्गदर्शन हेतु पंडित जी से संपर्क करें।
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contact"
                className="rounded-full bg-[#d2a75c] px-8 py-3.5 text-xs font-bold text-[#300604] transition hover:bg-[#e1bd78]"
              >
                मुहूर्त परामर्श हेतु अनुरोध करें →
              </a>
              <Link
                href="/blog"
                className="rounded-full border border-[#d7ad63]/40 px-7 py-3.5 text-xs font-semibold text-[#f2d99d] transition hover:bg-white/10"
              >
                ज्योतिष एवं आयुर्वेद लेख पढ़ें
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
