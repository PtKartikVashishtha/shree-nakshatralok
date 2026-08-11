"use client";

import { useState } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/astrologer/radhey-shyam-01.jpg",
    alt: "Shri Radhey Shyam Sharma Ji",
  },
  {
    src: "/astrologer/radhey-shyam-02.jpg",
    alt: "Shri Radhey Shyam Sharma Ji during a public consultation",
  },
  {
    src: "/astrologer/radhey-shyam-03.jpg",
    alt: "Shri Radhey Shyam Sharma Ji addressing a gathering",
  },
  {
    src: "/astrologer/radhey-shyam-04.jpg",
    alt: "Shri Radhey Shyam Sharma Ji in a traditional spiritual setting",
  },
];

export default function AstrologerSection() {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const next = () => {
    setActive((current) =>
      current === photos.length - 1
        ? 0
        : current + 1
    );
  };

  const previous = () => {
    setActive((current) =>
      current === 0
        ? photos.length - 1
        : current - 1
    );
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (touchStart === null) {
      return;
    }

    const touchEnd = event.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        next();
      } else {
        previous();
      }
    }

    setTouchStart(null);
  };

  return (
    <section
      id="astrologer"
      className="astrologer-section"
    >
      <div className="astrologer-decoration">
        <div />
        <div />
        <div />
      </div>

      <div className="astrologer-inner">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="astrologer-heading">

          <p className="astrologer-label">
            THE ASTROLOGER
          </p>

          <div className="astrologer-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <h2>
            Shri Radhey Shyam Sharma Ji
          </h2>

          <p>
            श्री राधे श्याम शर्मा जी
          </p>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="astrologer-content">

          {/* =================================================
              GALLERY
          ================================================= */}

          <div className="astrologer-gallery">

            <div
              className="astrologer-photo-frame"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >

              <div className="astrologer-photo">

                {photos.map((photo, index) => (
                  <div
                    key={photo.src}
                    className={`astrologer-slide ${
                      index === active
                        ? "active"
                        : ""
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 900px) 92vw, 520px"
                      className="astrologer-image"
                    />
                  </div>
                ))}

                <div className="astrologer-photo-gradient" />

                <div className="photo-counter">
                  {String(active + 1).padStart(2, "0")}
                  {" / "}
                  {String(photos.length).padStart(2, "0")}
                </div>

                <div className="photo-controls">

                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous photograph"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next photograph"
                  >
                    →
                  </button>

                </div>

              </div>

            </div>

            <div className="photo-dots">

              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View photograph ${index + 1}`}
                  className={
                    index === active
                      ? "active"
                      : ""
                  }
                />
              ))}

            </div>

            <p className="swipe-hint">
              ← Swipe to explore →
            </p>

          </div>

          {/* =================================================
              BIOGRAPHY
          ================================================= */}

          <div className="astrologer-bio">

            <p className="bio-label">
              परिचय · INTRODUCTION
            </p>

            <h3>
              दशकों का अनुभव,
              <br />
              <em>एक व्यक्तिगत दृष्टिकोण।</em>
            </h3>

            {/* HINDI */}

            <div className="bio-language">

              <p className="language-label">
                हिंदी
              </p>

              <p>
                श्री राधे श्याम शर्मा जी को ज्योतिष के
                क्षेत्र में 55 से अधिक वर्षों का अनुभव है।
                जन्म कुंडली, ग्रहों के प्रभाव और जीवन के
                महत्वपूर्ण निर्णयों के संबंध में वे
                पारंपरिक वैदिक ज्योतिष के आधार पर
                परामर्श प्रदान करते हैं।
              </p>

              <p>
                विवाह मिलान एवं कुंडली मिलान उनके प्रमुख
                परामर्श क्षेत्रों में से हैं। जीवन, विवाह,
                करियर, शिक्षा, परिवार, व्यवसाय तथा अन्य
                महत्वपूर्ण विषयों से जुड़े प्रश्नों पर
                व्यक्तिगत मार्गदर्शन प्रदान किया जाता है।
              </p>

            </div>

            {/* ENGLISH */}

            <div className="bio-language">

              <p className="language-label">
                ENGLISH
              </p>

              <p>
                Shri Radhey Shyam Sharma Ji brings over
                55 years of experience in the field of
                astrology. His consultations draw upon
                traditional principles of Vedic astrology
                to study birth charts, planetary
                influences and important phases of life.
              </p>

              <p>
                He has particular experience in Kundali
                Milan and Vivah Matching, along with
                guidance relating to career, education,
                family, business and other important
                life decisions.
              </p>

            </div>

            {/* =================================================
                HIGHLIGHTS
            ================================================= */}

            <div className="astrologer-highlights">

              <div>
                <strong>55+</strong>
                <span>Years</span>
              </div>

              <div>
                <strong>Vedic</strong>
                <span>Jyotish</span>
              </div>

              <div>
                <strong>Vivah</strong>
                <span>Matching</span>
              </div>

              <div>
                <strong>12+</strong>
                <span>Services</span>
              </div>

            </div>

            {/* =================================================
                LOCATION + CTA
            ================================================= */}

            <div className="astrologer-footer">

              <div>

                <p>
                  BASED IN
                </p>

                <strong>
                  Muzaffarnagar, Uttar Pradesh
                </strong>

              </div>

              <a href="#contact">
                Book a Consultation
                <span>→</span>
              </a>

            </div>

          </div>

        </div>

        {/* =================================================
            QUOTE
        ================================================= */}

        <div className="astrologer-quote">

          <div>✦</div>

          <p>
            "ज्योतिष केवल भविष्य बताने का माध्यम नहीं,
            बल्कि जीवन को समझने का एक मार्ग है।"
          </p>

          <span>
            — SHREE NAKSHATRALOK
          </span>

        </div>

      </div>
    </section>
  );
}