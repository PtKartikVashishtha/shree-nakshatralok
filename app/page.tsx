"use client";

import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import AstrologerSection from "@/components/AstrologerSection";
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
    title: "Vedic Astrology",
    hindi: "वैदिक ज्योतिष",
    text: "Personalized guidance through the principles of Vedic astrology.",
  },
  {
    no: "02",
    icon: "◉",
    title: "Birth Chart",
    hindi: "जन्म कुंडली",
    text: "Janam Kundali creation and detailed astrological analysis.",
  },
  {
    no: "03",
    icon: "☾",
    title: "Marriage Matching",
    hindi: "विवाह मिलान",
    text: "Kundali Milan and compatibility guidance for marriage.",
  },
  {
    no: "04",
    icon: "✦",
    title: "Muhurat & Naming",
    hindi: "मुहूर्त एवं नामकरण",
    text: "Auspicious timings for important beginnings and ceremonies.",
  },
  {
    no: "05",
    icon: "♄",
    title: "Graha Dosh",
    hindi: "ग्रह दोष निवारण",
    text: "Astrological consultation regarding planetary influences.",
  },
  {
    no: "06",
    icon: "⌂",
    title: "Vastu",
    hindi: "वास्तु परामर्श",
    text: "Guidance for harmony and balance in your spaces.",
  },
  {
    no: "07",
    icon: "◇",
    title: "Gemstones",
    hindi: "रत्न परामर्श",
    text: "Personalized gemstone consultation based on astrology.",
  },
  {
    no: "08",
    icon: "♃",
    title: "Career & Education",
    hindi: "करियर एवं शिक्षा",
    text: "Guidance for career, education and business decisions.",
  },
  {
    no: "09",
    icon: "♡",
    title: "Family & Marriage",
    hindi: "पारिवारिक एवं वैवाहिक",
    text: "Personal consultation for family and marital matters.",
  },
  {
    no: "10",
    icon: "∞",
    title: "Online & Offline",
    hindi: "ऑनलाइन एवं ऑफलाइन",
    text: "Consultations available from wherever you are.",
  },
  {
    no: "11",
    icon: "✧",
    title: "Tarot Reading",
    hindi: "टैरो कार्ड रीडिंग",
    text: "Special Tarot card reading for personal guidance.",
  },
  {
    no: "12",
    icon: "☤",
    title: "Medical Astrology",
    hindi: "चिकित्सा ज्योतिष",
    text: "Traditional astrological guidance concerning wellbeing and health-related planetary influences.",
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
            <a href="#astrologer">Astrologer</a>
            <a href="#services">Services</a>
            <a href="#about">Philosophy</a>
            <a href="#contact">Consultation</a>
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
              WhatsApp
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
              <span>MENU</span>

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
            Astrologer
          </a>

          <a
            href="#services"
            onClick={closeMobileMenu}
          >
            Services
          </a>

          <a
            href="#about"
            onClick={closeMobileMenu}
          >
            Philosophy
          </a>

          <a
            href="#contact"
            onClick={closeMobileMenu}
          >
            Consultation
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
            वैदिक ज्योतिष परामर्श
            <span />
          </div>

          <p className="hero-kicker">
            SHREE NAKSHATRALOK
          </p>

          <h1 className="hero-name">
            Radhey Shyam Sharma
          </h1>

          <p className="hero-name-hindi">
            राधे श्याम शर्मा
          </p>

          <div className="hero-experience">
            <span>55+ Years</span>

            <i />

            <span>Vedic Astrology</span>
          </div>

          <p className="hero-short-intro">
            Traditional Jyotish guidance for life's important questions.
          </p>

          <div className="hero-actions">

            <a
              href="#contact"
              className="gold-button"
            >
              Begin Your Consultation
              <span>→</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="outline-button"
            >
              Chat on WhatsApp
            </a>

          </div>

          <div className="hero-meta">

            <div>
              <strong>सत्य</strong>
              <span>Truth</span>
            </div>

            <i />

            <div>
              <strong>सेवा</strong>
              <span>Service</span>
            </div>

            <i />

            <div>
              <strong>विश्वास</strong>
              <span>Trust</span>
            </div>

          </div>
        </div>

        <div className="hero-bottom">
          <span>EXPLORE</span>
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
              THE JOURNEY
            </p>

            <h2>
              Ancient wisdom.
              <br />
              <em>Personal guidance.</em>
            </h2>
          </div>

          <div className="intro-copy">

            <p>
              Astrology is more than predicting what may
              happen tomorrow. It is a traditional way of
              understanding patterns, possibilities and
              the different chapters of life.
            </p>

            <p>
              At Shree Nakshatralok Jyotish Sansthan,
              every consultation begins with listening —
              to your question, your circumstances and
              the journey you are about to undertake.
            </p>

            <a
              href="#astrologer"
              className="text-link"
            >
              Meet the Astrologer
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
              WHAT WE OFFER
            </p>

            <h2>
              Guidance for
              <br />
              <em>every chapter.</em>
            </h2>

          </div>

          <p>
            From Janam Kundali and marriage matching to
            career, Vastu, Tarot and Medical Astrology,
            explore personalized consultation for the
            questions that matter.
          </p>

        </div>

        <div className="services-grid">

          {services.map((service, index) => (
            <article
              key={service.no}
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

            </article>
          ))}

        </div>
      </section>

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
              OUR PHILOSOPHY
            </p>

            <h2>
              Every question deserves
              <br />
              <em>to be heard.</em>
            </h2>

            <p>
              Whether you are standing at the beginning
              of a career, considering marriage, searching
              for clarity or simply curious about what your
              chart reveals — your consultation is treated
              as a personal conversation, not a formula.
            </p>

            <div className="philosophy-values">

              <div>
                <strong>सत्य</strong>
                <span>Truth in guidance</span>
              </div>

              <div>
                <strong>सेवा</strong>
                <span>Service with sincerity</span>
              </div>

              <div>
                <strong>विश्वास</strong>
                <span>Trust through understanding</span>
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
            YOUR NEXT CHAPTER
          </p>

          <h2>
            Ask the question
            <br />
            <em>that brought you here.</em>
          </h2>

          <p>
            Share your birth details and your question.
            We will get back to you for the consultation.
          </p>

        </div>

        <div className="contact-box">

          <div className="contact-side">

            <span className="contact-symbol">
              ✦
            </span>

            <p className="section-label gold">
              CONSULTATION
            </p>

            <h3>
              Your story
              <br />
              starts here.
            </h3>

            <p>
              Online and offline consultation available.
            </p>

            <div className="contact-details">

              <div>
                <span>CALL</span>

                <a href={`tel:${site.phone}`}>
                  {site.phone}
                </a>
              </div>

              <div>
                <span>HOURS</span>

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
              WhatsApp Consultation →
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
              Astrologer
            </a>

            <a href="#services">
              Services
            </a>

            <a href="#about">
              Philosophy
            </a>

            <a href="#contact">
              Consultation
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
            सत्य · सेवा · विश्वास
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