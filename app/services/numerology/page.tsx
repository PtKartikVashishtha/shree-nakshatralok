import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Numerology Consultation in Muzaffarnagar | Ank Jyotish",
  description:
    "Traditional Numerology and Ank Jyotish consultation in Muzaffarnagar covering Mulank, Bhagyank, name numerology, career, relationships and personal guidance.",
  keywords: [
    "Numerology",
    "Numerology Consultation",
    "Ank Jyotish",
    "Numerology Muzaffarnagar",
    "Mulank",
    "Bhagyank",
    "Name Numerology",
    "Numerology Calculator",
    "अंक ज्योतिष",
    "मूलांक",
    "भाग्यांक",
    "नाम अंक ज्योतिष",
  ],
};

const numbers = [
  {
    no: "01",
    title: "Mulank",
    hindi: "मूलांक",
    text: "Traditionally derived from the day of birth and associated with a person's basic numerical tendencies.",
  },
  {
    no: "02",
    title: "Bhagyank",
    hindi: "भाग्यांक",
    text: "Traditionally calculated from the complete date of birth and interpreted as a broader life-number influence.",
  },
  {
    no: "03",
    title: "Name Number",
    hindi: "नामांक",
    text: "A numerical interpretation based on the letters of a person's name according to a particular numerological system.",
  },
  {
    no: "04",
    title: "Number Compatibility",
    hindi: "अंक सामंजस्य",
    text: "Traditional comparison of numerical influences when discussing relationships, partnerships or other connections.",
  },
];

const topics = [
  "Understanding your Mulank and Bhagyank",
  "Name-based numerology",
  "Career and professional direction",
  "Business and partnership considerations",
  "Relationship compatibility",
  "Personal strengths and tendencies",
];

