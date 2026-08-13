import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Janam Kundali Analysis in Muzaffarnagar",
  description:
    "Janam Kundali and birth chart consultation based on date, time and place of birth. Explore career, marriage, education, family and life questions with traditional Vedic astrology guidance.",
  keywords: [
    "Janam Kundali",
    "Janam Kundali Muzaffarnagar",
    "Kundali Analysis",
    "Birth Chart Analysis",
    "Vedic Birth Chart",
    "Janam Patrika",
    "जन्म कुंडली",
    "जन्म पत्रिका",
    "कुंडली विश्लेषण",
  ],
};

const topics = [
  {
    no: "01",
    title: "Career & Education",
    text: "Explore traditional astrological perspectives on education, career direction, professional changes and business-related questions.",
  },
  {
    no: "02",
    title: "Marriage & Relationships",
    text: "Discuss individual marriage and relationship questions through the perspective of the birth chart.",
  },
  {
    no: "03",
    title: "Family & Personal Life",
    text: "Understand traditional astrological perspectives around family matters and important personal phases.",
  },
  {
    no: "04",
    title: "Important Life Phases",
    text: "Discuss significant periods and transitions of life through traditional birth-chart interpretation.",
  },
];

export default function JanamKundaliPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute -right-10 -top-20 h-80 w-80 rounded-full border border-[#d7ad63]" />
          <div className="absolute left-[-10rem] bottom-[-15rem] h-[30rem] w-[30rem] rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            जन्म कुंडली · JANAM KUNDALI
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Your birth details.
            <br />
            Your <em>Kundali.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            Personalized birth-chart consultation based on
            your date, time and place of birth, with traditional
            Vedic astrology guidance for the questions that
            matter to you.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              Book Kundali Consultation
              <span className="ml-3">→</span>
            </a>

            <a
              href="#birth-details"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              What You Need
            </a>

          </div>

        </div>
      </section>

      {/* WHAT IS KUNDALI */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.75fr_1.25fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              जन्म पत्रिका · BIRTH CHART
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              What is a
              <br />
              <em>Janam Kundali?</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              A Janam Kundali, or birth chart, is a traditional
              Vedic astrology chart prepared using a person's
              date, time and place of birth.
            </p>

            <p>
              These birth details are important because the
              time and location of birth are used to establish
              the chart's planetary positions and other
              astrological factors.
            </p>

            <p>
              A consultation then focuses on interpreting the
              chart in relation to the particular questions or
              circumstances the person wants to discuss.
            </p>

            <p className="text-[#57120d]">
              जन्म कुंडली के लिए जन्म तिथि, जन्म समय और
              जन्म स्थान महत्वपूर्ण माने जाते हैं। इन्हीं
              विवरणों के आधार पर पारंपरिक वैदिक ज्योतिष
              के अनुसार कुंडली का अध्ययन किया जाता है।
            </p>

          </div>

        </div>

      </section>

      {/* BIRTH DETAILS */}

      <section
        id="birth-details"
        className="border-y border-[#d9cbb8] bg-[#eee5d6]"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                BEFORE CONSULTATION
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
                The four details
                <br />
                <em>that get you started.</em>
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-[#74645b]">
                The more accurately you can provide your birth
                information, the more useful it can be for a
                birth-chart consultation.
              </p>

            </div>

            <div className="rounded-3xl bg-[#300604] p-8 text-white md:p-10">

              <div className="space-y-7">

                <div className="flex gap-5">
                  <span className="font-serif text-3xl text-[#d7ad63]">
                    01
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl text-[#f3dca8]">
                      Name
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#d4c3b5]">
                      Your name for the consultation request.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <span className="font-serif text-3xl text-[#d7ad63]">
                    02
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl text-[#f3dca8]">
                      Date of Birth
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#d4c3b5]">
                      Your complete date of birth.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <span className="font-serif text-3xl text-[#d7ad63]">
                    03
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl text-[#f3dca8]">
                      Time of Birth
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#d4c3b5]">
                      As accurately as you know it.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <span className="font-serif text-3xl text-[#d7ad63]">
                    04
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl text-[#f3dca8]">
                      Place of Birth
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#d4c3b5]">
                      City, town or place where you were born.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* BIRTH TIME */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-12 md:grid-cols-2 md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              WHY TIME MATTERS
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              Don't know your
              <br />
              <em>exact birth time?</em>
            </h2>

          </div>

          <div className="space-y-5 text-[16px] leading-8 text-[#685851]">

            <p>
              Birth time is an important part of preparing a
              traditional birth chart. Even a difference in
              time can affect certain chart calculations.
            </p>

            <p>
              If you do not know your exact birth time, tell us
              what you know when requesting a consultation.
              The astrologer can then determine what can
              reasonably be discussed with the available
              information.
            </p>

            <div className="rounded-2xl border border-[#d5c5ae] bg-[#eee5d6] p-6">

              <p className="text-sm font-semibold text-[#57120d]">
                Important
              </p>

              <p className="mt-2 text-sm leading-7 text-[#74645b]">
                Do not guess a precise time simply to complete
                a form. If your birth time is uncertain, mention
                that during your consultation request.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* WHAT CAN BE EXPLORED */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="max-w-2xl">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              KUNDALI CONSULTATION
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              What can your
              <br />
              <em>Kundali help explore?</em>
            </h2>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">

            {topics.map((topic) => (
              <article
                key={topic.no}
                className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-8"
              >

                <span className="text-xs font-semibold tracking-[3px] text-[#a2742e]">
                  {topic.no}
                </span>

                <h3 className="mt-6 font-serif text-2xl text-[#57120d]">
                  {topic.title}
                </h3>

                <p className="mt-3 leading-7 text-[#74645b]">
                  {topic.text}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* HOW CONSULTATION WORKS */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              THE PROCESS
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              From birth details
              <br />
              <em>to consultation.</em>
            </h2>

          </div>

          <div className="space-y-10">

            <div className="flex gap-6">

              <span className="font-serif text-4xl text-[#c9aa75]">
                01
              </span>

              <div>
                <h3 className="font-serif text-2xl text-[#57120d]">
                  Share your details
                </h3>

                <p className="mt-2 leading-7 text-[#74645b]">
                  Provide your name, date of birth, birth time,
                  address and the question you want to discuss.
                </p>
              </div>

            </div>

            <div className="flex gap-6">

              <span className="font-serif text-4xl text-[#c9aa75]">
                02
              </span>

              <div>
                <h3 className="font-serif text-2xl text-[#57120d]">
                  Birth chart is considered
                </h3>

                <p className="mt-2 leading-7 text-[#74645b]">
                  Your birth information provides the basis for
                  the traditional astrological consultation.
                </p>
              </div>

            </div>

            <div className="flex gap-6">

              <span className="font-serif text-4xl text-[#c9aa75]">
                03
              </span>

              <div>
                <h3 className="font-serif text-2xl text-[#57120d]">
                  Discuss your question
                </h3>

                <p className="mt-2 leading-7 text-[#74645b]">
                  The consultation focuses on your particular
                  circumstances rather than a generic reading.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* KUNDALI MILAN CROSS LINK */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            FOR TWO PEOPLE
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Looking for
            <br />
            <em>Kundali Milan?</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
            If you want marriage compatibility guidance for
            two people, use our dedicated Kundali Milan
            consultation where birth details for both people
            can be submitted.
          </p>

          <Link
            href="/services/kundali-milan"
            className="mt-7 inline-flex items-center rounded-full border border-[#8b2418] px-7 py-3.5 font-semibold text-[#8b2418] transition hover:bg-[#8b2418] hover:text-white"
          >
            Go to Kundali Milan
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
                Janam Kundali consultation
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
            जन्म कुंडली परामर्श
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Ready to discuss
            <br />
            <em>your Kundali?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Share your birth details and tell us what you
            would like guidance about.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Book Kundali Consultation
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}