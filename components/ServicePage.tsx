import Link from "next/link";

type ServicePageProps = {
  hindi: string;
  title: string;
  description: string;
  introTitle: React.ReactNode;
  introText: string[];
  areas: {
    title: string;
    text: string;
  }[];
};

export default function ServicePage({
  hindi,
  title,
  description,
  introTitle,
  introText,
  areas,
}: ServicePageProps) {
  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#300604] text-white">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border border-[#d7ad63]" />

          <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border border-[#d7ad63]" />

          <div className="absolute left-10 bottom-[-100px] h-80 w-80 rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">

          <p className="text-xs font-semibold uppercase tracking-[4px] text-[#d7ad63]">
            {hindi}
          </p>

          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-tight text-[#f5dfad] md:text-7xl">
            {title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d8c8b8]">
            {description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#d2a75c] px-7 py-3.5 font-semibold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              परामर्श हेतु अनुरोध करें
              <span className="ml-3">→</span>
            </a>

            <Link
              href="/#services"
              className="inline-flex items-center justify-center rounded-full border border-[#d7ad63]/50 px-7 py-3.5 font-semibold text-[#ead9b3] transition hover:bg-white/10"
            >
              सभी सेवाएं देखें
            </Link>

          </div>

        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              विषय परिचय · OVERVIEW
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#57120d] md:text-5xl">
              {introTitle}
            </h2>

          </div>

          <div className="space-y-5 text-[16px] leading-8 text-[#685851]">

            {introText.map((text, index) => (
              <p key={index}>
                {text}
              </p>
            ))}

          </div>

        </div>

      </section>

      {/* AREAS */}

      <section className="border-y border-[#d9cbb8] bg-[#eee5d6]">

        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">

          <div className="max-w-2xl">

            <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
              परामर्श के मुख्य बिंदु · AREAS OF GUIDANCE
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
              इस परामर्श के मुख्य
              <br />
              <em>विषय एवं लाभ।</em>
            </h2>

          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#d4c4ad] bg-[#d4c4ad] md:grid-cols-2">

            {areas.map((area, index) => (
              <div
                key={area.title}
                className="bg-[#f7f0e5] p-8"
              >

                <span className="text-xs tracking-[3px] text-[#a2742e]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 font-serif text-2xl text-[#57120d]">
                  {area.title}
                </h3>

                <p className="mt-3 leading-7 text-[#74645b]">
                  {area.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* LOCATION */}

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">

        <div className="rounded-3xl bg-[#300604] p-8 text-white md:p-12">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#d7ad63]">
            मुजफ्फरनगर · उत्तर प्रदेश · MUZAFFARNAGAR
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#f3dca8] md:text-4xl">
            कार्यालय में प्रत्यक्ष अथवा
            <br />
            <em>घर बैठे ऑनलाइन परामर्श।</em>
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-[#d4c3b5]">
            शांति नगर, मुजफ्फरनगर (उत्तर प्रदेश) स्थित संस्थान में व्यक्तिगत भेंट द्वारा अथवा देश-विदेश में फोन व व्हाट्सएप के माध्यम से ऑनलाइन परामर्श उपलब्ध है।
          </p>

          <div className="mt-8 flex flex-col gap-3 text-sm text-[#ead9b3] sm:flex-row sm:gap-8">
            <span>कार्यालय · शांति नगर</span>
            <span>पिन कोड · 251002</span>
            <span>ऑनलाइन · संपूर्ण भारत एवं विदेश</span>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="border-t border-[#d9cbb8] bg-[#f0e6d7]">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            परामर्श प्रारंभ करें · CONSULTATION
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#57120d] md:text-5xl">
            क्या आपके मन में कोई शंका है?
            <br />
            <em>आज ही परामर्श प्राप्त करें।</em>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#74645b]">
            अपनी जन्म तिथि, समय और मुख्य प्रश्न साझा करें। पंडित जी द्वारा आपकी जन्म पत्रिका का सूक्ष्म विश्लेषण किया जाएगा।
          </p>

          <a
            href="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f]"
          >
            परामर्श हेतु अनुरोध भेजें
            <span className="ml-3">→</span>
          </a>

        </div>

      </section>

    </main>
  );
}