import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gemstone Consultation in Muzaffarnagar | Ratna Jyotish",
  description:
    "Traditional Ratna Jyotish gemstone consultation in Muzaffarnagar based on your individual birth chart. Understand traditional gemstone associations, suitability, wearing methods and alternatives.",

  keywords: [
    "Gemstone Consultation Muzaffarnagar",
    "Gemstone Consultant Muzaffarnagar",
    "Ratna Jyotish Muzaffarnagar",
    "Ratna Jyotish",
    "Gemstone Astrology",
    "Astrological Gemstone",
    "Gemstone Recommendation",
    "Gemstone Consultation",
    "Ratna Shastra",
    "Ruby Astrology",
    "Emerald Astrology",
    "Yellow Sapphire Astrology",
    "Pearl Astrology",
    "Red Coral Astrology",
    "रत्न ज्योतिष",
    "रत्न परामर्श",
    "ज्योतिष रत्न",
    "रत्न शास्त्र",
  ],

  alternates: {
    canonical: "/services/gemstone-consultation",
  },

  openGraph: {
    title: "Gemstone Consultation in Muzaffarnagar | Ratna Jyotish",
    description:
      "Traditional gemstone consultation based on individual birth-chart analysis and Ratna Jyotish principles.",
    url: "/services/gemstone-consultation",
    type: "website",
  },
};

const questions = [
  "Whether a gemstone is traditionally considered suitable",
  "Which planetary factor the gemstone is traditionally associated with",
  "Whether the stone is appropriate in the context of the birth chart",
  "Traditional considerations regarding the stone, weight and wearing method",
  "Whether an alternative or no gemstone may be more appropriate",
];

const stones = [
  {
    name: "Ruby",
    hindi: "माणिक",
    planet: "Sun · सूर्य",
  },
  {
    name: "Pearl",
    hindi: "मोती",
    planet: "Moon · चंद्र",
  },
  {
    name: "Red Coral",
    hindi: "मूंगा",
    planet: "Mars · मंगल",
  },
  {
    name: "Emerald",
    hindi: "पन्ना",
    planet: "Mercury · बुध",
  },
  {
    name: "Yellow Sapphire",
    hindi: "पुखराज",
    planet: "Jupiter · गुरु",
  },
  {
    name: "Diamond",
    hindi: "हीरा",
    planet: "Venus · शुक्र",
  },
];

