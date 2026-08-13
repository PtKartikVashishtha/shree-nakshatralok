import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Graha Dosh Consultation in Muzaffarnagar",
  description:
    "Traditional Graha Dosh consultation in Muzaffarnagar covering Mangal Dosha, Pitru Dosha and other astrological considerations through birth-chart analysis.",
  keywords: [
    "Graha Dosh",
    "Graha Dosh Muzaffarnagar",
    "Mangal Dosha",
    "Mangal Dosh",
    "Pitru Dosha",
    "Kaal Sarp Dosha",
    "Dosh Nivaran",
    "Dosh Analysis",
    "ग्रह दोष",
    "मंगल दोष",
    "पितृ दोष",
    "दोष निवारण",
  ],
};

const doshas = [
  {
    no: "01",
    title: "Mangal Dosha",
    hindi: "मंगल दोष",
    text: "A traditional astrological consideration associated with the placement and influence of Mars in a birth chart.",
  },
  {
    no: "02",
    title: "Pitru Dosha",
    hindi: "पितृ दोष",
    text: "A traditional Jyotish interpretation involving specific planetary and chart combinations associated with Pitru-related considerations.",
  },
  {
    no: "03",
    title: "Kaal Sarp-related Interpretations",
    hindi: "काल सर्प",
    text: "A traditional interpretation concerning the placement of planets in relation to the lunar nodes, considered differently across astrological traditions.",
  },
  {
    no: "04",
    title: "Other Planetary Factors",
    hindi: "अन्य ग्रह योग",
    text: "A birth chart may contain other planetary combinations that require individual interpretation rather than a generic dosha label.",
  },
];

const consultationSteps = [
  {
    no: "01",
    title: "Share your birth details",
    text: "Provide your date, time and place of birth so the relevant birth chart can be considered.",
  },
  {
    no: "02",
    title: "Discuss your concern",
    text: "Tell us why you are seeking the consultation and what situation or question you want to understand.",
  },
  {
    no: "03",
    title: "Review the chart",
    text: "The relevant planetary positions and traditional astrological factors are considered in context.",
  },
  {
    no: "04",
    title: "Discuss traditional options",
    text: "If traditional remedies or further consultation are considered appropriate, they can be discussed as part of the guidance.",
  },
];

