import type { Metadata } from "next";
import Link from "next/link";
import KundaliMilanForm from "@/components/KundaliMilanForm";
export const metadata: Metadata = {
  title: "Kundali Milan & Vivah Matching in Muzaffarnagar",
  description:
    "Kundali Milan (कुंडली मिलान) and Vivah Matching (विवाह मिलान) consultation based on traditional Vedic Astrology. Personalized marriage compatibility guidance in Muzaffarnagar and online.",

  keywords: [
    "Kundali Milan",
    "कुंडली मिलान",
    "Vivah Matching",
    "विवाह मिलान",
    "Kundali Matching",
    "कुंडली मिलान Muzaffarnagar",
    "Kundali Milan Muzaffarnagar",
    "Vivah Matching Muzaffarnagar",
    "Marriage Astrology",
    "Vedic Astrology",
    "वैदिक ज्योतिष",
    "Guna Milan",
    "गुण मिलान",
    "Ashtakoota",
    "अष्टकूट",
  ],

  alternates: {
    canonical: "/services/kundali-milan",
  },

  openGraph: {
    title: "Kundali Milan & Vivah Matching in Muzaffarnagar",
    description:
      "Traditional Kundali Milan and Vivah Matching consultation for understanding marital compatibility through birth charts.",
    url: "/services/kundali-milan",
    type: "website",
  },
};

