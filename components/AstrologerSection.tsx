"use client";

import { useState } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/astrologer/radhey-shyam-01.jpg",
    alt: "Radhey Shyam Sharma",
  },
  {
    src: "/astrologer/radhey-shyam-02.jpg",
    alt: "Radhey Shyam Sharma during a public consultation",
  },
  {
    src: "/astrologer/radhey-shyam-03.jpg",
    alt: "Radhey Shyam Sharma addressing a gathering",
  },
  {
    src: "/astrologer/radhey-shyam-04.jpg",
    alt: "Radhey Shyam Sharma in a traditional spiritual setting",
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
            ज्योतिषाचार्य परिचय · THE ASTROLOGER
          </p>

          <div className="astrologer-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <h2>
            पंडित राधे श्याम शर्मा
          </h2>

          <p>
            Pt. Radhey Shyam Sharma · 55+ Years Experience
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
              आचार्य परिचय · ABOUT THE ASTROLOGER
            </p>

            <h3>
              ५५+ वर्षों की साधना,
              <br />
              <em>शास्त्रसम्मत व्यक्तिगत मार्गदर्शन।</em>
            </h3>

            {/* HINDI */}

            <div className="bio-language">

              <p className="language-label">
                वैदिक परिचय
              </p>

              <p>
                पंडित राधे श्याम शर्मा जी को वैदिक ज्योतिष एवं अध्यात्म के क्षेत्र में ५५ से अधिक वर्षों का गहन अनुभव प्राप्त है। महर्षि पाराशर एवं प्राचीन ऋषियों द्वारा प्रतिपादित सिद्धांतों के आधार पर जन्म कुंडली, ग्रह-दशाओं एवं गोचरों का सूक्ष्म अध्ययन कर वे जीवन के महत्वपूर्ण निर्णयों में सटीक दिशा-निर्देश प्रदान करते हैं।
              </p>

              <p>
                विवाह कुंडली मिलान, मांगलिक विचार, करियर, व्यापार, शिक्षा, पारिवारिक सुख-शांति तथा स्वास्थ्य संबंधी विषयों पर उनका मार्गदर्शन अत्यंत विश्वसनीय माना जाता है। यहाँ प्रत्येक जातक की समस्या को पूर्ण आत्मीयता एवं गोपनीयता के साथ सुना जाता है।
              </p>

            </div>

            {/* ENGLISH BRIEF */}

            <div className="bio-language">

              <p className="language-label">
                OVERVIEW
              </p>

              <p>
                Pt. Radhey Shyam Sharma brings over 55 years of traditional Vedic astrology expertise, offering authentic guidance for Janam Kundali, marriage matching, career, and life dilemmas to thousands of seekers across India and worldwide.
              </p>

            </div>

            {/* =================================================
                HIGHLIGHTS
            ================================================= */}

            <div className="astrologer-highlights">

              <div>
                <strong>५५+ वर्ष</strong>
                <span>दीर्घ अनुभव</span>
              </div>

              <div>
                <strong>वैदिक</strong>
                <span>ऋषि परंपरा</span>
              </div>

              <div>
                <strong>विवाह</strong>
                <span>गुण मिलान</span>
              </div>

              <div>
                <strong>१२+</strong>
                <span>प्रमुख सेवाएं</span>
              </div>

            </div>

            {/* =================================================
                LOCATION + CTA
            ================================================= */}

            <div className="astrologer-footer">

              <div>

                <p>
                  कार्यालय एवं परामर्श केंद्र
                </p>

                <strong>
                  शांति नगर, मुजफ्फरनगर (उत्तर प्रदेश)
                </strong>

              </div>

              <a href="#contact">
                परामर्श हेतु संपर्क करें
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