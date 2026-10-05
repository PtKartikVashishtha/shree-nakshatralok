"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatHindiDateWithDay } from "@/lib/date";
import {
  SunIcon,
  SunsetIcon,
  MoonIcon,
  MoonsetIcon,
  NakshatraIcon,
  YogaIcon,
  KaranaIcon,
  MuhuratIcon,
  KaalIcon,
  SamvatIcon,
  CalendarPatrikaIcon,
  LocationIcon,
} from "./PanchangIcons";

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

  const formattedDisplayDate = formatHindiDateWithDay(currentDate);

  return (
    <div className="space-y-10">
      {/* 1. DATE NAVIGATION BAR */}
      <div className="overflow-hidden rounded-2xl border border-[#ded1be] bg-[#fffdf9] p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* DAY SWITCHERS */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/panchang?date=${prevDate}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#ded1be] bg-[#fbf5eb] px-4 py-2 text-xs font-semibold text-[#57120d] transition hover:bg-[#ede3d1]"
            >
              <span>←</span>
              <span>पिछला दिन</span>
            </Link>

            {!isToday && (
              <Link
                href="/panchang"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#5c130d] px-4 py-2 text-xs font-semibold text-[#f2d99d] shadow-sm transition hover:bg-[#420b08]"
              >
                <span>आज का पंचांग</span>
              </Link>
            )}

            <Link
              href={`/panchang?date=${nextDate}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#ded1be] bg-[#fbf5eb] px-4 py-2 text-xs font-semibold text-[#57120d] transition hover:bg-[#ede3d1]"
            >
              <span>अगला दिन</span>
              <span>→</span>
            </Link>
          </div>

          {/* DATE PICKER */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#7d685c]">
              <CalendarPatrikaIcon size={16} />
              <span>दिनांक चयन:</span>
            </label>
            <input
              type="date"
              value={currentDate}
              onChange={handleDateSelect}
              className="rounded-lg border border-[#ded1be] bg-[#faf5eb] px-3 py-1.5 text-xs font-medium text-[#3b2520] outline-none transition focus:border-[#b78a40]"
            />
          </div>
        </div>

        {/* DATE TITLE & LOCATION BANNER */}
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-[#ebdcca] pt-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#a2742e]">
                दैनिक वैदिक पञ्चाङ्ग दर्पण
              </span>
              {isToday && (
                <span className="rounded bg-[#5c130d] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f2d99d]">
                  आज (TODAY)
                </span>
              )}
            </div>
            <h2
              className="mt-1 font-serif text-3xl font-medium leading-tight text-[#57120d] sm:text-4xl"
              suppressHydrationWarning
            >
              {formattedDisplayDate}
            </h2>
          </div>

          <div className="text-xs text-[#8c796b] md:text-right">
            <p className="flex items-center gap-1.5 font-semibold text-[#57120d] md:justify-end">
              <LocationIcon size={14} />
              <span>{panchang?.location || "मुजफ्फरनगर, उत्तर प्रदेश"}</span>
            </p>
            <p className="mt-1">भारतीय मानक समय (IST · UTC+5:30) · स्थानीय गणना</p>
          </div>
        </div>
      </div>

      {!panchang ? (
        /* EMPTY STATE FOR UNPUBLISHED DATE */
        <div className="rounded-2xl border border-dashed border-[#d8c9b5] bg-[#fffdf9] px-6 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b976] bg-[#f8efdf] text-xl text-[#ad7e2d]">
            ✦
          </div>
          <h3 className="mt-4 font-serif text-2xl text-[#57120d]">
            इस दिनांक का पंचांग अभी उपलब्ध नहीं है
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#8c796c]">
            {formattedDisplayDate} के लिए शास्त्रीय पंचांग अभी प्रकाशित नहीं हुआ है। आप आज का पंचांग देख सकते हैं अथवा किसी अन्य दिनांक का चयन कर सकते हैं।
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/panchang"
              className="rounded-lg bg-[#5c130d] px-6 py-2.5 text-xs font-bold text-[#f2d99d] shadow-sm transition hover:bg-[#420b08]"
            >
              आज का पंचांग देखें
            </Link>
            <a
              href="/#contact"
              className="rounded-lg border border-[#ded1be] bg-[#fffdf9] px-6 py-2.5 text-xs font-semibold text-[#57120d] transition hover:bg-[#faf5eb]"
            >
              ज्योतिषी से परामर्श लें
            </a>
          </div>
        </div>
      ) : (
        /* FULL VEDIC PANCHANG LEDGER */
        <div className="space-y-8">
          {/* FESTIVAL / SPECIAL VRAT BANNER (IF PRESENT) */}
          {panchang.festivals && (
            <div className="overflow-hidden rounded-2xl border border-[#d7ad63] bg-gradient-to-r from-[#fff9ea] via-[#fffdf9] to-[#fff9ea] p-5 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f9f1df] text-lg text-[#a2742e]">
                  ✦
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                    आज का प्रमुख पर्व / व्रत एवं उत्सव
                  </p>
                  <p className="font-serif text-xl font-semibold text-[#57120d]">
                    {panchang.festivals}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 1. CELESTIAL SUN & MOON TRANSIT RIBBON */}
          <div className="overflow-hidden rounded-2xl border border-[#ded1be] bg-[#fffdf9] p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-[#ebdcca] pb-3">
              <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-[#a2742e]">
                सूर्य एवं चन्द्र समय · खगोलीय गणना
              </span>
              <span className="text-xs text-[#8c796b]">अक्षांश: 29.47° N · देशांतर: 77.70° E</span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {/* SUNRISE */}
              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <div className="flex items-center gap-2 text-[#9a6a1a]">
                  <SunIcon size={18} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">सूर्योदय (Sunrise)</span>
                </div>
                <p className="mt-2 font-serif text-2xl font-semibold text-[#57120d]">
                  {panchang.sunrise}
                </p>
                <small className="mt-1 block text-[11px] text-[#8c796b]">प्रातःकालीन वेला</small>
              </div>

              {/* SUNSET */}
              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <div className="flex items-center gap-2 text-[#9a6a1a]">
                  <SunsetIcon size={18} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">सूर्यास्त (Sunset)</span>
                </div>
                <p className="mt-2 font-serif text-2xl font-semibold text-[#57120d]">
                  {panchang.sunset}
                </p>
                <small className="mt-1 block text-[11px] text-[#8c796b]">संध्याकालीन वेला</small>
              </div>

              {/* MOONRISE */}
              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <div className="flex items-center gap-2 text-[#7d685c]">
                  <MoonIcon size={18} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">चन्द्रोदय (Moonrise)</span>
                </div>
                <p className="mt-2 font-serif text-2xl font-semibold text-[#57120d]">
                  {panchang.moonrise || "—"}
                </p>
                <small className="mt-1 block text-[11px] text-[#8c796b]">चन्द्र उदित समय</small>
              </div>

              {/* MOONSET */}
              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <div className="flex items-center gap-2 text-[#7d685c]">
                  <MoonsetIcon size={18} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">चन्द्रास्त (Moonset)</span>
                </div>
                <p className="mt-2 font-serif text-2xl font-semibold text-[#57120d]">
                  {panchang.moonset || "—"}
                </p>
                <small className="mt-1 block text-[11px] text-[#8c796b]">चन्द्र अस्त समय</small>
              </div>
            </div>
          </div>

          {/* 2. THE FIVE PILLARS OF PANCHANG (PANCHA-ANGA) */}
          <div className="overflow-hidden rounded-2xl border border-[#ded1be] bg-[#fffdf9] p-8 shadow-sm">
            <div className="border-b border-[#ebdcca] pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
                पञ्चाङ्ग के मुख्य पाँच अंग
              </span>
              <h3 className="mt-1 font-serif text-2xl text-[#57120d] sm:text-3xl">
                वैदिक काल-गणना के पाँच प्रमुख स्तंभ
              </h3>
            </div>

            {/* SYMMETRIC HARMONIOUS LAYOUT */}
            <div className="mt-6 space-y-4">
              {/* PRIMARY ROW: TITHI & PAKSHA HERO */}
              <div className="rounded-xl border border-[#d8c9b5] bg-[#faf3e6] p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2 text-[#a2742e]">
                      <MoonIcon size={16} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">
                        प्रथम अंग · तिथि (TITHI)
                      </span>
                    </div>
                    <h4 className="mt-2 font-serif text-3xl font-semibold text-[#57120d]">
                      {panchang.tithi}
                    </h4>
                  </div>
                  <div className="rounded-lg border border-[#ded1be] bg-[#fffdf9] px-5 py-3 sm:text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c796b]">
                      सक्रिय पक्ष (Paksha)
                    </span>
                    <p className="mt-0.5 font-serif text-lg font-semibold text-[#57120d]">
                      {panchang.paksha ? `${panchang.paksha} पक्ष` : "विस्तृत पंचांग"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 QUADRANTS: NAKSHATRA, VAAR, YOGA, KARANA */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* 2. NAKSHATRA */}
                <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ef] p-5">
                  <div className="flex items-center gap-2 text-[#a2742e]">
                    <NakshatraIcon size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      द्वितीय · नक्षत्र
                    </span>
                  </div>
                  <h4 className="mt-2 font-serif text-xl font-semibold text-[#57120d]">
                    {panchang.nakshatra}
                  </h4>
                  <p className="mt-1 text-xs text-[#7d685c]">चन्द्रमा का संचरण नक्षत्र</p>
                </div>

                {/* 3. VAAR */}
                <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ef] p-5">
                  <div className="flex items-center gap-2 text-[#a2742e]">
                    <CalendarPatrikaIcon size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      तृतीय · वार (दिन)
                    </span>
                  </div>
                  <h4 className="mt-2 font-serif text-xl font-semibold text-[#57120d]">
                    {panchang.dayName}
                  </h4>
                  <p className="mt-1 text-xs text-[#7d685c]">दिन के अधिपति ग्रह प्रभाव</p>
                </div>

                {/* 4. YOGA */}
                <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ef] p-5">
                  <div className="flex items-center gap-2 text-[#a2742e]">
                    <YogaIcon size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      चतुर्थ · योग
                    </span>
                  </div>
                  <h4 className="mt-2 font-serif text-xl font-semibold text-[#57120d]">
                    {panchang.yoga}
                  </h4>
                  <p className="mt-1 text-xs text-[#7d685c]">सूर्य-चन्द्र कोणीय संयोग</p>
                </div>

                {/* 5. KARANA */}
                <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ef] p-5">
                  <div className="flex items-center gap-2 text-[#a2742e]">
                    <KaranaIcon size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      पञ्चम · करण
                    </span>
                  </div>
                  <h4 className="mt-2 font-serif text-xl font-semibold text-[#57120d]">
                    {panchang.karana}
                  </h4>
                  <p className="mt-1 text-xs text-[#7d685c]">सक्रिय तिथि का अर्ध-भाग</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. DIGNIFIED MUHURAT LEDGER (SHUBH & VARJYA) */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* AUSPICIOUS (SHUBH MUHURAT) */}
            <div className="rounded-2xl border border-[#ded1be] bg-[#fffdf9] p-7 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#ebdcca] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#a2742e]">
                    <MuhuratIcon size={18} />
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#57120d]">
                    शुभ मुहूर्त (Auspicious Timings)
                  </h3>
                </div>
                <span className="rounded bg-[#f9f1df] px-2.5 py-0.5 text-[10px] font-bold text-[#8c6014]">
                  शुभ वेला
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {panchang.abhijitMuhurat && (
                  <div className="rounded-xl border border-[#ded1be] bg-[#fbf6ec] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c6014]">
                      अभिजीत मुहूर्त (Abhijit Muhurat)
                    </span>
                    <p className="mt-1 font-serif text-2xl font-semibold text-[#57120d]">
                      {panchang.abhijitMuhurat}
                    </p>
                    <p className="mt-1 text-xs text-[#7d685c]">
                      दिन का सर्वश्रेष्ठ काल — समस्त मांगलिक व व्यापारिक कार्यों हेतु प्रशस्त।
                    </p>
                  </div>
                )}

                {panchang.brahmaMuhurat && (
                  <div className="rounded-xl border border-[#ded1be] bg-[#fbf6ec] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c6014]">
                      ब्रह्म मुहूर्त (Brahma Muhurat)
                    </span>
                    <p className="mt-1 font-serif text-2xl font-semibold text-[#57120d]">
                      {panchang.brahmaMuhurat}
                    </p>
                    <p className="mt-1 text-xs text-[#7d685c]">
                      साधना, ध्यान, मन्त्र-जप एवं आत्मचिंतन हेतु श्रेष्ठ काल।
                    </p>
                  </div>
                )}

                {panchang.auspiciousTimings && (
                  <div className="rounded-xl border border-[#ded1be] bg-[#fbf6ec] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c6014]">
                      अन्य शुभ चौघड़िया व अमृत वेला
                    </span>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-[#57120d]">
                      {panchang.auspiciousTimings}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* VARJYA (INFAVORABLE / CAUTIONARY TIMINGS) */}
            <div className="rounded-2xl border border-[#ded1be] bg-[#fffdf9] p-7 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#ebdcca] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#8a241c]">
                    <KaalIcon size={18} />
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#57120d]">
                    वर्ज्य एवं त्याज्य समय (Inauspicious Timings)
                  </h3>
                </div>
                <span className="rounded bg-[#f9edea] px-2.5 py-0.5 text-[10px] font-bold text-[#8a241c]">
                  त्याज्य काल
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {panchang.rahukaal && (
                  <div className="rounded-xl border border-[#ebdcca] bg-[#faf3f0] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a241c]">
                      राहुकाल (Rahukaal)
                    </span>
                    <p className="mt-1 font-serif text-2xl font-semibold text-[#57120d]">
                      {panchang.rahukaal}
                    </p>
                    <p className="mt-1 text-xs text-[#8c6c68]">
                      इस समयावधि में नूतन कार्य आरंभ अथवा शुभ यात्रा से बचना शास्त्रसम्मत है।
                    </p>
                  </div>
                )}

                {panchang.yamaganda && (
                  <div className="rounded-xl border border-[#ebdcca] bg-[#faf3f0] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a241c]">
                      यमगण्ड (Yamaganda)
                    </span>
                    <p className="mt-1 font-serif text-2xl font-semibold text-[#57120d]">
                      {panchang.yamaganda}
                    </p>
                    <p className="mt-1 text-xs text-[#8c6c68]">
                      महत्वपूर्ण निर्णयों एवं अनुबंधों हेतु वर्ज्य समय।
                    </p>
                  </div>
                )}

                {panchang.gulikaKaal && (
                  <div className="rounded-xl border border-[#ebdcca] bg-[#faf3f0] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a241c]">
                      गुलिक काल (Gulika Kaal)
                    </span>
                    <p className="mt-1 font-serif text-2xl font-semibold text-[#57120d]">
                      {panchang.gulikaKaal}
                    </p>
                  </div>
                )}

                {panchang.inauspiciousTimings && (
                  <div className="rounded-xl border border-[#ebdcca] bg-[#faf3f0] p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a241c]">
                      दुर्मुहूर्त एवं विशेष विचार
                    </span>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-[#57120d]">
                      {panchang.inauspiciousTimings}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. SAMVAT & PLANETARY TRANSITS */}
          <div className="overflow-hidden rounded-2xl border border-[#ded1be] bg-[#fffdf9] p-8 shadow-sm">
            <div className="border-b border-[#ebdcca] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
                संवत्सर एवं ग्रह स्थिति
              </span>
              <h3 className="mt-1 font-serif text-2xl text-[#57120d] sm:text-3xl">
                वैदिक संवत, अयन, ऋतु एवं राशि संचरण
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 text-center">
              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a2742e]">
                  विक्रम संवत
                </span>
                <p className="mt-1 font-serif text-xl font-semibold text-[#57120d]">
                  {panchang.vikramSamvat || "2081"}
                </p>
              </div>

              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a2742e]">
                  शक संवत
                </span>
                <p className="mt-1 font-serif text-xl font-semibold text-[#57120d]">
                  {panchang.shakaSamvat || "1946"}
                </p>
              </div>

              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a2742e]">
                  अयन
                </span>
                <p className="mt-1 font-serif text-base font-semibold text-[#57120d]">
                  {panchang.ayana || "दक्षिणायन"}
                </p>
              </div>

              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a2742e]">
                  ऋतु
                </span>
                <p className="mt-1 font-serif text-base font-semibold text-[#57120d]">
                  {panchang.ritu || "शरद"}
                </p>
              </div>

              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a2742e]">
                  चन्द्र राशि
                </span>
                <p className="mt-1 truncate font-serif text-base font-semibold text-[#57120d]">
                  {panchang.moonSign || "—"}
                </p>
              </div>

              <div className="rounded-xl border border-[#ebdcca] bg-[#fbf7ee] p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a2742e]">
                  सूर्य राशि
                </span>
                <p className="mt-1 truncate font-serif text-base font-semibold text-[#57120d]">
                  {panchang.sunSign || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* 5. SPIRITUAL GUIDANCE & PANDIT JI'S NOTE */}
          {panchang.specialNotes && (
            <div className="overflow-hidden rounded-2xl border border-[#ded1be] bg-[#fffdf9] p-8 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
                दैनिक आध्यात्मिक मार्गदर्शन
              </span>
              <h3 className="mt-1 font-serif text-2xl text-[#57120d]">
                पंडित जी का दैनिक संदेश एवं सुविचार
              </h3>
              <p className="mt-4 whitespace-pre-wrap font-serif text-base leading-8 text-[#53433b]">
                {panchang.specialNotes}
              </p>
            </div>
          )}

          {/* 6. CONSULTATION BANNER */}
          <div className="overflow-hidden rounded-2xl bg-[#300604] p-8 text-center text-white shadow-md md:p-12">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#d7ad63]">
              ॥ शुभ मुहूर्त एवं वैदिक परामर्श ॥
            </p>
            <h3 className="mt-3 font-serif text-2xl text-[#f3dca8] sm:text-3xl md:text-4xl">
              विवाह, गृह प्रवेश या व्यापार हेतु श्रेष्ठ मुहूर्त जानना चाहते हैं?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#d4c3b5]">
              अपनी जन्म कुंडली के ग्रहों की अनुकूलता के आधार पर सटीक शुभ मुहूर्त निर्धारण एवं वैदिक मार्गदर्शन हेतु पंडित जी से संपर्क करें।
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contact"
                className="rounded-lg bg-[#d2a75c] px-8 py-3.5 text-xs font-bold text-[#300604] transition hover:bg-[#e1bd78]"
              >
                मुहूर्त परामर्श हेतु अनुरोध करें →
              </a>
              <Link
                href="/blog"
                className="rounded-lg border border-[#d7ad63]/40 px-7 py-3.5 text-xs font-semibold text-[#f2d99d] transition hover:bg-white/10"
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