export default function KundaliMilanPage() {
  return (
    <main className="service-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="service-hero">
        <div className="service-hero-inner">

          <p className="section-label">
            KUNDALI MILAN · कुंडली मिलान · MUZAFFARNAGAR
          </p>

          <h1>
            Kundali Milan &
            <em> Vivah Matching</em>
          </h1>

          <p className="service-hero-intro">
            Traditional Vedic Astrology guidance for
            Kundali Milan (कुंडली मिलान), Vivah Matching
            (विवाह मिलान) and understanding marital
            compatibility through birth charts.
          </p>

          <div className="service-hero-actions">

            <Link
              href="/#contact"
              className="gold-button"
            >
              Book a Consultation
              <span>→</span>
            </Link>

            <Link
              href="/"
              className="outline-button"
            >
              Back to Home
            </Link>

          </div>

        </div>
      </section>


      {/* =================================================
          INTRODUCTION
      ================================================= */}

      <section className="service-content-section">

        <div className="service-content-grid">

          <div>

            <p className="section-label">
              ABOUT KUNDALI MILAN · कुंडली मिलान
            </p>

            <h2>
              Understanding
              <em> marital compatibility.</em>
            </h2>

          </div>


          <div className="service-copy">

            <p>
              Kundali Milan (कुंडली मिलान), also known as
              Vivah Matching (विवाह मिलान), is a traditional
              practice in Vedic Astrology used to study the
              compatibility of two birth charts before
              marriage.
            </p>

            <p>
              The Janam Kundali (जन्म कुंडली) of both
              individuals is considered together to understand
              different aspects of traditional marital
              compatibility and planetary influences.
            </p>

            <p>
              At Shree Nakshatralok Jyotish Sansthan, the
              consultation is approached individually, with
              attention to the complete birth charts rather
              than relying only on a single Guna Milan
              (गुण मिलान) score.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          ASHTAKOOTA
      ================================================= */}

      <section className="matching-section">

        <div className="matching-inner">

          <div className="matching-heading">

            <p className="section-label gold">
              ASHTAKOOTA · अष्टकूट · 36 GUNA
            </p>

            <h2>
              The traditional
              <em> eight Kootas.</em>
            </h2>

            <p>
              Traditional Kundali Milan commonly considers
              eight Kootas (अष्टकूट), together contributing
              to a maximum of 36 Guna (गुण).
            </p>

          </div>


          <div className="matching-grid">

            <div>
              <span>01</span>

              <h3>
                Varna · वर्ण
              </h3>

              <p>
                Traditionally associated with spiritual
                and personal compatibility.
              </p>
            </div>


            <div>
              <span>02</span>

              <h3>
                Vashya · वश्य
              </h3>

              <p>
                Traditionally considered in relation to
                mutual influence and compatibility.
              </p>
            </div>


            <div>
              <span>03</span>

              <h3>
                Tara · तारा
              </h3>

              <p>
                Associated with the traditional
                relationship between the birth stars.
              </p>
            </div>


            <div>
              <span>04</span>

              <h3>
                Yoni · योनि
              </h3>

              <p>
                Traditionally considered in relation to
                temperament and compatibility.
              </p>
            </div>


            <div>
              <span>05</span>

              <h3>
                Graha Maitri · ग्रह मैत्री
              </h3>

              <p>
                Considers the traditional relationship
                between the ruling planets.
              </p>
            </div>


            <div>
              <span>06</span>

              <h3>
                Gana · गण
              </h3>

              <p>
                Traditionally associated with personality
                and temperament.
              </p>
            </div>


            <div>
              <span>07</span>

              <h3>
                Bhakoot · भकूट
              </h3>

              <p>
                Traditionally considered in relation to
                Moon signs and marital compatibility.
              </p>
            </div>


            <div>
              <span>08</span>

              <h3>
                Nadi · नाड़ी
              </h3>

              <p>
                Traditionally considered as an important
                aspect of Kundali Milan.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PERSONALIZED APPROACH
      ================================================= */}

      <section className="service-note-section">

        <div className="service-note">

          <p className="section-label">
            A PERSONALIZED APPROACH · व्यक्तिगत परामर्श
          </p>

          <h2>
            Kundali Milan is
            <em> more than a number.</em>
          </h2>

          <p>
            The traditional Guna Milan score is one part of
            the matching process. A detailed consultation
            may consider the individual Janam Kundalis,
            planetary influences and relevant aspects of
            the birth charts rather than depending on the
            score alone.
          </p>

        </div>

      </section>


      {/* =================================================
          WHAT IS CONSIDERED
      ================================================= */}

      <section className="service-content-section">

        <div className="service-content-grid">

          <div>

            <p className="section-label">
              VIVAH MATCHING · विवाह मिलान
            </p>

            <h2>
              A broader look at
              <em> compatibility.</em>
            </h2>

          </div>


          <div className="service-copy">

            <p>
              Traditional Vivah Matching (विवाह मिलान)
              considers more than simply counting the
              Gunas (गुण). The birth details and charts of
              both individuals are studied together as part
              of the consultation.
            </p>

            <p>
              Kundali Milan may be discussed in relation
              to temperament, traditional compatibility
              factors and planetary influences associated
              with married life.
            </p>

            <p>
              The purpose of the consultation is to provide
              an individual interpretation based on the
              available birth details and traditional
              Vedic Astrology principles.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          CONSULTATION
      ================================================= */}

      <section className="service-location-section">

        <div className="service-location-inner">

          <div>

            <p className="section-label gold">
              KUNDALI MILAN CONSULTATION
            </p>

            <h2>
              Available in
              <em> Muzaffarnagar</em>
              <br />
              and online.
            </h2>

          </div>


          <div className="service-location-copy">

            <p>
              Consult Shri Radhey Shyam Sharma Ji for
              Kundali Milan (कुंडली मिलान) and Vivah
              Matching (विवाह मिलान) at Shree Nakshatralok
              Jyotish Sansthan in Shanti Nagar,
              Muzaffarnagar, Uttar Pradesh.
            </p>

            <p>
              Online consultations are also available
              for clients across India and worldwide.
            </p>

            <Link
              href="/#contact"
              className="text-link"
            >
              Request a Consultation
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>
        <section className="service-content-section">
            <div className="mx-auto max-w-6xl px-5">
                <div className="mb-12 text-center">
                <p className="section-label">
                    REQUEST KUNDALI MILAN · कुंडली मिलान
                </p>

                <h2>
                    Share both
                    <em> birth details.</em>
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-[#806d66]">
                    Enter the birth details of both individuals
                    for a personalized Kundali Milan and Vivah
                    Matching consultation.
                </p>
                </div>

                <KundaliMilanForm />
            </div>
        </section>

      {/* =================================================
          RELATED SERVICES
      ================================================= */}

      <section className="related-services">

        <div>

          <p className="section-label">
            EXPLORE MORE · अन्य सेवाएं
          </p>

          <h2>
            Other
            <em> consultations.</em>
          </h2>

        </div>


        <div className="related-links">

          <Link href="/">
            Vedic Astrology · वैदिक ज्योतिष
            <span>→</span>
          </Link>

          <Link href="/#services">
            All Services · सभी सेवाएं
            <span>→</span>
          </Link>

          <Link href="/#contact">
            Book Consultation · परामर्श बुक करें
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>
  );
}