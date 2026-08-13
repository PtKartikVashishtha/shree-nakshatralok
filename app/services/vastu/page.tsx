import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vastu Consultation in Muzaffarnagar",
  description:
    "Traditional Vastu consultation in Muzaffarnagar for homes, offices, shops and properties, with guidance based on layout, direction and the purpose of the space.",
  keywords: [
    "Vastu",
    "Vastu Consultation",
    "Vastu Consultant Muzaffarnagar",
    "Vastu Shastra Muzaffarnagar",
    "Home Vastu",
    "Office Vastu",
    "Shop Vastu",
    "Vastu Shastra",
    "वास्तु",
    "वास्तु शास्त्र",
    "वास्तु परामर्श",
  ],
};

const spaces = [
  {
    no: "01",
    title: "Home",
    hindi: "घर",
    text: "Traditional Vastu guidance for houses, apartments and residential spaces.",
  },
  {
    no: "02",
    title: "Office & Workplace",
    hindi: "कार्यालय",
    text: "Considerations for offices and workspaces based on their layout and intended use.",
  },
  {
    no: "03",
    title: "Shop & Business",
    hindi: "दुकान एवं व्यवसाय",
    text: "Traditional guidance for shops, commercial spaces and business premises.",
  },
  {
    no: "04",
    title: "New Property",
    hindi: "नई संपत्ति",
    text: "Vastu consultation when planning, purchasing or moving into a new property.",
  },
];

const concerns = [
  "Planning a new home or property",
  "Moving into a new house or office",
  "Renovating an existing space",
  "Understanding the layout of a property",
  "Planning a shop or business premises",
  "Discussing a specific Vastu concern",
];