export default function GemstoneConsultationPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-28 -top-32 h-[30rem] w-[30rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute right-12 top-20 h-48 w-48 rounded-full border border-[#d7ad63]" />
          <div className="absolute bottom-[-15rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            रत्न ज्योतिष · RATNA JYOTISH
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Don't choose a gemstone
            <br />
            <em>just because it sounds lucky.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            Traditional gemstone consultation based on your
            individual birth chart and the principles of Ratna
            Jyotish.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              Request Gemstone Consultation
              <span className="ml-3">→</span>
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              How It Works
            </a>

          </div>

        </div>
      </section>

      {/* INTRO */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              FIRST THINGS FIRST
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              A gemstone is
              <br />
              <em>not one-size-fits-all.</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              In traditional Jyotish, gemstones are associated
              with particular planets and are considered in
              relation to an individual's birth chart.
            </p>

            <p>
              Because every chart is different, a gemstone that
              is traditionally recommended for one person may
              not be considered appropriate for another.
            </p>

            <p>
              A consultation therefore begins with the chart
              and the reason for considering a gemstone rather
              than simply choosing a stone from a generic list.
            </p>

            <p className="text-[#57120d]">
              हर व्यक्ति की जन्म कुंडली अलग होती है। इसलिए
              रत्न का चयन पारंपरिक ज्योतिषीय विचार के अनुसार
              व्यक्तिगत कुंडली के संदर्भ में किया जाता है।
            </p>

          </div>

        </div>

      </section>

      {/* QUESTIONS */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="max-w-3xl">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              THE CONSULTATION
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              What are we actually
              <br />
              <em>trying to understand?</em>
            </h2>

          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2">

            {questions.map((question, index) => (
              <div
                key={question}
                className="flex gap-5 rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6"
              >

                <span className="font-serif text-2xl text-[#c19a5b]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="leading-7 text-[#685851]">
                  {question}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* STONES */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              TRADITIONAL ASSOCIATIONS
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              Some commonly known
              <br />
              <em>planetary gemstones.</em>
            </h2>

          </div>

          <p className="max-w-md text-sm leading-7 text-[#78665c]">
            These associations are shown for educational
            context only. They are not a recommendation to wear
            any particular stone.
          </p>

        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">

          {stones.map((stone) => (
            <div
              key={stone.name}
              className="group rounded-2xl border border-[#d5c5ae] bg-[#eee5d6] p-6 transition hover:bg-[#300604]"
            >

              <p className="text-xs tracking-[2px] text-[#a2742e] group-hover:text-[#d7ad63]">
                {stone.planet}
              </p>

              <h3 className="mt-6 font-serif text-2xl text-[#57120d] group-hover:text-[#f3dca8]">
                {stone.name}
              </h3>

              <p className="mt-1 text-sm text-[#8c796b] group-hover:text-[#cdbbb0]">
                {stone.hindi}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* WHY CHART MATTERS */}

      <section className="border-y border-[#d9cbb8] bg-[#300604] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                BIRTH CHART
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f3dca8] md:text-5xl">
                The stone comes
                <br />
                <em>after the chart.</em>
              </h2>

            </div>

            <div className="space-y-6 text-[#d4c3b5]">

              <p className="leading-8">
                Traditional Ratna Jyotish does not simply match
                a person's problem with a gemstone from a
                universal chart.
              </p>

              <p className="leading-8">
                The birth chart provides the context in which
                planetary associations and the suitability of a
                gemstone are traditionally considered.
              </p>

              <div className="rounded-2xl border border-[#d7ad63]/25 bg-[#3b0a07] p-6">

                <p className="font-semibold text-[#f3dca8]">
                  Your birth details matter.
                </p>

                <p className="mt-2 text-sm leading-7 text-[#cdbbb0]">
                  Date, time and place of birth are therefore
                  important when requesting an individualized
                  gemstone consultation.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHAT TO PROVIDE */}

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
      >

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              BEFORE YOU CONTACT US
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              Keep these
              <br />
              <em>details ready.</em>
            </h2>

          </div>

          <div className="space-y-4">

            <div className="rounded-2xl border border-[#d5c5ae] p-6">

              <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                01 · DATE
              </p>

              <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                Date of Birth
              </h3>

              <p className="mt-2 leading-7 text-[#74645b]">
                Your complete date of birth.
              </p>

            </div>

            <div className="rounded-2xl border border-[#d5c5ae] p-6">

              <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                02 · TIME
              </p>

              <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                Time of Birth
              </h3>

              <p className="mt-2 leading-7 text-[#74645b]">
                The most accurate birth time available to you.
              </p>

            </div>

            <div className="rounded-2xl border border-[#d5c5ae] p-6">

              <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                03 · PLACE
              </p>

              <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                Place of Birth
              </h3>

              <p className="mt-2 leading-7 text-[#74645b]">
                City, town or location where you were born.
              </p>

            </div>

            <div className="rounded-2xl border border-[#d5c5ae] p-6">

              <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                04 · PURPOSE
              </p>

              <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                Why are you considering a gemstone?
              </h3>

              <p className="mt-2 leading-7 text-[#74645b]">
                Tell us what you hope to understand and what
                led you to consider wearing a gemstone.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* NO GUARANTEES */}

      <section className="bg-[#eee5d6]">

        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">

          <div className="text-center">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              A PRACTICAL NOTE
            </p>

            <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
              A gemstone is not a
              <br />
              <em>guaranteed solution.</em>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#74645b]">
              Gemstone recommendations belong to a traditional
              astrological practice. They should not be presented
              as guaranteed cures or substitutes for medical,
              financial, legal or other professional advice.
            </p>

          </div>

        </div>

      </section>

      {/* JANAM KUNDALI */}

      <section className="border-y border-[#d9cbb8] bg-[#f7f0e5]">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            NOT SURE ABOUT A GEMSTONE?
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Start with a broader
            <br />
            <em>Janam Kundali reading.</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
            If you want to understand your birth chart before
            deciding whether a gemstone consultation is relevant,
            begin with a complete Kundali consultation.
          </p>

          <Link
            href="/services/janam-kundli"
            className="mt-7 inline-flex items-center rounded-full border border-[#8b2418] px-7 py-3.5 font-semibold text-[#8b2418] transition hover:bg-[#8b2418] hover:text-white"
          >
            Explore Janam Kundali
            <span className="ml-3">→</span>
          </Link>

        </div>

      </section>

      {/* LOCATION */}

      <section className="px-6 py-20 md:px-10 md:py-24">

        <div className="mx-auto max-w-7xl rounded-3xl bg-[#300604] p-8 text-white md:p-12">

          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                MUZAFFARNAGAR · UTTAR PRADESH
              </p>

              <h2 className="mt-4 font-serif text-3xl text-[#f3dca8] md:text-4xl">
                Gemstone consultation
                <br />
                <em>in Muzaffarnagar & online.</em>
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-[#d4c3b5]">
                Offline consultation is available at Shanti
                Nagar, Muzaffarnagar, Uttar Pradesh · 251002.
                Online consultation is available across India
                and worldwide.
              </p>

            </div>

            <div className="text-sm text-[#ead9b3] md:text-right">

              <p>OFFLINE</p>
              <p className="mt-1">SHANTI NAGAR · 251002</p>

              <p className="mt-5">ONLINE</p>
              <p className="mt-1">INDIA & WORLDWIDE</p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="border-t border-[#d9cbb8] bg-[#f0e6d7]">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            रत्न परामर्श
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Thinking about wearing
            <br />
            <em>a gemstone?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Share your birth details and tell us why you are
            considering a gemstone.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Request Gemstone Consultation
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}