"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function HomeNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const whatsappUrl =
    `https://wa.me/${site.whatsapp}?text=` +
    encodeURIComponent(site.whatsappMessage);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <nav className="astro-nav">
      <div className="nav-inner">
        {/* BRAND */}
        <a href="#top" className="brand" onClick={closeMobileMenu}>
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
          <Link href="/panchang">दैनिक पंचांग</Link>
          <Link href="/blog">ज्योतिष लेख</Link>
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
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
          >
            <span>{mobileOpen ? "बंद करें" : "मेनू"}</span>

            <span
              className={`menu-icon ${mobileOpen ? "menu-open" : ""}`}
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
      <div className={`mobile-nav ${mobileOpen ? "mobile-nav-open" : ""}`}>
        <a href="#astrologer" onClick={closeMobileMenu}>
          ज्योतिषाचार्य परिचय
        </a>

        <a href="#services" onClick={closeMobileMenu}>
          हमारी सेवाएं
        </a>

        <a href="#talk-to-astrologer" onClick={closeMobileMenu}>
          ज्योतिषाचार्य से बात करें
        </a>

        <Link href="/panchang" onClick={closeMobileMenu}>
          दैनिक पंचांग (Today&apos;s Panchang)
        </Link>

        <Link href="/blog" onClick={closeMobileMenu}>
          ज्योतिष एवं आयुर्वेद लेख
        </Link>

        <a href="#about" onClick={closeMobileMenu}>
          संस्थान का दर्शन
        </a>

        <a href="#contact" onClick={closeMobileMenu}>
          परामर्श हेतु संपर्क
        </a>
      </div>
    </nav>
  );
}
