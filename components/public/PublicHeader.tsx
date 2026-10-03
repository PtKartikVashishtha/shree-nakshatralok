"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

type Props = {
  activePage?: "blog" | "panchang" | "other";
};

export default function PublicHeader({ activePage }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const whatsappUrl =
    `https://wa.me/${site.whatsapp}?text=` +
    encodeURIComponent(site.whatsappMessage);

  return (
    <header className="relative z-50 overflow-hidden bg-[#300604] text-white">
      {/* Decorative astrological rings */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border border-[#d7ad63]" />
        <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border border-[#d7ad63]" />
        <div className="absolute right-20 top-10 text-5xl text-[#d7ad63]">✦</div>
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-3.5 transition hover:opacity-90">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7ad63]/50 text-lg text-[#e5c67d]">
            ✦
          </span>
          <div>
            <strong className="block font-serif text-lg font-semibold tracking-wide text-[#f5dfad]">
              श्री नक्षत्रलोक
            </strong>
            <small className="block text-[8px] tracking-[3px] text-[#bca89b]">
              JYOTISH SANSTHAN
            </small>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/#astrologer"
            className="text-xs font-medium tracking-wide text-[#d7c9c0] transition hover:text-[#e5c67d]"
          >
            ज्योतिषाचार्य
          </Link>
          <Link
            href="/#services"
            className="text-xs font-medium tracking-wide text-[#d7c9c0] transition hover:text-[#e5c67d]"
          >
            सेवाएं
          </Link>
          <Link
            href="/blog"
            className={`text-xs font-medium tracking-wide transition ${
              activePage === "blog"
                ? "font-semibold text-[#e5c67d] underline underline-offset-4 decoration-[#d7ad63]"
                : "text-[#d7c9c0] hover:text-[#e5c67d]"
            }`}
          >
            ज्योतिष लेख
          </Link>
          <Link
            href="/panchang"
            className={`text-xs font-medium tracking-wide transition ${
              activePage === "panchang"
                ? "font-semibold text-[#e5c67d] underline underline-offset-4 decoration-[#d7ad63]"
                : "text-[#d7c9c0] hover:text-[#e5c67d]"
            }`}
          >
            दैनिक पंचांग
          </Link>
          <Link
            href="/#contact"
            className="text-xs font-medium tracking-wide text-[#d7c9c0] transition hover:text-[#e5c67d]"
          >
            परामर्श
          </Link>
        </nav>

        {/* CTA & MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-[#e5c67d]/60 px-5 py-2 text-xs font-semibold tracking-wider text-[#f3dfad] transition hover:bg-[#e5c67d]/15 sm:inline-flex items-center gap-1.5"
          >
            <span>व्हाट्सएप परामर्श</span>
            <span className="text-[10px]">↗</span>
          </a>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#e5c67d]/40 px-4 text-xs font-semibold text-[#e5c67d] md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? "बंद करें" : "मेनू"}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <nav className="border-t border-[#4d100c] bg-[#260504] px-6 py-6 md:hidden space-y-4">
          <Link
            href="/#astrologer"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#d7c9c0] hover:text-[#e5c67d]"
          >
            ज्योतिषाचार्य परिचय
          </Link>
          <Link
            href="/#services"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#d7c9c0] hover:text-[#e5c67d]"
          >
            हमारी सेवाएं
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className={`block text-sm ${
              activePage === "blog" ? "font-bold text-[#e5c67d]" : "text-[#d7c9c0]"
            }`}
          >
            ज्योतिष एवं आयुर्वेद लेख
          </Link>
          <Link
            href="/panchang"
            onClick={() => setMobileOpen(false)}
            className={`block text-sm ${
              activePage === "panchang" ? "font-bold text-[#e5c67d]" : "text-[#d7c9c0]"
            }`}
          >
            दैनिक पंचांग
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#d7c9c0] hover:text-[#e5c67d]"
          >
            परामर्श हेतु संपर्क
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block pt-2 text-sm font-semibold text-[#f3dfad]"
          >
            व्हाट्सएप पर तुरंत परामर्श ↗
          </a>
        </nav>
      )}
    </header>
  );
}
