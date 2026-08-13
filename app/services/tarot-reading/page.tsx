import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot Reading in Muzaffarnagar | Tarot Consultation",
  description:
    "Tarot reading consultation in Muzaffarnagar for relationships, career decisions, personal questions and situations where you are seeking clarity and perspective.",
  keywords: [
    "Tarot Reading",
    "Tarot Reading Muzaffarnagar",
    "Tarot Consultation",
    "Tarot Card Reading",
    "Love Tarot",
    "Career Tarot",
    "Tarot Reader Muzaffarnagar",
    "टैरो रीडिंग",
    "टैरो कार्ड",
    "टैरो परामर्श",
  ],
};

const areas = [
  {
    no: "01",
    title: "Love & Relationships",
    hindi: "प्रेम एवं संबंध",
    text: "Explore questions about relationships, emotional situations, communication and the direction of a connection.",
  },
  {
    no: "02",
    title: "Career & Work",
    hindi: "करियर एवं कार्य",
    text: "Bring questions about career choices, professional situations, opportunities or uncertainty around work.",
  },
  {
    no: "03",
    title: "Decisions",
    hindi: "निर्णय",
    text: "Use a reading as a reflective tool when you are considering different paths or trying to understand a situation.",
  },
  {
    no: "04",
    title: "Personal Direction",
    hindi: "जीवन दिशा",
    text: "Discuss situations where you are looking for perspective, clarity or a different way of looking at what is happening.",
  },
];

const steps = [
  {
    no: "01",
    title: "Bring a question",
    text: "Start with the situation you want to understand. A clear question usually makes the reading more focused.",
  },
  {
    no: "02",
    title: "Have the reading",
    text: "The cards are interpreted symbolically in relation to the question and context you provide.",
  },
  {
    no: "03",
    title: "Reflect on the guidance",
    text: "The reading can offer another perspective on your situation and help you think through the possibilities.",
  },
];

const goodQuestions = [
  "What should I understand about this relationship?",
  "What should I consider before making this career decision?",
  "What may be influencing the situation I am currently facing?",
  "What perspective might I be missing?",
  "What should I focus on as I move forward?",
];