export default function VastuPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-24 -top-32 h-[30rem] w-[30rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute -right-8 top-0 h-72 w-72 rounded-full border border-[#d7ad63]" />
          <div className="absolute bottom-[-16rem] left-[-10rem] h-[32rem] w-[32rem] rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            वास्तु · VASTU SHASTRA
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-[#f5dfad] md:text-7xl">
            Your space.
            <br />
            Its <em>traditional Vastu.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            Traditional Vastu consultation for homes, offices,
            shops and properties, with attention to layout,
            directions and the purpose of the space.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              Request Vastu Consultation
              <span className="ml-3">→</span>
            </a>

            <a
              href="#what-you-need"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              What You Need
            </a>

          </div>

        </div>
      </section>

      {/* WHAT IS VASTU */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.75fr_1.25fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              वास्तु शास्त्र · UNDERSTAND
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              What is
              <br />
              <em>Vastu?</em>
            </h2>

          </div>

          <div className="space-y-6 text-[16px] leading-8 text-[#685851]">

            <p>
              Vastu Shastra is a traditional Indian system
              concerned with the relationship between a built
              space, its layout, directions and its intended use.
            </p>

            <p>
              A Vastu consultation looks at the characteristics
              of a particular property rather than treating every
              home or workplace in the same way.
            </p>

            <p>
              Depending on the consultation, factors such as
              orientation, rooms, entrances and the overall
              layout may be discussed.
            </p>

            <p className="text-[#57120d]">
              वास्तु शास्त्र में स्थान, दिशा, संरचना और
              उपयोग जैसे पारंपरिक विचारों के आधार पर
              भवन या स्थान का अध्ययन किया जाता है।
            </p>

          </div>

        </div>

      </section>

      {/* TYPES OF PROPERTY */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
                VASTU CONSULTATION
              </p>

              <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
                What kind of space
                <br />
                <em>are you considering?</em>
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-[#78665c]">
              Tell us what type of property you are dealing
              with. The relevant information can vary by space.
            </p>

          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">

            {spaces.map((space) => (
              <article
                key={space.no}
                className="rounded-2xl border border-[#d5c5ae] bg-[#f7f0e5] p-8 transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <span className="text-xs font-semibold tracking-[3px] text-[#a2742e]">
                    {space.no}
                  </span>

                  <span className="text-xs text-[#a99683]">
                    {space.hindi}
                  </span>

                </div>

                <h3 className="mt-8 font-serif text-2xl text-[#57120d]">
                  {space.title}
                </h3>

                <p className="mt-3 leading-7 text-[#74645b]">
                  {space.text}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* WHEN TO CONSIDER */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              IS THIS FOR YOU?
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              When might a Vastu
              <br />
              <em>consultation help?</em>
            </h2>

            <p className="mt-6 leading-8 text-[#74645b]">
              You don't need to wait until construction is
              complete. Vastu questions can arise while
              planning, purchasing, renovating or using a space.
            </p>

          </div>

          <div className="grid gap-3 sm:grid-cols-2">

            {concerns.map((concern, index) => (
              <div
                key={concern}
                className="flex gap-4 rounded-2xl border border-[#d5c5ae] bg-[#eee5d6] p-5"
              >

                <span className="font-serif text-xl text-[#c19a5b]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-6 text-[#685851]">
                  {concern}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* WHAT YOU NEED */}

      <section
        id="what-you-need"
        className="border-y border-[#d9cbb8] bg-[#300604] text-white"
      >

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
                PROPERTY DETAILS
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f3dca8] md:text-5xl">
                The property
                <br />
                <em>is the starting point.</em>
              </h2>

              <p className="mt-6 leading-8 text-[#d4c3b5]">
                Unlike a Janam Kundali consultation, Vastu
                consultation is primarily concerned with the
                physical space.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-6">

                <span className="text-xs tracking-[3px] text-[#d7ad63]">
                  01
                </span>

                <h3 className="mt-4 font-serif text-2xl text-[#f3dca8]">
                  Property Type
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                  Home, apartment, office, shop or another type
                  of space.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-6">

                <span className="text-xs tracking-[3px] text-[#d7ad63]">
                  02
                </span>

                <h3 className="mt-4 font-serif text-2xl text-[#f3dca8]">
                  Location
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                  Where the property is located.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-6">

                <span className="text-xs tracking-[3px] text-[#d7ad63]">
                  03
                </span>

                <h3 className="mt-4 font-serif text-2xl text-[#f3dca8]">
                  Layout
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                  Floor plan, room arrangement or other useful
                  layout information.
                </p>

              </div>

              <div className="rounded-2xl border border-[#d7ad63]/20 bg-[#3b0a07] p-6">

                <span className="text-xs tracking-[3px] text-[#d7ad63]">
                  04
                </span>

                <h3 className="mt-4 font-serif text-2xl text-[#f3dca8]">
                  Your Concern
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#cdbbb0]">
                  Tell us what you want the consultation to
                  focus on.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FLOOR PLAN */}

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-24">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              YOUR LAYOUT
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              Have a floor plan?
              <br />
              <em>Keep it ready.</em>
            </h2>

          </div>

          <div className="space-y-5 text-[#74645b]">

            <p className="leading-8">
              A floor plan or clear layout can be useful during
              a Vastu consultation because it gives the
              astrologer a better understanding of the space.
            </p>

            <p className="leading-8">
              If you have one, keep a clear copy available when
              making your consultation request.
            </p>

            <div className="rounded-2xl border border-[#d5c5ae] bg-[#eee5d6] p-6">

              <p className="font-semibold text-[#57120d]">
                Don't have a floor plan?
              </p>

              <p className="mt-2 text-sm leading-7">
                That's okay. Tell us what information you do
                have and what you would like to discuss.
              </p>

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
            From your property
            <br />
            <em>to a Vastu consultation.</em>
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">

            <div>

              <span className="font-serif text-5xl text-[#c9aa75]">
                01
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Share the space
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                Tell us what kind of property you have and
                provide the relevant layout information.
              </p>

            </div>

            <div>

              <span className="font-serif text-5xl text-[#c9aa75]">
                02
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Explain your concern
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                Explain what you are planning or what aspect
                of the property you want to discuss.
              </p>

            </div>

            <div>

              <span className="font-serif text-5xl text-[#c9aa75]">
                03
              </span>

              <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
                Discuss the property
              </h3>

              <p className="mt-3 leading-7 text-[#74645b]">
                The consultation considers the space through
                traditional Vastu principles.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* KUNDALI CROSS LINK */}

      <section className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">

        <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
          LOOKING FOR PERSONAL GUIDANCE?
        </p>

        <h2 className="mt-4 font-serif text-3xl text-[#57120d] md:text-4xl">
          Need a birth-chart
          <br />
          <em>consultation instead?</em>
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-[#74645b]">
          If your question is about your personal life,
          career, marriage or another birth-chart matter,
          explore our Janam Kundali service.
        </p>

        <Link
          href="/services/janam-kundali"
          className="mt-7 inline-flex items-center rounded-full border border-[#8b2418] px-7 py-3.5 font-semibold text-[#8b2418] transition hover:bg-[#8b2418] hover:text-white"
        >
          Explore Janam Kundali
          <span className="ml-3">→</span>
        </Link>

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
                Vastu consultation
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
            वास्तु परामर्श
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            Have a space you want
            <br />
            <em>to understand?</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            Tell us about your property and what you would
            like to discuss.
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            Request Vastu Consultation
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}