export default function NumerologyPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">

          <div className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full border border-[#d7ad63]" />

          <div className="absolute right-16 top-16 h-56 w-56 rounded-full border border-[#d7ad63]" />

          <div className="absolute bottom-[-14rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full border border-[#d7ad63]" />

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            अंक ज्योतिष · NUMEROLOGY
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Your numbers tell
            <br />
            a <em>different story.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            Traditional Ank Jyotish consultation using your
            date of birth and, where relevant, your name to
            explore numerical patterns and their traditional
            interpretations.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              Request Numerology Consultation
              <span className="ml-3">→</span>
            </a>

            <a
              href="#numbers"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              Explore the Numbers
            </a>

          </div>

        </div>

      </section>

      {/* INTRO */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              UNDERSTANDING ANK JYOTISH
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              Numbers become
              <br />
              <em>meaningful in context.</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              Numerology is a traditional interpretive practice
              that assigns symbolic significance to numbers
              associated with a person's birth date or name.
            </p>

            <p>
              In Ank Jyotish, different numbers are calculated
              and interpreted according to the chosen
              numerological tradition.
            </p>

            <p>
              The purpose of a consultation is not simply to
              produce a number. It is to understand how the
              relevant numbers are traditionally interpreted
              together.
            </p>

            <p className="text-[#57120d]">
              अंक ज्योतिष में जन्म तिथि और नाम से जुड़े
              अंकों की पारंपरिक व्याख्या के माध्यम से
              व्यक्ति के जीवन से जुड़े विभिन्न विषयों को समझा जाता है।
            </p>

          </div>

        </div>

      </section>

      {/* NUMBER SYSTEM */}

      <section
        id="numbers"
        className="border-y border-[#d9cbb8] bg-[#eee5d6]"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="max-w-3xl">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              THE BASIC NUMBERS
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              Which numbers
              <br />
              <em>are considered?</em>
            </h2>

            <p className="mt-5 leading-7 text-[#74645b]">
              Different numerological systems use different
              methods. These are some of the concepts commonly
              discussed in an Ank Jyotish consultation.
            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">

            {numbers.map((item) => (
              <article
                key={item.no}
                className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-8"
              >

                <div className="flex items-start justify-between">

                  <span className="text-xs font-semibold tracking-[3px] text-[#a2742e]">
                    {item.no}
                  </span>

                  <span className="text-xs text-[#a99683]">
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

        </div>

      </section>

      {/* MULANK / BHAGYANK */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-5 md:grid-cols-2">

          <div className="relative overflow-hidden rounded-3xl bg-[#300604] p-8 text-white md:p-10">

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#d7ad63]/25" />

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
              मूलांक
            </p>

            <div className="mt-6 flex items-end gap-4">

              <span className="font-serif text-7xl text-[#f3dca8]">
                1–9
              </span>

              <span className="pb-2 text-sm text-[#cdbbb0]">
                Birth-day based
              </span>

            </div>

            <h3 className="mt-8 font-serif text-3xl text-[#f3dca8]">
              Mulank
            </h3>

            <p className="mt-4 leading-7 text-[#d4c3b5]">
              Traditionally associated with the day of birth.
              It is commonly interpreted in relation to personal
              tendencies and characteristics.
            </p>

          </div>

          <div className="rounded-3xl border border-[#d5c5ae] bg-[#eee5d6] p-8 md:p-10">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              भाग्यांक
            </p>

            <div className="mt-6 flex items-end gap-4">

              <span className="font-serif text-7xl text-[#57120d]">
                1–9
              </span>

              <span className="pb-2 text-sm text-[#806d66]">
                Full-date based
              </span>

            </div>

            <h3 className="mt-8 font-serif text-3xl text-[#57120d]">
              Bhagyank
            </h3>

            <p className="mt-4 leading-7 text-[#74645b]">
              Traditionally derived from the complete date of
              birth and interpreted as a broader numerical
              influence.
            </p>

          </div>

        </div>

      </section>

      {/* TOPICS */}

      <section className="border-y border-[#d9cbb8] bg-[#300604] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                WHAT CAN WE DISCUSS?
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f3dca8] md:text-5xl">
                Your numbers can
                <br />
                be explored around
                <br />
                <em>real questions.</em>
              </h2>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {topics.map((topic, index) => (
                <div
                  key={topic}
                  className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-5"
                >

                  <span className="text-xs tracking-[3px] text-[#d7ad63]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-4 text-sm leading-7 text-[#d4c3b5]">
                    {topic}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* NAME NUMEROLOGY */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              NAME NUMEROLOGY · नामांक
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              Your name has
              <br />
              <em>a number too.</em>
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-[#74645b]">
              In name numerology, letters are assigned numerical
              values according to the chosen system and the
              resulting number is interpreted traditionally.
            </p>

            <p className="mt-5 max-w-2xl leading-8 text-[#74645b]">
              This can be discussed alongside birth-date numbers
              when the consultation calls for it.
            </p>

          </div>

          <div className="rounded-3xl bg-[#eee5d6] p-8 md:p-10">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              BRING YOUR NAME
            </p>

            <div className="mt-8 font-serif text-4xl text-[#57120d]">
              NAME
              <span className="mx-3 text-[#c19a5b]">+</span>
              DATE
              <span className="mx-3 text-[#c19a5b]">=</span>
              NUMBERS
            </div>

            <p className="mt-6 text-sm leading-7 text-[#74645b]">
              If your question involves your name, keep the
              spelling you normally use available for the
              consultation.
            </p>

          </div>

        </div>

      </section>

      {/* WHAT TO PROVIDE */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                BEFORE CONSULTATION
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
                What should
                <br />
                <em>you provide?</em>
              </h2>

            </div>

            <div className="space-y-4">

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  01 · DATE OF BIRTH
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  Your complete birth date
                </h3>

                <p className="mt-2 leading-7 text-[#74645b]">
                  This is used for the traditional date-based
                  numerical calculations.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  02 · NAME
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  Your usual name
                </h3>

                <p className="mt-2 leading-7 text-[#74645b]">
                  Useful when the consultation includes name
                  numerology.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  03 · QUESTION
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  What do you want to understand?
                </h3>

                <p className="mt-2 leading-7 text-[#74645b]">
                  Tell us whether your focus is personal,
                  professional, relationship-related or something
                  else.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PROCESS */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
          HOW THE CONSULTATION WORKS
        </p>

        <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
          From numbers
          <br />
          <em>to interpretation.</em>
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          <div className="border-t-2 border-[#c9aa75] pt-6">

            <span className="font-serif text-5xl text-[#c9aa75]">
              01
            </span>

            <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
              Calculate
            </h3>

            <p className="mt-3 leading-7 text-[#74645b]">
              Relevant numbers are derived from the information
              provided according to the chosen traditional system.
            </p>

          </div>

          <div className="border-t-2 border-[#c9aa75] pt-6">

            <span className="font-serif text-5xl text-[#c9aa75]">
              02
            </span>

            <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
              Interpret
            </h3>

            <p className="mt-3 leading-7 text-[#74645b]">
              The numerical patterns are considered together
              rather than treating one number as the complete
              answer.
            </p>

          </div>

          <div className="border-t-2 border-[#c9aa75] pt-6">

            <span className="font-serif text-5xl text-[#c9aa75]">
              03
            </span>

            <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
              Discuss
            </h3>

            <p className="mt-3 leading-7 text-[#74645b]">
              The interpretation is connected back to the
              question or situation you actually came with.
            </p>

          </div>

        </div>

      </section>

      {/* PRACTICAL NOTE */}

      <section className="bg-[#eee5d6]">

        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">

          <div className="rounded-3xl border border-[#d5c5ae] bg-[#f7f0e5] p-8 text-center md:p-12">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              A PRACTICAL NOTE
            </p>

            <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
              Numerology is
              <br />
              <em>interpretive, not deterministic.</em>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#74645b]">
              Numerology is a traditional belief and
              interpretive practice. A consultation should not be
              treated as a guaranteed prediction or as a
              replacement for professional medical, financial,
              legal or other specialist advice.
            </p>

          </div>

        </div>

      </section>

      {/* KUNDALI CROSS LINK */}

      <section className="border-y border-[#d9cbb8] bg-[#f7f0e5]">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            WANT A BIRTH-CHART ANALYSIS?
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Explore your
            <br />
            <em>Janam Kundali.</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
            If your questions are specifically about planetary
            placements, houses, dashas or your birth chart,
            explore the dedicated Kundali consultation.
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
                Numerology consultation
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
            अंक ज्योतिष परामर्श
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Curious about your
            <br />
            <em>numbers?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Share your birth date, name and the question you
            want to explore.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Request Numerology Consultation
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}