export default function TarotReadingPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#21030a] text-white">

        <div className="absolute inset-0 opacity-25">

          <div className="absolute -left-24 -top-24 h-80 w-80 rotate-45 border border-[#d7ad63]" />

          <div className="absolute right-[-8rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full border border-[#d7ad63]" />

          <div className="absolute bottom-[-12rem] left-[35%] h-72 w-72 rounded-full border border-[#d7ad63]" />

          <div className="absolute right-[18%] top-[30%] text-7xl text-[#d7ad63]">
            ✦
          </div>

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            टैरो रीडिंग · TAROT READING
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Sometimes you don't need
            <br />
            another answer.
            <br />
            You need <em>another perspective.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            A question-focused Tarot consultation for
            relationships, career decisions, personal situations
            and moments when you want to explore a different
            perspective.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              Request a Tarot Reading
              <span className="ml-3">→</span>
            </a>

            <a
              href="#questions"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              What Can I Ask?
            </a>

          </div>

        </div>

      </section>

      {/* WHAT IS TAROT */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              UNDERSTANDING TAROT
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              Tarot begins with
              <br />
              <em>your question.</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              Tarot is a symbolic card-reading tradition in
              which cards are interpreted in relation to a
              question, situation or theme.
            </p>

            <p>
              Unlike a Janam Kundali consultation, you do not
              necessarily need to begin with detailed birth
              information. The focus is the question or situation
              you want to explore.
            </p>

            <p>
              A reading can be used as a reflective and
              interpretive experience rather than as a guarantee
              of what will happen in the future.
            </p>

            <p className="text-[#57120d]">
              टैरो रीडिंग में आपके प्रश्न और परिस्थिति को
              केंद्र में रखकर कार्ड्स के पारंपरिक प्रतीकों
              और अर्थों की व्याख्या की जाती है।
            </p>

          </div>

        </div>

      </section>

      {/* QUESTIONS */}

      <section
        id="questions"
        className="border-y border-[#d9cbb8] bg-[#eee5d6]"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="max-w-3xl">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              WHAT CAN YOU ASK?
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              Bring the situation
              <br />
              <em>that is on your mind.</em>
            </h2>

            <p className="mt-5 leading-7 text-[#74645b]">
              There does not have to be a complicated question.
              The important thing is that the question is
              meaningful to you.
            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">

            {goodQuestions.map((question, index) => (
              <div
                key={question}
                className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6"
              >

                <span className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-5 font-serif text-xl leading-8 text-[#57120d]">
                  "{question}"
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* AREAS */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              COMMON READING THEMES
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              What is your question
              <br />
              <em>about?</em>
            </h2>

          </div>

          <p className="max-w-md text-sm leading-7 text-[#78665c]">
            Tarot readings can be adapted to the situation you
            actually want to discuss.
          </p>

        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">

          {areas.map((area) => (
            <article
              key={area.no}
              className="rounded-2xl border border-[#d5c5ae] bg-[#eee5d6] p-8 transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-start justify-between">

                <span className="text-xs font-semibold tracking-[3px] text-[#a2742e]">
                  {area.no}
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

      </section>

      {/* A READING EXPERIENCE */}

      <section className="border-y border-[#d9cbb8] bg-[#300604] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[0.75fr_1.25fr] md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                THE READING
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f3dca8] md:text-5xl">
                A conversation
                <br />
                with <em>the cards.</em>
              </h2>

            </div>

            <div>

              <p className="leading-8 text-[#d4c3b5]">
                A Tarot reading is not simply about turning over
                cards and assigning isolated meanings to them.
                The cards are considered together and interpreted
                in relation to your question and the surrounding
                context.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-5">

                  <span className="text-2xl text-[#d7ad63]">
                    ✦
                  </span>

                  <h3 className="mt-4 font-serif text-xl text-[#f3dca8]">
                    Question
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                    What do you want to explore?
                  </p>

                </div>

                <div className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-5">

                  <span className="text-2xl text-[#d7ad63]">
                    ◇
                  </span>

                  <h3 className="mt-4 font-serif text-xl text-[#f3dca8]">
                    Cards
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                    What symbolic themes appear?
                  </p>

                </div>

                <div className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-5">

                  <span className="text-2xl text-[#d7ad63]">
                    ∴
                  </span>

                  <h3 className="mt-4 font-serif text-xl text-[#f3dca8]">
                    Reflection
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                    What perspective can you take away?
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
          HOW IT WORKS
        </p>

        <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
          Three steps.
          <br />
          <em>One question at a time.</em>
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.no}
              className="border-t-2 border-[#c9aa75] pt-6"
            >

              <span className="text-xs font-bold tracking-[3px] text-[#a2742e]">
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

      {/* WHAT TO PREPARE */}

      <section className="bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                BEFORE YOUR READING
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
                You don't need
                <br />
                <em>to prepare a script.</em>
              </h2>

              <p className="mt-6 leading-8 text-[#74645b]">
                Come with the situation as it is. A little
                context can help make the reading more relevant,
                but you do not need to know Tarot terminology.
              </p>

            </div>

            <div className="space-y-4">

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  01
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  Your main question
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#74645b]">
                  What would you most like clarity or perspective
                  about?
                </p>

              </div>

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  02
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  Useful context
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#74645b]">
                  Share only the background that you feel is
                  relevant to the question.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  03
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  An open mind
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#74645b]">
                  The reading is interpretive, so it is best
                  approached as a reflective experience.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* IMPORTANT BOUNDARY */}

      <section className="mx-auto max-w-5xl px-6 py-20 md:py-24">

        <div className="rounded-3xl border border-[#d5c5ae] bg-[#f0e6d7] p-8 text-center md:p-12">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            A PRACTICAL NOTE
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Guidance, not a
            <br />
            <em>guaranteed prediction.</em>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#74645b]">
            Tarot is a traditional and symbolic form of
            interpretation. A reading should not be treated as
            a guaranteed prediction or as a replacement for
            professional medical, legal, financial or other
            specialist advice.
          </p>

        </div>

      </section>

      {/* KUNDALI CROSS LINK */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            WANT BIRTH-CHART GUIDANCE?
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Prefer a
            <br />
            <em>Janam Kundali reading?</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
            If your question is specifically about your birth
            chart, planetary placements or long-term life
            themes, explore the dedicated Kundali service.
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

        <div className="mx-auto max-w-7xl rounded-3xl bg-[#21030a] p-8 text-white md:p-12">

          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                MUZAFFARNAGAR · UTTAR PRADESH
              </p>

              <h2 className="mt-4 font-serif text-3xl text-[#f3dca8] md:text-4xl">
                Tarot reading
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
            टैरो परामर्श
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Have a question
            <br />
            <em>on your mind?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Bring the situation you want to explore and
            request a Tarot consultation.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Request a Tarot Reading
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}