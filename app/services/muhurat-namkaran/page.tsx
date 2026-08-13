import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shubh Muhurat & Namkaran Consultation in Muzaffarnagar",
  description:
    "Traditional Shubh Muhurat and Namkaran consultation in Muzaffarnagar for marriage, Griha Pravesh, business, property, vehicle and other important beginnings.",
  keywords: [
    "Shubh Muhurat",
    "Muhurat Muzaffarnagar",
    "Namkaran",
    "Namkaran Muhurat",
    "Shubh Muhurat Muzaffarnagar",
    "Auspicious Time",
    "Griha Pravesh Muhurat",
    "Marriage Muhurat",
    "मुहूर्त",
    "शुभ मुहूर्त",
    "नामकरण",
  ],
};

const occasions = [
  {
    no: "01",
    title: "Marriage",
    hindi: "विवाह",
    text: "Traditional consideration of auspicious dates and timings for marriage ceremonies.",
  },
  {
    no: "02",
    title: "Griha Pravesh",
    hindi: "गृह प्रवेश",
    text: "Selection of a traditionally suitable time for entering a new home.",
  },
  {
    no: "03",
    title: "Business & Office",
    hindi: "व्यवसाय एवं कार्यालय",
    text: "Muhurat consultation for starting a new business, shop, office or important professional activity.",
  },
  {
    no: "04",
    title: "Property & Vehicle",
    hindi: "संपत्ति एवं वाहन",
    text: "Traditional timing guidance for significant purchases and beginnings.",
  },
  {
    no: "05",
    title: "Important Beginnings",
    hindi: "शुभ आरंभ",
    text: "Consultation for other significant occasions where choosing an appropriate time matters to you.",
  },
  {
    no: "06",
    title: "Namkaran",
    hindi: "नामकरण",
    text: "Traditional naming consultation for a newborn, including consideration of suitable names and naming traditions.",
  },
];

const process = [
  {
    no: "01",
    title: "Tell us about the occasion",
    text: "Let us know what you are planning and why you need a Muhurat or Namkaran consultation.",
  },
  {
    no: "02",
    title: "Share the relevant details",
    text: "Provide the location, preferred date or date range and any other information relevant to the occasion.",
  },
  {
    no: "03",
    title: "Discuss suitable options",
    text: "The consultation considers the available details through a traditional astrological framework.",
  },
];

