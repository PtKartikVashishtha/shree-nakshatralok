import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Palmistry Consultation in Muzaffarnagar | Hast Rekha Shastra",
  description:
    "Traditional Palmistry and Hast Rekha Shastra consultation in Muzaffarnagar. Explore palm lines, mounts and traditional interpretations through an in-person or image-based reading.",
  keywords: [
    "Palmistry",
    "Palmistry Consultation",
    "Palm Reading",
    "Palmistry Muzaffarnagar",
    "Hast Rekha Shastra",
    "Hast Rekha",
    "Palm Reader Muzaffarnagar",
    "Palm Reading India",
    "हस्त रेखा",
    "हस्त रेखा शास्त्र",
    "हस्तरेखा",
    "हस्तरेखा ज्योतिष",
  ],
};

const lines = [
  {
    no: "01",
    title: "Life Line",
    hindi: "जीवन रेखा",
    text: "Traditionally examined for its shape, length, depth and surrounding markings as part of a broader palm interpretation.",
  },
  {
    no: "02",
    title: "Head Line",
    hindi: "मस्तिष्क रेखा",
    text: "Traditionally associated with thinking patterns, mental tendencies and the way the line develops across the palm.",
  },
  {
    no: "03",
    title: "Heart Line",
    hindi: "हृदय रेखा",
    text: "Traditionally considered in relation to emotional expression, relationships and matters of the heart.",
  },
  {
    no: "04",
    title: "Fate Line",
    hindi: "भाग्य रेखा",
    text: "A line traditionally examined for patterns associated with work, direction and significant changes in life.",
  },
];

const areas = [
  {
    title: "Major Palm Lines",
    text: "The principal lines are considered together rather than reading a single line in isolation.",
  },
  {
    title: "Mounts",
    text: "The raised areas of the palm are traditionally associated with different planetary qualities and interpreted according to their prominence.",
  },
  {
    title: "Finger & Thumb Structure",
    text: "The shape, proportions and flexibility of the fingers and thumb may also form part of a traditional palm reading.",
  },
  {
    title: "Markings",
    text: "Traditional palmistry may examine additional signs, intersections and markings appearing on different parts of the palm.",
  },
];

