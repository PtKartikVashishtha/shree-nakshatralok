"use client";

import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import AstrologerSection from "@/components/AstrologerSection";
import LocalSeoSection from "@/components/LocalSeoSection";
import TalkToAstrologerSection from "@/components/TalkToAstrologerSection";
import { site } from "@/lib/site";
import {
  Cinzel,
  Cormorant_Garamond,
  Inter,
} from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const services = [
  {
    no: "01",
    icon: "☉",
    title: "वैदिक ज्योतिष",
    hindi: "Vedic Astrology",
    text: "ऋषि परंपरा के शाश्वत सिद्धांतों पर आधारित व्यक्तिगत मार्गदर्शन।",
  },
  {
    no: "02",
    icon: "◉",
    title: "जन्म कुंडली",
    hindi: "Birth Chart",
    text: "सटीक जन्म पत्रिका निर्माण, ग्रह गोचर एवं विस्तृत फलादेश।",
  },
  {
    no: "03",
    icon: "☾",
    title: "विवाह मिलान",
    hindi: "Kundali Milan",
    text: "अष्टकूट गुण मिलान, मांगलिक विचार एवं दांपत्य सुख विश्लेषण।",
  },
  {
    no: "04",
    icon: "✦",
    title: "मुहूर्त एवं नामकरण",
    hindi: "Muhurat & Naming",
    text: "शुभ कार्य, गृह प्रवेश, व्यापार व नवजात शिशु नामकरण मुहूर्त।",
  },
  {
    no: "05",
    icon: "♄",
    title: "ग्रह दोष निवारण",
    hindi: "Graha Dosh Nivaran",
    text: "शनि साढ़ेसाती, कालसर्प दोष, मांगलिक दोष निवारण एवं वैदिक उपाय।",
  },
  {
    no: "06",
    icon: "⌂",
    title: "वास्तु परामर्श",
    hindi: "Vastu Shastra",
    text: "गृह, प्रतिष्ठान और कार्यस्थल में सुख-समृद्धि हेतु वास्तु विश्लेषण।",
  },
  {
    no: "07",
    icon: "◇",
    title: "रत्न परामर्श",
    hindi: "Gemstone Guidance",
    text: "लग्न व ग्रहों के अनुकूल शुद्ध, प्राण-प्रतिष्ठित रत्नों का परामर्श।",
  },
  {
    no: "08",
    icon: "♃",
    title: "करियर एवं शिक्षा",
    hindi: "Career & Education",
    text: "विद्यार्थियों व युवाओं के लिए उपयुक्त क्षेत्र, नौकरी व व्यापार चयन।",
  },
  {
    no: "09",
    icon: "♡",
    title: "पारिवारिक एवं वैवाहिक",
    hindi: "Family & Marriage",
    text: "पारिवारिक मतभेद, मानसिक अशांति एवं वैवाहिक जीवन में सामंजस्य।",
  },
  {
    no: "10",
    icon: "∞",
    title: "ऑनलाइन एवं ऑफलाइन",
    hindi: "Online & Offline",
    text: "मुजफ्फरनगर कार्यालय में प्रत्यक्ष अथवा फोन/व्हाट्सएप द्वारा परामर्श।",
  },
  {
    no: "11",
    icon: "✧",
    title: "टैरो कार्ड रीडिंग",
    hindi: "Tarot Card Reading",
    text: "तात्कालिक प्रश्नों और व्यक्तिगत उलझनों हेतु विशेष टैरो वाचन।",
  },
  {
    no: "12",
    icon: "☤",
    title: "चिकित्सा ज्योतिष",
    hindi: "Medical Astrology",
    text: "स्वास्थ्य एवं रोगों से संबंधित ग्रहों के प्रभाव का ज्योतिषीय व आयुर्वेदिक अध्ययन।",
  },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const whatsappUrl =
    `https://wa.me/${site.whatsapp}?text=` +
    encodeURIComponent(site.whatsappMessage);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <main
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} astro-page`}
    >
      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="astro-nav">
        <div className="nav-inner">

          {/* BRAND */}

          <a
            href="#top"
            className="brand"
            onClick={closeMobileMenu}
          >
            <span className="brand-symbol">✦</span>

            <span>
              <strong>श्री नक्षत्रलोक</strong>
              <small>JYOTISH SANSTHAN</small>
            </span>
          </a>

          {/* DESKTOP NAV */}

          <div className="nav-links">
            <a href="#astrologer">ज्योतिषाचार्य</a>
            <a href="#services">सेवाएं</a>
            <a href="#talk-to-astrologer">बात करें</a>
            <a href="/blog">ज्योतिष लेख</a>
            <a href="/panchang">दैनिक पंचांग</a>
            <a href="#about">संस्थान दर्शन</a>
            <a href="#contact">परामर्श</a>
          </div>

          {/* NAV ACTIONS */}

          <div className="nav-actions">

            {/* WHATSAPP */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              व्हाट्सएप परामर्श
              <span>↗</span>
            </a>

            {/* MOBILE MENU */}

            <button
              type="button"
              className="mobile-menu-button"
              aria-label={
                mobileOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              onClick={() =>
                setMobileOpen((current) => !current)
              }
            >
              <span>{mobileOpen ? "बंद करें" : "मेनू"}</span>

              <span
                className={`menu-icon ${
                  mobileOpen ? "menu-open" : ""
                }`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}

        <div
          className={`mobile-nav ${
            mobileOpen ? "mobile-nav-open" : ""
          }`}
        >
          <a
            href="#astrologer"
            onClick={closeMobileMenu}
          >
            ज्योतिषाचार्य परिचय
          </a>

          <a
            href="#services"
            onClick={closeMobileMenu}
          >
            हमारी सेवाएं
          </a>

          <a
            href="#talk-to-astrologer"
            onClick={closeMobileMenu}
          >
            ज्योतिषाचार्य से बात करें
          </a>

          <a
            href="/blog"
            onClick={closeMobileMenu}
          >
            ज्योतिष एवं आयुर्वेद लेख
          </a>

          <a
            href="/panchang"
            onClick={closeMobileMenu}
          >
            दैनिक पंचांग
          </a>

          <a
            href="#about"
            onClick={closeMobileMenu}
          >
            संस्थान का दर्शन
          </a>

          <a
            href="#contact"
            onClick={closeMobileMenu}
          >
            परामर्श हेतु संपर्क
          </a>
        </div>
      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section id="top" className="hero">

        <div className="hero-stars">
          <span>✦</span>
          <span>·</span>
          <span>✧</span>
          <span>·</span>
          <span>✦</span>
          <span>·</span>
          <span>✧</span>
          <span>·</span>
          <span>✦</span>
          <span>·</span>
        </div>

        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-orbit orbit-three" />

        <div className="hero-mandala">
          <div className="mandala-ring ring-a" />
          <div className="mandala-ring ring-b" />
          <div className="mandala-ring ring-c" />

          <div className="mandala-center">
            ॐ
          </div>
        </div>

        <div className="hero-content">

          <div className="eyebrow">
            <span />
            ॥ श्री गणेशाय नमः ॥
            <span />
          </div>

          <p className="hero-kicker">
            श्री नक्षत्रलोक ज्योतिष संस्थान
          </p>

          <h1 className="hero-name">
            पंडित राधे श्याम शर्मा
          </h1>

          <p className="hero-name-hindi">
            Pt. Radhey Shyam Sharma · Muzaffarnagar
          </p>

          <div className="hero-experience">
            <span>५५+ वर्षों का अनुभव</span>

            <i />

            <span>प्राचीन वैदिक ज्योतिष</span>
          </div>

          <p className="hero-short-intro">
            जीवन के महत्वपूर्ण प्रश्नों, जन्म कुंडली विश्लेषण और कठिन निर्णयों हेतु शास्त्रसम्मत वैदिक मार्गदर्शन।
          </p>

          <div className="hero-actions">

            <a
              href="#contact"
              className="gold-button"
            >
              परामर्श हेतु अनुरोध करें
              <span>→</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="outline-button"
            >
              व्हाट्सएप पर बात करें
            </a>

          </div>

          <div className="hero-meta">

            <div>
              <strong>सत्य</strong>
              <span>शास्त्र सम्मत</span>
            </div>

            <i />

            <div>
              <strong>सेवा</strong>
              <span>समर्पण भाव</span>
            </div>

            <i />

            <div>
              <strong>विश्वास</strong>
              <span>अटूट आस्था</span>
            </div>

          </div>
        </div>

        <div className="hero-bottom">
          <span>विस्तार से जानें</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="intro-section">

        <div className="section-glow" />

        <div className="intro-grid">

          <div>
            <p className="section-label">
              आध्यात्मिक यात्रा · THE JOURNEY
            </p>

            <h2>
              प्राचीन ऋषि परंपरा।
              <br />
              <em>व्यक्तिगत मार्गदर्शन।</em>
            </h2>
          </div>

          <div className="intro-copy">

            <p>
              ज्योतिष केवल भविष्य जानने का माध्यम नहीं है। यह जीवन के विभिन्न चक्रों, ग्रहों के गोचर और मानवीय संभावनाओं को समझने की प्राचीन कालजयी विद्या है।
            </p>

            <p>
              श्री नक्षत्रलोक ज्योतिष संस्थान में प्रत्येक परामर्श एक आत्मीय संवाद है—जहाँ आपकी शंकाओं, परिस्थितियों और भविष्य के संकल्पों को धैर्यपूर्वक सुना जाता है।
            </p>

            <a
              href="#astrologer"
              className="text-link"
            >
              ज्योतिषाचार्य का परिचय देखें
              <span>↗</span>
            </a>

          </div>
        </div>
      </section>

      {/* =====================================================
          ASTROLOGER
      ===================================================== */}

      <AstrologerSection />

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="services-section"
      >

        <div className="services-heading">

          <div>

            <p className="section-label">
              हमारी प्रमुख सेवाएं · VEDIC SERVICES
            </p>

            <h2>
              जीवन के प्रत्येक पड़ाव के लिए
              <br />
              <em>प्रामाणिक समाधान।</em>
            </h2>

          </div>

          <p>
            जन्म कुंडली निर्माण, गुण मिलान, ग्रह शांति, वास्तु विचार, टैरो रीडिंग और चिकित्सा ज्योतिष तक—आपके जीवन से जुड़े प्रत्येक प्रश्न का शास्त्रसम्मत समाधान।
          </p>

        </div>

        <div className="services-grid">

          {services.map((service, index) => (
            <a
              key={service.no}
              href={
                {
                  "वैदिक ज्योतिष": "/services/vedic-astrology",
                  "जन्म कुंडली": "/services/janam-kundli",
                  "विवाह मिलान": "/services/kundali-milan",
                  "मुहूर्त एवं नामकरण": "/services/muhurat-namkaran",
                  "ग्रह दोष निवारण": "/services/graha-dosh",
                  "वास्तु परामर्श": "/services/vastu",
                  "रत्न परामर्श": "/services/gemstone-consultation",
                  "करियर एवं शिक्षा": "#contact",
                  "पारिवारिक एवं वैवाहिक": "#contact",
                  "ऑनलाइन एवं ऑफलाइन": "#contact",
                  "टैरो कार्ड रीडिंग": "/services/tarot-reading",
                  "चिकित्सा ज्योतिष": "/services/medical-astrology",
                  "Vedic Astrology": "/services/vedic-astrology",
                  "Birth Chart": "/services/janam-kundli",
                  "Marriage Matching": "/services/kundali-milan",
                }[service.title] ?? "#contact"
              }
              className={`service-card ${
                index === 0
                  ? "featured-service"
                  : ""
              }`}
            >

              <div className="service-top">

                <span className="service-number">
                  {service.no}
                </span>

                <span className="service-icon">
                  {service.icon}
                </span>

              </div>

              <div className="service-body">

                <p>
                  {service.hindi}
                </p>

                <h3>
                  {service.title}
                </h3>

                <span className="service-line" />

                <small>
                  {service.text}
                </small>

              </div>

              <span className="service-arrow">
                ↗
              </span>

            </a>
          ))}

        </div>
      </section>
      <LocalSeoSection />
      <TalkToAstrologerSection />
      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <section
        id="about"
        className="philosophy"
      >

        <div className="philosophy-pattern" />

        <div className="philosophy-inner">

          <div className="philosophy-symbol">

            <div className="big-mandala">
              <span>ॐ</span>
            </div>

          </div>

          <div className="philosophy-content">

            <p className="section-label gold">
              संस्थान का ध्येय · OUR PHILOSOPHY
            </p>

            <h2>
              हर जिज्ञासा महत्वपूर्ण है,
              <br />
              <em>हर प्रश्न का सम्मान है।</em>
            </h2>

            <p>
              चाहे आप करियर की शुरुआत में हों, विवाह योग्य संतान के भविष्य को लेकर चिंतित हों, मानसिक शांति की तलाश में हों, या अपनी जन्मपत्रिका के रहस्यों को समझना चाहते हों—हमारे यहाँ परामर्श केवल एक औपचारिकता नहीं, बल्कि एक संवेदनशील और जिम्मेदार मार्गदर्शन है।
            </p>

            <div className="philosophy-values">

              <div>
                <strong>सत्य</strong>
                <span>शास्त्रसम्मत प्रामाणिक फलादेश</span>
              </div>

              <div>
                <strong>सेवा</strong>
                <span>निष्ठा एवं आत्मीय भाव</span>
              </div>

              <div>
                <strong>विश्वास</strong>
                <span>दशकों का अटूट भरोसा</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONSULTATION
      ===================================================== */}

      <section
        id="contact"
        className="contact-section"
      >

        <div className="contact-heading">

          <p className="section-label">
            परामर्श प्रारंभ करें · CONSULTATION
          </p>

          <h2>
            अपनी जन्म कुंडली और प्रश्नों के साथ
            <br />
            <em>परामर्श प्राप्त करें।</em>
          </h2>

          <p>
            नीचे दिए गए प्रपत्र में अपनी जन्म तिथि, समय, जन्म स्थान और संपर्क सूत्र साझा करें। पंडित जी द्वारा शीघ्र आपसे संपर्क किया जाएगा।
          </p>

        </div>

        <div className="contact-box">

          <div className="contact-side">

            <span className="contact-symbol">
              ✦
            </span>

            <p className="section-label gold">
              परामर्श केंद्र
            </p>

            <h3>
              आपका मार्गदर्शन,
              <br />
              हमारा संकल्प।
            </h3>

            <p>
              मुजफ्फरनगर कार्यालय में प्रत्यक्ष एवं देश-विदेश हेतु ऑनलाइन परामर्श उपलब्ध।
            </p>

            <div className="contact-details">

              <div>
                <span>फ़ोन संपर्क</span>

                <a href={`tel:${site.phone}`}>
                  {site.phone}
                </a>
              </div>

              <div>
                <span>परामर्श समय</span>

                <strong>
                  {site.timings}
                </strong>
              </div>

            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              व्हाट्सएप पर तुरंत परामर्श →
            </a>

          </div>

          <div className="contact-form-wrap">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="astro-footer">

        <div className="footer-top">

          <div className="footer-brand">

            <span>✦</span>

            <div>

              <strong>
                श्री नक्षत्रलोक ज्योतिष संस्थान
              </strong>

              <small>
                SHREE NAKSHATRALOK JYOTISH SANSTHAN
              </small>

            </div>

          </div>

          <div className="footer-links">

            <a href="#astrologer">
              ज्योतिषाचार्य
            </a>

            <a href="#services">
              सेवाएं
            </a>

            <a href="#talk-to-astrologer">
              बात करें
            </a>

            <a href="/blog">
              ज्योतिष लेख
            </a>

            <a href="/panchang">
              दैनिक पंचांग
            </a>

            <a href="#about">
              संस्थान दर्शन
            </a>

            <a href="#contact">
              परामर्श
            </a>

          </div>

          <a
            href={`tel:${site.phone}`}
            className="footer-phone"
          >
            {site.phone}
          </a>

        </div>

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} Shree
            Nakshatralok Jyotish Sansthan
          </span>

          <span>
            Made by Kartik Vashishtha <span className="made-heart">♥</span>
          </span>

        </div>

      </footer>

      {/* =====================================================
          FLOATING WHATSAPP
      ===================================================== */}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <span>◔</span>
      </a>

    </main>
  );
}