export default function MuhuratNamkaranPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute -right-8 -top-16 h-72 w-72 rounded-full border border-[#d7ad63]" />
          <div className="absolute bottom-[-15rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            शुभ मुहूर्त · SHUBH MUHURAT
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Choose the time
            <br />
            for your <em>important beginning.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            Traditional Muhurat consultation for important
            beginnings, ceremonies and life events — along
            with Namkaran guidance for newborns.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              Request a Muhurat
              <span className="ml-3">→</span>
            </a>

            <a
              href="#occasions"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              Explore Occasions
            </a>

          </div>

        </div>
      </section>

      {/* INTRO */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.75fr_1.25fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              मुहूर्त · AUSPICIOUS TIMING
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              What is
              <br />
              <em>Shubh Muhurat?</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              Muhurat refers to the traditional practice of
              selecting a suitable time for beginning an
              important activity or performing a significant
              ceremony.
            </p>

            <p>
              In Jyotish traditions, the timing of an event may
              be considered in relation to the date, location
              and relevant astrological factors.
            </p>

            <p>
              The purpose of a Muhurat consultation is therefore
              different from a general birth-chart reading:
              the focus is on the <em>timing of the event</em>.
            </p>

            <p className="text-[#57120d]">
              शुभ मुहूर्त का उद्देश्य किसी महत्वपूर्ण कार्य
              या संस्कार के लिए परंपरागत ज्योतिषीय दृष्टि से
              उपयुक्त समय का विचार करना है।
            </p>

          </div>

        </div>

      </section>

      {/* OCCASIONS */}

      <section
        id="occasions"
        className="border-y border-[#d9cbb8] bg-[#eee5d6]"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                CONSULTATION TYPES
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
                When might you need
                <br />
                <em>a Muhurat?</em>
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-[#78665c]">
              The appropriate information can vary depending
              on the event. Tell us what you are planning first.
            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {occasions.map((occasion) => (
              <article
                key={occasion.no}
                className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-7 transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <span className="text-xs font-semibold tracking-[3px] text-[#a2742e]">
                    {occasion.no}
                  </span>

                  <span className="text-xs text-[#a99683]">
                    {occasion.hindi}
                  </span>

                </div>

                <h3 className="mt-8 font-serif text-2xl text-[#57120d]">
                  {occasion.title}
                </h3>

                <p className="mt-3 leading-7 text-[#74645b]">
                  {occasion.text}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* NAMKARAN */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="overflow-hidden rounded-3xl bg-[#300604] text-white">

          <div className="grid md:grid-cols-[1fr_1.2fr]">

            <div className="relative flex min-h-[24rem] items-center overflow-hidden p-8 md:p-12">

              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#d7ad63]/30" />
              <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full border border-[#d7ad63]/20" />

              <div className="relative">

                <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                  नामकरण · NAMKARAN
                </p>

                <h2 className="mt-5 font-serif text-4xl leading-tight text-[#f3dca8] md:text-5xl">
                  A meaningful
                  <br />
                  <em>beginning.</em>
                </h2>

              </div>

            </div>

            <div className="bg-[#3b0a07] p-8 md:p-12">

              <p className="leading-8 text-[#d4c3b5]">
                Namkaran is the traditional naming ceremony
                associated with a newborn. A Namkaran
                consultation can help families consider
                traditional naming practices and suitable
                options according to the information available.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-[#d7ad63]/20 p-5">

                  <p className="text-[10px] tracking-[3px] text-[#d7ad63]">
                    MAY BE RELEVANT
                  </p>

                  <p className="mt-3 font-serif text-xl text-[#f3dca8]">
                    Birth details
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                    Information about the newborn may be
                    relevant to the traditional consultation.
                  </p>

                </div>

                <div className="rounded-2xl border border-[#d7ad63]/20 p-5">

                  <p className="text-[10px] tracking-[3px] text-[#d7ad63]">
                    YOUR PREFERENCE
                  </p>

                  <p className="mt-3 font-serif text-xl text-[#f3dca8]">
                    Naming needs
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                    Tell us what kind of traditional naming
                    guidance your family is looking for.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHAT TO PROVIDE */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                BEFORE YOU REQUEST
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
                What should
                <br />
                <em>you tell us?</em>
              </h2>

              <p className="mt-6 leading-8 text-[#74645b]">
                Muhurat consultations are event-specific, so
                the useful information depends on what you
                are planning.
              </p>

            </div>

            <div className="space-y-4">

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  01 · EVENT
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  What are you planning?
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#74645b]">
                  For example, marriage, Griha Pravesh,
                  business opening, property purchase or
                  another important beginning.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  02 · DATE
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  When are you planning it?
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#74645b]">
                  Share your preferred date or a date range if
                  you already have one in mind.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  03 · LOCATION
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  Where will it happen?
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#74645b]">
                  The location of the event can be relevant
                  when considering traditional timing.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-6">

                <p className="text-xs font-bold tracking-[3px] text-[#a2742e]">
                  04 · OTHER DETAILS
                </p>

                <h3 className="mt-3 font-serif text-2xl text-[#57120d]">
                  Tell us anything important.
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#74645b]">
                  Mention constraints, preferred dates or
                  anything else that may affect your planning.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PROCESS */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
          CONSULTATION PROCESS
        </p>

        <h2 className="mt-4 max-w-2xl font-serif text-4xl text-[#57120d] md:text-5xl">
          From your occasion
          <br />
          <em>to a suitable time.</em>
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3">

          {process.map((item) => (
            <div key={item.no}>

              <span className="font-serif text-5xl text-[#c9aa75]">
                {item.no}
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                {item.text}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* KUNDALI LINK */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            NEED BIRTH-CHART GUIDANCE?
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
            Looking for a
            <br />
            <em>Janam Kundali consultation?</em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
            If your main concern is understanding your own
            birth chart rather than selecting an event time,
            explore our dedicated Janam Kundali service.
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
                Muhurat & Namkaran
                <br />
                <em>consultation in Muzaffarnagar.</em>
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
            शुभ आरंभ
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Planning something
            <br />
            <em>important?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Tell us about the occasion, your preferred dates
            and where it will take place.
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