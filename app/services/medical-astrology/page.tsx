import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Jyotish Consultation | Chikitsa Jyotish | Shree Nakshatralok",
  description:
    "Traditional Medical Jyotish consultation exploring planetary and astrological influences traditionally associated with wellbeing and health-related themes.",
  keywords: [
    "Medical Jyotish",
    "Chikitsa Jyotish",
    "Medical Astrology",
    "Health Astrology",
    "Medical Astrology Muzaffarnagar",
    "Jyotish Consultation",
    "चिकित्सा ज्योतिष",
    "स्वास्थ्य ज्योतिष",
    "चिकित्सा ज्योतिष परामर्श",
  ],
};

const principles = [
  {
    number: "01",
    title: "Lagna & Body",
    hindi: "लग्न एवं शरीर",
    text: "Traditional Jyotish examines the Lagna and related chart factors when discussing the constitution and physical wellbeing of an individual.",
  },
  {
    number: "02",
    title: "Bhavas",
    hindi: "भाव",
    text: "Different houses of the birth chart are traditionally associated with different areas of life and bodily themes.",
  },
  {
    number: "03",
    title: "Grahas",
    hindi: "ग्रह",
    text: "Planetary placements, strengths and relationships may be considered as part of a traditional astrological interpretation.",
  },
  {
    number: "04",
    title: "Dasha & Timing",
    hindi: "दशा एवं समय",
    text: "Planetary periods may be examined to understand traditional astrological timing associated with particular phases of life.",
  },
];

const topics = [
  "General wellbeing themes",
  "Traditional planetary influences",
  "Birth-chart based health themes",
  "Periods of increased concern or attention",
  "Traditional Jyotish remedies",
  "Lifestyle and spiritual practices from a traditional perspective",
];

