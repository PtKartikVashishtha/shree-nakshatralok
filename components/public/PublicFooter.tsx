import Link from "next/link";
import { site } from "@/lib/site";

export default function PublicFooter() {
  return (
    <footer className="bg-[#1c0302] text-[#b29c8d] border-t border-[#38100d]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* BRAND */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#d7ad63]">✦</span>
              <div>
                <strong className="block font-serif text-xl font-semibold text-white">
                  श्री नक्षत्रलोक ज्योतिष संस्थान
                </strong>
                <small className="block text-[8px] tracking-[3px] text-[#705f55]">
                  SHREE NAKSHATRALOK JYOTISH SANSTHAN
                </small>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#9a8678]">
              पंडित राधे श्याम शर्मा द्वारा पारंपरिक वैदिक ज्योतिष एवं आध्यात्मिक मार्गदर्शन। जन्म कुंडली, विवाह गुण मिलान, शुभ मुहूर्त और जीवन के महत्वपूर्ण निर्णयों हेतु मुजफ्फरनगर में प्रत्यक्ष एवं संपूर्ण भारत व विदेश हेतु ऑनलाइन परामर्श।
            </p>

            <div className="text-xs text-[#d7ad63] font-medium tracking-wide">
              सत्य · सेवा · विश्वास · धर्म
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#d7ad63]">
              महत्वपूर्ण पृष्ठ · EXPLORE
            </p>
            <ul className="mt-4 space-y-2.5 text-xs text-[#b5a294]">
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  ज्योतिष एवं आयुर्वेद लेख (Blog)
                </Link>
              </li>
              <li>
                <Link href="/panchang" className="hover:text-white transition">
                  आज का दैनिक पंचांग (Panchang)
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition">
                  वैदिक ज्योतिष सेवाएं (Services)
                </Link>
              </li>
              <li>
                <Link href="/services/janam-kundli" className="hover:text-white transition">
                  जन्म कुंडली विश्लेषण (Janam Kundli)
                </Link>
              </li>
              <li>
                <Link href="/services/kundali-milan" className="hover:text-white transition">
                  विवाह कुंडली मिलान (Kundali Milan)
                </Link>
              </li>
              <li>
                <Link href="/#astrologer" className="hover:text-white transition">
                  ज्योतिषाचार्य परिचय (About)
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT & OFFICE */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#d7ad63]">
              कार्यालय एवं संपर्क
            </p>
            <div className="mt-4 space-y-3 text-xs text-[#b5a294] leading-relaxed">
              <p>
                <strong className="text-white">स्थान:</strong>
                <br />
                शांति नगर, मुजफ्फरनगर
                <br />
                उत्तर प्रदेश · 251002, भारत
              </p>
              <p>
                <strong className="text-white">परामर्श समय:</strong>
                <br />
                {site.timings}
              </p>
              <p>
                <strong className="text-white">फ़ोन / व्हाट्सएप:</strong>
                <br />
                <a
                  href={`tel:${site.phone}`}
                  className="text-[#f5dfad] hover:underline"
                >
                  +91 {site.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 border-t border-[#2e0907] pt-8 flex flex-col gap-4 text-xs text-[#705f55] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} श्री नक्षत्रलोक ज्योतिष संस्थान। सर्वाधिकार सुरक्षित।
          </span>

          <span className="font-medium text-[#b5a294]">
            Made by Kartik Vashishtha <span className="made-heart">♥</span>
          </span>

          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-[#b29c8d] transition">
              व्यवस्थापक (Admin)
            </Link>
            <span>·</span>
            <Link href="/panchang" className="hover:text-[#b29c8d] transition">
              दैनिक पंचांग
            </Link>
            <span>·</span>
            <Link href="/blog" className="hover:text-[#b29c8d] transition">
              ज्योतिष लेख
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
