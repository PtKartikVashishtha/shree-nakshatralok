"use client";

import { useState } from "react";

type Props = {
  title: string;
  slug: string;
};

export default function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined"
    ? window.location.href
    : `https://shree-nakshatralok.vercel.app/blog/${slug}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - Read more on Shree Nakshatralok:\n${url}`
  )}`;

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold text-[#8c7462]">
        लेख साझा करें:
      </span>

      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-green-600/30 bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-800 transition hover:bg-green-100"
      >
        <span>व्हाट्सएप पर शेयर करें ↗</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#ded1be] bg-[#fffdf8] px-4 py-1.5 text-xs font-semibold text-[#665449] transition hover:bg-[#faf5ec]"
      >
        <span>{copied ? "✓ लिंक कॉपी हो गया" : "लिंक कॉपी करें 🔗"}</span>
      </button>
    </div>
  );
}