export default function MedicalAstrologyPage() {
  return (
    <main className="min-h-screen bg-[#f8f2e8] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-25">

          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border border-[#d7ad63]" />

          <div className="absolute right-[-8rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full border border-[#d7ad63]" />

          <div className="absolute left-[48%] bottom-[-12rem] h-96 w-96 rounded-full border border-[#d7ad63]" />

          <div className="absolute right-[18%] top-[30%] text-7xl text-[#d7ad63]">
            ☤
          </div>

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            चिकित्सा ज्योतिष · MEDICAL JYOTISH
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Understanding wellbeing
            <br />
            through the
            <br />
            <em>lens of Jyotish.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d4c3b5]">
            A traditional astrological approach that explores
            planetary patterns, houses and periods associated with
            health and wellbeing themes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              Request Consultation
              <span className="ml-3">→</span>
            </a>

            <a
              href="#approach"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              Understand the Approach
            </a>

          </div>

        </div>

      </section>

      {/* INTRO */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              CHIKITSA JYOTISH
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              The body,
              <br />
              <em>the chart, the cycles.</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              Medical Jyotish, traditionally known as Chikitsa
              Jyotish, is an area of Jyotish that considers
              astrological factors traditionally associated with
              the body, vitality and periods of wellbeing.
            </p>

            <p>
              The birth chart is examined as a whole rather than
              treating one planetary placement as an isolated
              explanation for a person's health.
            </p>

            <p className="text-[#57120d]">
              चिकित्सा ज्योतिष में जन्म कुंडली के विभिन्न
              ग्रहों, भावों और दशाओं का पारंपरिक दृष्टिकोण से
              अध्ययन किया जाता है।
            </p>

          </div>

        </div>

      </section>

      {/* IMPORTANT BOUNDARY */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">

          <div className="rounded-3xl border border-[#d7c5aa] bg-[#f8f2e8] p-8 md:p-12">

            <div className="flex flex-col gap-8 md:flex-row md:items-start">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#300604] font-serif text-3xl text-[#d7ad63]">
                ☤
              </div>

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                  IMPORTANT
                </p>

                <h2 className="mt-3 font-serif text-3xl text-[#57120d] md:text-4xl">
                  Jyotish is not a
                  <br />
                  <em>medical diagnosis.</em>
                </h2>

                <p className="mt-5 leading-8 text-[#74645b]">
                  Medical Jyotish is a traditional astrological
                  practice. It cannot diagnose diseases, determine
                  medical conditions or replace examination and
                  treatment by a qualified healthcare professional.
                </p>

                <p className="mt-4 leading-8 text-[#74645b]">
                  If you have symptoms, a medical concern or an
                  urgent health problem, please consult an
                  appropriately qualified doctor or healthcare
                  professional.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* APPROACH */}

      <section
        id="approach"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
      >

        <div className="max-w-3xl">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            THE TRADITIONAL APPROACH
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            A complete chart,
            <br />
            <em>not one isolated planet.</em>
          </h2>

          <p className="mt-5 leading-8 text-[#74645b]">
            Traditional interpretation may consider several
            connected factors before reaching an astrological
            conclusion.
          </p>

        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">

          {principles.map((item) => (
            <article
              key={item.number}
              className="rounded-3xl border border-[#d5c5ae] bg-[#eee5d6] p-8"
            >

              <div className="flex items-center justify-between">

                <span className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  {item.number}
                </span>

                <span className="text-xs text-[#9b8879]">
                  {item.hindi}
                </span>

              </div>

              <h3 className="mt-8 font-serif text-2xl text-[#57120d]">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                {item.text}
              </p>

            </article>
          ))}

        </div>

      </section>

      {/* WHAT MAY BE DISCUSSED */}

      <section className="bg-[#300604] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                WHAT CAN BE DISCUSSED?
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f3dca8] md:text-5xl">
                Questions about
                <br />
                <em>your wellbeing.</em>
              </h2>

              <p className="mt-6 leading-8 text-[#cdbbb0]">
                A consultation can focus on broad wellbeing
                themes and traditional astrological interpretations
                arising from the birth chart.
              </p>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {topics.map((topic, index) => (
                <div
                  key={topic}
                  className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-6"
                >

                  <span className="text-xs tracking-[3px] text-[#d7ad63]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-4 leading-7 text-[#ead9b3]">
                    {topic}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* BIRTH DETAILS */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              WHAT YOU WILL NEED
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              Your birth details
              <br />
              <em>form the foundation.</em>
            </h2>

            <p className="mt-6 leading-8 text-[#74645b]">
              A traditional birth-chart based consultation
              generally requires accurate birth information.
            </p>

          </div>

          <div className="rounded-3xl border border-[#d5c5ae] bg-[#eee5d6] p-8 md:p-10">

            <div className="space-y-6">

              <div className="flex gap-5 border-b border-[#d5c5ae] pb-5">

                <span className="font-serif text-2xl text-[#a2742e]">
                  01
                </span>

                <div>
                  <h3 className="font-semibold text-[#57120d]">
                    Date of Birth
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#74645b]">
                    Your exact date of birth.
                  </p>
                </div>

              </div>

              <div className="flex gap-5 border-b border-[#d5c5ae] pb-5">

                <span className="font-serif text-2xl text-[#a2742e]">
                  02
                </span>

                <div>
                  <h3 className="font-semibold text-[#57120d]">
                    Time of Birth
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#74645b]">
                    As accurate as possible.
                  </p>
                </div>

              </div>

              <div className="flex gap-5">

                <span className="font-serif text-2xl text-[#a2742e]">
                  03
                </span>

                <div>
                  <h3 className="font-semibold text-[#57120d]">
                    Place of Birth
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#74645b]">
                    City, district or location of birth.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PROCESS */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            CONSULTATION PROCESS
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            From birth details
            <br />
            <em>to interpretation.</em>
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">

            <div className="border-t-2 border-[#c9aa75] pt-6">

              <span className="font-serif text-5xl text-[#c9aa75]">
                01
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Prepare the chart
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                Birth information is used as the basis for the
                traditional astrological chart.
              </p>

            </div>

            <div className="border-t-2 border-[#c9aa75] pt-6">

              <span className="font-serif text-5xl text-[#c9aa75]">
                02
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Examine the patterns
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                Relevant houses, planetary placements and periods
                are considered together.
              </p>

            </div>

            <div className="border-t-2 border-[#c9aa75] pt-6">

              <span className="font-serif text-5xl text-[#c9aa75]">
                03
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Discuss the guidance
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                The traditional interpretation is discussed in
                relation to your questions and circumstances.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* REMEDIES */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="max-w-3xl">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            TRADITIONAL REMEDIES
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Remedies rooted in
            <br />
            <em>tradition.</em>
          </h2>

          <p className="mt-5 leading-8 text-[#74645b]">
            Depending on the astrological interpretation,
            traditional practices may be discussed as spiritual
            or cultural remedies.
          </p>

        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            "Mantra & Japa",
            "Prayer & Puja",
            "Charity & Seva",
            "Traditional Gemstones",
          ].map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-[#d5c5ae] bg-[#eee5d6] p-7"
            >

              <span className="text-xs tracking-[3px] text-[#a2742e]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 font-serif text-xl text-[#57120d]">
                {item}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#74645b]">
                Discussed only as a traditional Jyotish practice,
                not as a substitute for medical care.
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* KUNDALI LINK */}

      <section className="bg-[#f0e6d7]">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            WANT A COMPLETE BIRTH CHART READING?
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Explore your
            <br />
            <em>Janam Kundali.</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
            If your interest is broader than wellbeing and you
            want to understand your complete birth chart, explore
            the dedicated Janam Kundali consultation.
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
                Medical Jyotish consultation
                <br />
                <em>in Muzaffarnagar & online.</em>
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-[#d4c3b5]">
                Traditional astrological consultation is available
                at Shanti Nagar, Muzaffarnagar, Uttar Pradesh ·
                251002, as well as online.
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

      <section className="border-t border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            चिकित्सा ज्योतिष परामर्श
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Explore your chart
            <br />
            from a <em>traditional perspective.</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Share your birth details and the wellbeing themes
            you would like to discuss.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Request Medical Jyotish Consultation
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}