export default function PalmistryPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#17120e] text-white">

        <div className="absolute inset-0 opacity-25">

          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full border border-[#d7ad63]" />

          <div className="absolute right-[-10rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full border border-[#d7ad63]" />

          <div className="absolute bottom-[-12rem] left-[38%] h-72 w-72 rounded-full border border-[#d7ad63]" />

          <div className="absolute right-[22%] top-[30%] text-7xl text-[#d7ad63]">
            ✋
          </div>

        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            हस्त रेखा शास्त्र · PALMISTRY
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Your hands carry
            <br />
            a <em>map of lines.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            Explore the traditional art of Hast Rekha Shastra
            through the lines, mounts, fingers and markings of
            the palm.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#21170f] transition hover:bg-[#e1bd78]"
            >
              Request Palm Reading
              <span className="ml-3">→</span>
            </a>

            <a
              href="#reading"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              Explore Palmistry
            </a>

          </div>

        </div>

      </section>

      {/* INTRO */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              HAST REKHA SHASTRA
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              A palm is more
              <br />
              than <em>one line.</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              Palmistry is a traditional practice in which the
              lines, shapes and features of the hand are
              interpreted symbolically.
            </p>

            <p>
              A meaningful reading does not depend on one
              isolated line. The overall structure of the palm,
              major lines, mounts, fingers and other markings may
              all be considered together.
            </p>

            <p>
              This makes the quality and clarity of the palm
              available for examination especially important.
            </p>

            <p className="text-[#57120d]">
              हस्तरेखा शास्त्र में हथेली की प्रमुख रेखाओं,
              पर्वतों, उंगलियों और अन्य चिन्हों को एक साथ
              देखकर पारंपरिक व्याख्या की जाती है।
            </p>

          </div>

        </div>

      </section>

      {/* READING INPUT */}

      <section
        id="reading"
        className="border-y border-[#d9cbb8] bg-[#eee5d6]"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                WHAT DO WE NEED?
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
                The clearer the palm,
                <br />
                <em>the better the reading.</em>
              </h2>

              <p className="mt-6 leading-8 text-[#74645b]">
                For an online consultation, clear photographs
                of your palms are important. An in-person
                consultation allows the palm to be examined
                directly.
              </p>

            </div>

            <div className="rounded-3xl bg-[#300604] p-8 text-white md:p-10">

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                ONLINE READING
              </p>

              <h3 className="mt-5 font-serif text-3xl text-[#f3dca8]">
                Clear palm photographs
              </h3>

              <div className="mt-7 space-y-4">

                <div className="flex gap-4">

                  <span className="text-[#d7ad63]">01</span>

                  <p className="text-sm leading-7 text-[#d4c3b5]">
                    Photograph the complete palm rather than
                    only one line.
                  </p>

                </div>

                <div className="flex gap-4">

                  <span className="text-[#d7ad63]">02</span>

                  <p className="text-sm leading-7 text-[#d4c3b5]">
                    Keep the image sharp, well-lit and free from
                    heavy shadows.
                  </p>

                </div>

                <div className="flex gap-4">

                  <span className="text-[#d7ad63]">03</span>

                  <p className="text-sm leading-7 text-[#d4c3b5]">
                    Keep the fingers and wrist area visible where
                    possible.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* MAJOR LINES */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="max-w-3xl">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            THE MAJOR LINES
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Four lines you will
            <br />
            <em>often hear about.</em>
          </h2>

          <p className="mt-5 leading-7 text-[#74645b]">
            These traditional associations are only part of a
            complete palm reading.
          </p>

        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">

          {lines.map((line) => (
            <article
              key={line.no}
              className="rounded-2xl border border-[#d5c5ae] bg-[#eee5d6] p-8"
            >

              <div className="flex items-start justify-between">

                <span className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  {line.no}
                </span>

                <span className="text-xs text-[#a99683]">
                  {line.hindi}
                </span>

              </div>

              <h3 className="mt-8 font-serif text-2xl text-[#57120d]">
                {line.title}
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                {line.text}
              </p>

            </article>
          ))}

        </div>

      </section>

      {/* BEYOND LINES */}

      <section className="border-y border-[#d9cbb8] bg-[#300604] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                BEYOND THE LINES
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f3dca8] md:text-5xl">
                The palm has
                <br />
                <em>more to say.</em>
              </h2>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {areas.map((area, index) => (
                <div
                  key={area.title}
                  className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-6"
                >

                  <span className="text-xs tracking-[3px] text-[#d7ad63]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-5 font-serif text-xl text-[#f3dca8]">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#cdbbb0]">
                    {area.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* QUESTIONS */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-start md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              WHAT CAN YOU ASK?
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              Bring the parts of
              <br />
              life you're curious
              <br />
              <em>about.</em>
            </h2>

          </div>

          <div className="space-y-4">

            {[
              "What do the major lines traditionally indicate?",
              "What can the overall shape of my palm suggest?",
              "What do the mounts and markings traditionally represent?",
              "What patterns are visible in my palm?",
              "How are different lines interpreted together?",
            ].map((question, index) => (
              <div
                key={question}
                className="flex gap-5 border-b border-[#d8c9b3] pb-5"
              >

                <span className="text-xs font-bold tracking-[3px] text-[#a2742e]">
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

      {/* PROCESS */}

      <section className="bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            THE CONSULTATION
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            From palm
            <br />
            <em>to interpretation.</em>
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">

            <div className="border-t-2 border-[#c9aa75] pt-6">

              <span className="font-serif text-5xl text-[#c9aa75]">
                01
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Examine
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                The available palm is examined for its overall
                structure, major lines and other visible features.
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
                Individual features are considered together using
                traditional palmistry principles.
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
                The reading is connected to the questions and
                areas of life you want to explore.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* IMPORTANT NOTE */}

      <section className="mx-auto max-w-5xl px-6 py-20 md:py-24">

        <div className="rounded-3xl border border-[#d5c5ae] bg-[#f0e6d7] p-8 text-center md:p-12">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            A PRACTICAL NOTE
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Traditional interpretation,
            <br />
            <em>not a fixed destiny.</em>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#74645b]">
            Palmistry is a traditional interpretive practice.
            Palm lines should not be presented as scientifically
            proven predictors of a person's future or as a
            replacement for professional medical, legal,
            financial or other specialist advice.
          </p>

        </div>

      </section>

      {/* KUNDALI CROSS LINK */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            WANT A BIRTH-CHART READING?
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Explore your
            <br />
            <em>Janam Kundali.</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
            If you want guidance based on planetary placements,
            houses and your birth details, explore the dedicated
            Kundali consultation.
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

        <div className="mx-auto max-w-7xl rounded-3xl bg-[#17120e] p-8 text-white md:p-12">

          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                MUZAFFARNAGAR · UTTAR PRADESH
              </p>

              <h2 className="mt-4 font-serif text-3xl text-[#f3dca8] md:text-4xl">
                Palmistry consultation
                <br />
                <em>in Muzaffarnagar & online.</em>
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-[#d4c3b5]">
                Offline consultation is available at Shanti
                Nagar, Muzaffarnagar, Uttar Pradesh · 251002.
                Online consultation can be arranged using clear
                palm photographs.
              </p>

            </div>

            <div className="text-sm text-[#ead9b3] md:text-right">

              <p>OFFLINE</p>
              <p className="mt-1">SHANTI NAGAR · 251002</p>

              <p className="mt-5">ONLINE</p>
              <p className="mt-1">CLEAR PALM PHOTOS</p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="border-t border-[#d9cbb8] bg-[#f0e6d7]">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            हस्तरेखा परामर्श
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Curious about what
            <br />
            <em>your palm shows?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Request a traditional palmistry consultation and
            provide clear palm photographs for an online reading.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Request Palm Reading
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}