export default function GrahaDoshPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-28 -top-32 h-[30rem] w-[30rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute -right-8 top-0 h-72 w-72 rounded-full border border-[#d7ad63]" />
          <div className="absolute bottom-[-16rem] left-[-10rem] h-[32rem] w-[32rem] rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            ग्रह दोष · GRAHA DOSH
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Understand the chart
            <br />
            before you <em>fear the label.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            Traditional astrological consultation to understand
            planetary combinations and commonly discussed
            Graha Dosh considerations in the context of your
            individual birth chart.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              Request Dosh Consultation
              <span className="ml-3">→</span>
            </a>

            <a
              href="#understanding"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              Understand Graha Dosh
            </a>

          </div>

        </div>
      </section>

      {/* IMPORTANT INTRO */}

      <section
        id="understanding"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
      >

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              FIRST, UNDERSTAND
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              A dosha is not
              <br />
              <em>the whole Kundali.</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              In traditional Jyotish, the term Graha Dosh can
              refer to particular planetary combinations or
              conditions that are interpreted as significant
              within a birth chart.
            </p>

            <p>
              A single planetary combination should not
              automatically be treated as a complete explanation
              for everything happening in a person's life.
            </p>

            <p>
              Traditional interpretation considers the broader
              chart, the relevant planetary positions and the
              specific circumstances being discussed.
            </p>

            <p className="text-[#57120d]">
              किसी एक ग्रह योग या दोष को पूरी कुंडली का
              निष्कर्ष नहीं माना जाना चाहिए। पारंपरिक ज्योतिष
              में कुंडली के विभिन्न तत्वों को संदर्भ के साथ
              देखा जाता है।
            </p>

          </div>

        </div>

      </section>

      {/* COMMONLY DISCUSSED */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="max-w-3xl">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              COMMONLY DISCUSSED
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              Different concerns,
              <br />
              <em>different interpretations.</em>
            </h2>

            <p className="mt-5 leading-7 text-[#74645b]">
              These are some of the traditional topics people
              commonly ask about. Whether a particular
              combination is relevant requires individual chart
              analysis.
            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">

            {doshas.map((dosha) => (
              <article
                key={dosha.no}
                className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-8"
              >

                <div className="flex items-start justify-between">

                  <span className="text-xs font-semibold tracking-[3px] text-[#a2742e]">
                    {dosha.no}
                  </span>

                  <span className="text-xs text-[#a99683]">
                    {dosha.hindi}
                  </span>

                </div>

                <h3 className="mt-7 font-serif text-2xl text-[#57120d]">
                  {dosha.title}
                </h3>

                <p className="mt-3 leading-7 text-[#74645b]">
                  {dosha.text}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* DON'T SELF-DIAGNOSE */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="rounded-3xl border border-[#d5c5ae] bg-[#eee5d6] p-8 md:p-12">

          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-20">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                CONTEXT MATTERS
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
                Don't let an
                <br />
                <em>online label decide.</em>
              </h2>

            </div>

            <div className="space-y-5 text-[#74645b]">

              <p className="leading-8">
                Online calculators and social media posts can
                identify a particular combination without
                explaining how it fits into the complete birth
                chart.
              </p>

              <p className="leading-8">
                If you are concerned about a particular dosha,
                the useful starting point is to provide your
                actual birth details and explain what led you to
                seek the consultation.
              </p>

              <div className="rounded-2xl bg-[#300604] p-6 text-[#ead9b3]">

                <p className="text-sm font-semibold">
                  Traditional astrology is interpretive.
                </p>

                <p className="mt-2 text-sm leading-7 text-[#d4c3b5]">
                  A consultation can explain the traditional
                  astrological interpretation, but it should not
                  be presented as a medical, legal or scientific
                  diagnosis.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHAT YOU NEED */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[1fr_0.85fr] md:items-start md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                BEFORE CONSULTATION
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
                What do we need
                <br />
                <em>from you?</em>
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-[#74645b]">
                A Graha Dosh consultation is based primarily
                on birth information and the concern you want
                to discuss.
              </p>

            </div>

            <div className="space-y-4">

              <div className="border-b border-[#d5c5ae] pb-5">
                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  01
                </p>

                <h3 className="mt-2 font-serif text-2xl text-[#57120d]">
                  Date of Birth
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#74645b]">
                  Your complete date of birth.
                </p>
              </div>

              <div className="border-b border-[#d5c5ae] pb-5">
                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  02
                </p>

                <h3 className="mt-2 font-serif text-2xl text-[#57120d]">
                  Time of Birth
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#74645b]">
                  As accurately as you know it.
                </p>
              </div>

              <div className="border-b border-[#d5c5ae] pb-5">
                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  03
                </p>

                <h3 className="mt-2 font-serif text-2xl text-[#57120d]">
                  Place of Birth
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#74645b]">
                  City, town or place where you were born.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  04
                </p>

                <h3 className="mt-2 font-serif text-2xl text-[#57120d]">
                  Your Concern
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#74645b]">
                  Tell us which dosha or situation you are
                  concerned about.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONSULTATION PROCESS */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
          HOW IT WORKS
        </p>

        <h2 className="mt-4 max-w-2xl font-serif text-4xl text-[#57120d] md:text-5xl">
          From concern
          <br />
          <em>to understanding.</em>
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2">

          {consultationSteps.map((step) => (
            <div
              key={step.no}
              className="rounded-2xl border border-[#d5c5ae] p-7"
            >

              <span className="font-serif text-4xl text-[#c9aa75]">
                {step.no}
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                {step.text}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* REMEDIES */}

      <section className="border-y border-[#d9cbb8] bg-[#300604] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                पारंपरिक उपाय · TRADITIONAL REMEDIES
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f3dca8] md:text-5xl">
                Remedies should
                <br />
                <em>follow understanding.</em>
              </h2>

            </div>

            <div className="space-y-5 text-[#d4c3b5]">

              <p className="leading-8">
                In traditional Jyotish practice, certain
                remedies may be suggested in relation to
                particular planetary considerations.
              </p>

              <p className="leading-8">
                The appropriate remedy depends on the specific
                chart and the circumstances being discussed.
                There is no single remedy that should be
                presented as suitable for everyone.
              </p>

              <p className="text-sm leading-7 text-[#bba99c]">
                Astrological remedies are part of a traditional
                belief system and should not replace
                professional medical, legal or financial advice.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* JANAM KUNDALI LINK */}

      <section className="bg-[#eee5d6]">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            NEED A BROADER READING?
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Start with your
            <br />
            <em>Janam Kundali.</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
            If you are not sure whether a particular dosha is
            relevant and simply want a broader birth-chart
            consultation, explore the dedicated Janam Kundali
            service.
          </p>

          <Link
            href="/services/janam-kundali"
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
                Graha Dosh consultation
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
            ग्रह दोष परामर्श
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Have a concern about
            <br />
            <em>Graha Dosh?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Share your birth details and tell us what you
            have been told or what you are concerned about.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Request Consultation
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}