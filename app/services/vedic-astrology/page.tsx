import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vedic Astrology Consultation in Muzaffarnagar",
  description:
    "Traditional Vedic astrology consultation in Muzaffarnagar for marriage, career, education, family, business and important life questions. Online consultation also available.",
  keywords: [
    "Vedic Astrology",
    "Vedic Astrology Muzaffarnagar",
    "Vedic Astrologer Muzaffarnagar",
    "Jyotish Muzaffarnagar",
    "Vedic Jyotish",
    "वैदिक ज्योतिष",
    "ज्योतिष परामर्श",
    "Astrologer in Muzaffarnagar",
  ],
};

const areas = [
  {
    number: "01",
    title: "Marriage & Relationships",
    hindi: "विवाह एवं संबंध",
    text: "Questions concerning marriage, relationships, compatibility and important personal decisions.",
  },
  {
    number: "02",
    title: "Career & Education",
    hindi: "करियर एवं शिक्षा",
    text: "Traditional astrological guidance for career direction, education, business and professional decisions.",
  },
  {
    number: "03",
    title: "Family & Personal Life",
    hindi: "परिवार एवं व्यक्तिगत जीवन",
    text: "Consultation around family matters, major life phases and situations where you are looking for clarity.",
  },
  {
    number: "04",
    title: "Business & Important Decisions",
    hindi: "व्यवसाय एवं महत्वपूर्ण निर्णय",
    text: "Astrological perspective on business-related questions and significant decisions in life.",
  },
];

const relatedServices = [
  {
    title: "Janam Kundali",
    hindi: "जन्म कुंडली",
    href: "/services/janam-kundali",
    text: "Birth-chart based consultation.",
  },
  {
    title: "Kundali Milan",
    hindi: "कुंडली मिलान",
    href: "/services/kundali-milan",
    text: "Two-person marriage compatibility consultation.",
  },
  {
    title: "Vastu",
    hindi: "वास्तु",
    href: "/services/vastu",
    text: "Traditional guidance concerning spaces and properties.",
  },
  {
    title: "Gemstone Consultation",
    hindi: "रत्न परामर्श",
    href: "/services/gemstones",
    text: "Astrological guidance concerning gemstones.",
  },
];

export default function VedicAstrologyPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute -right-12 -top-20 h-80 w-80 rounded-full border border-[#d7ad63]" />
          <div className="absolute left-[-10rem] bottom-[-16rem] h-[32rem] w-[32rem] rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <div className="max-w-4xl">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
              वैदिक ज्योतिष · VEDIC JYOTISH
            </p>

            <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
              Traditional Jyotish
              <br />
              for <em>important questions.</em>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
              Personalized Vedic astrology consultation for
              marriage, career, education, family, business and
              other important areas of life.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
              >
                Book a Consultation
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

        </div>
      </section>

      {/* WHAT IS VEDIC ASTROLOGY */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              समझें · UNDERSTAND
            </p>

            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              What is
              <br />
              <em>Vedic Astrology?</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              Vedic astrology, traditionally known as Jyotish,
              is an Indian astrological system that studies
              planetary positions and their relationship with
              different areas of life.
            </p>

            <p>
              A consultation generally begins with the person's
              birth information and the specific question or
              situation they want to discuss.
            </p>

            <p>
              The purpose of a consultation is not simply to
              provide a generic prediction. It is an opportunity
              to discuss a particular situation through a
              traditional astrological framework.
            </p>

            <p className="text-[#57120d]">
              वैदिक ज्योतिष में जन्म विवरण और ग्रहों की
              स्थिति के आधार पर जीवन से जुड़े महत्वपूर्ण
              विषयों पर पारंपरिक दृष्टिकोण से मार्गदर्शन
              प्रदान किया जाता है।
            </p>

          </div>

        </div>

      </section>

      {/* WHAT CAN WE DISCUSS */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                CONSULTATION AREAS
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
                What would you like
                <br />
                <em>guidance about?</em>
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-[#78665c]">
              You do not need to know the exact astrological
              service before contacting us. Tell us what is
              happening and what you would like to understand.
            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">

            {areas.map((area) => (
              <article
                key={area.number}
                className="group rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex items-start justify-between">

                  <span className="text-xs font-semibold tracking-[3px] text-[#a2742e]">
                    {area.number}
                  </span>

                  <span className="text-xs text-[#a99683]">
                    {area.hindi}
                  </span>

                </div>

                <h3 className="mt-8 font-serif text-2xl text-[#57120d]">
                  {area.title}
                </h3>

                <p className="mt-3 leading-7 text-[#74645b]">
                  {area.text}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* WHAT YOU NEED */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              BEFORE YOUR CONSULTATION
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              What information
              <br />
              <em>may be needed?</em>
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-[#74645b]">
              For many Vedic astrology consultations, birth
              information helps establish the relevant birth
              chart. Your exact requirements can depend on the
              question you want to discuss.
            </p>

          </div>

          <div className="rounded-3xl bg-[#300604] p-8 text-white md:p-10">

            <div className="space-y-7">

              <div>
                <span className="text-xs tracking-[3px] text-[#d7ad63]">
                  01
                </span>

                <h3 className="mt-2 font-serif text-2xl text-[#f3dca8]">
                  Date of Birth
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#d4c3b5]">
                  Your date of birth.
                </p>
              </div>

              <div>
                <span className="text-xs tracking-[3px] text-[#d7ad63]">
                  02
                </span>

                <h3 className="mt-2 font-serif text-2xl text-[#f3dca8]">
                  Time of Birth
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#d4c3b5]">
                  As accurately as you know it.
                </p>
              </div>

              <div>
                <span className="text-xs tracking-[3px] text-[#d7ad63]">
                  03
                </span>

                <h3 className="mt-2 font-serif text-2xl text-[#f3dca8]">
                  Place of Birth
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#d4c3b5]">
                  The city or place where you were born.
                </p>
              </div>

              <div>
                <span className="text-xs tracking-[3px] text-[#d7ad63]">
                  04
                </span>

                <h3 className="mt-2 font-serif text-2xl text-[#f3dca8]">
                  Your Question
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#d4c3b5]">
                  Tell us what you actually want guidance
                  about.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="border-y border-[#d9cbb8] bg-[#eee5d6]"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            CONSULTATION PROCESS
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            From your question
            <br />
            <em>to your consultation.</em>
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">

            <div>
              <span className="font-serif text-5xl text-[#c9aa75]">
                01
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Share your details
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                Provide your basic birth information and
                explain the question or situation you want
                to discuss.
              </p>
            </div>

            <div>
              <span className="font-serif text-5xl text-[#c9aa75]">
                02
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Consultation
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                Your question is discussed through a
                traditional Vedic astrology perspective.
              </p>
            </div>

            <div>
              <span className="font-serif text-5xl text-[#c9aa75]">
                03
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Personal guidance
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                The consultation focuses on your individual
                circumstances rather than a generic reading.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* RELATED SERVICES */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              EXPLORE FURTHER
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              Looking for something
              <br />
              <em>more specific?</em>
            </h2>

          </div>

          <p className="max-w-md text-sm leading-7 text-[#78665c]">
            If you already know what kind of consultation you
            need, explore the dedicated services below.
          </p>

        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {relatedServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6 transition hover:-translate-y-1 hover:border-[#a2742e] hover:shadow-md"
            >

              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                {service.hindi}
              </p>

              <h3 className="mt-4 font-serif text-xl text-[#57120d]">
                {service.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#74645b]">
                {service.text}
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#8b2418]">
                Explore →
              </span>

            </Link>
          ))}

        </div>

      </section>

      {/* LOCATION */}

      <section className="px-6 pb-20 md:px-10 md:pb-28">

        <div className="mx-auto max-w-7xl rounded-3xl bg-[#300604] p-8 text-white md:p-12">

          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                MUZAFFARNAGAR · UTTAR PRADESH
              </p>

              <h2 className="mt-4 font-serif text-3xl text-[#f3dca8] md:text-4xl">
                Vedic Astrology consultation
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

      {/* FINAL CTA */}

      <section className="border-t border-[#d9cbb8] bg-[#f0e6d7]">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            BEGIN WITH YOUR QUESTION
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Not sure which service
            <br />
            <em>you need?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            That's okay. Tell us about your question and
            situation, and we can understand what kind of
            consultation is appropriate.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Book a Consultation
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}