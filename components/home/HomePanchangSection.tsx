import Link from "next/link";
import { site } from "@/lib/site";

export type HomePanchangData = {
  date: string;
  dayName: string;
  location?: string;
  tithi?: string;
  nakshatra?: string;
  yoga?: string;
  karana?: string;
  paksha?: string;
  vikramSamvat?: string | null;
  sunrise?: string;
  sunset?: string;
  abhijitMuhurat?: string | null;
  rahukaal?: string | null;
} | null;

type Props = {
  panchang: HomePanchangData;
  formattedDate: string;
  formattedDayHindi: string;
};

export default function HomePanchangSection({
  panchang,
  formattedDate,
  formattedDayHindi,
}: Props) {
  const whatsappUrl =
    `https://wa.me/${site.whatsapp}?text=` +
    encodeURIComponent("नमस्ते पंडित जी, मुझे आज के पंचांग एवं शुभ मुहूर्त के बारे में जानकारी चाहिए।");

  return (
    <section id="panchang-section" className="home-panchang-section">
      <div className="home-panchang-glow" />
      <div className="home-panchang-inner">

        {/* SECTION HEADER */}
        <div className="home-panchang-header">
          <div className="home-panchang-eyebrow">
            <span>✦</span> दैनिक वैदिक पंचांग · TODAY&apos;S PANCHANG <span>✦</span>
          </div>

          <h2 className="home-panchang-title">
            आज का पंचांग एवं <em>दैनिक शुभ मुहूर्त</em>
          </h2>

          <p className="home-panchang-subtitle">
            प्राचीन काल से शुभ कार्यों का शुभारंभ शास्त्रसम्मत तिथि, नक्षत्र और मुहूर्त देखकर ही किया जाता है। मुजफ्फरनगर एवं संपूर्ण क्षेत्र हेतु आज का दैनिक वैदिक पंचांग।
          </p>
        </div>

        {/* PANCHANG PREVIEW CARD */}
        <div className="home-panchang-card">
          <div className="panchang-card-header">
            <div className="panchang-date-badge">
              <span className="panchang-calendar-icon">📅</span>
              <div>
                <strong>{formattedDate}</strong>
                <small>{formattedDayHindi} · मुजफ्फरनगर (उ.प्र.)</small>
              </div>
            </div>

            <div className="panchang-card-actions">
              <Link href="/panchang" className="panchang-view-full-btn">
                <span>संपूर्ण पंचांग देखें</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>

          {/* KEY VEDIC ELEMENTS GRID */}
          <div className="panchang-metrics-grid">
            {/* TITHI */}
            <div className="panchang-metric-item">
              <span className="metric-tag">तिथि एवं पक्ष</span>
              <div className="metric-val-wrap">
                <span className="metric-icon">🌙</span>
                <strong className="metric-value">
                  {panchang?.tithi || "दैनिक तिथि उपलब्ध"}
                </strong>
              </div>
              <small className="metric-sub">
                {panchang?.paksha ? `${panchang.paksha} पक्ष` : "विस्तृत पंचांग में देखें"}
              </small>
            </div>

            {/* NAKSHATRA */}
            <div className="panchang-metric-item">
              <span className="metric-tag">नक्षत्र</span>
              <div className="metric-val-wrap">
                <span className="metric-icon">✨</span>
                <strong className="metric-value">
                  {panchang?.nakshatra || "आज का नक्षत्र"}
                </strong>
              </div>
              <small className="metric-sub">
                {panchang?.yoga ? `योग: ${panchang.yoga}` : "ग्रह-नक्षत्र स्थिति"}
              </small>
            </div>

            {/* SUNRISE & SUNSET */}
            <div className="panchang-metric-item">
              <span className="metric-tag">सूर्योदय एवं सूर्यास्त</span>
              <div className="metric-val-wrap">
                <span className="metric-icon">☀️</span>
                <strong className="metric-value">
                  {panchang?.sunrise && panchang?.sunset
                    ? `${panchang.sunrise} | ${panchang.sunset}`
                    : "06:15 AM | 06:10 PM"}
                </strong>
              </div>
              <small className="metric-sub">स्थानीय समयानुसार</small>
            </div>

            {/* ABHIJIT MUHURAT */}
            <div className="panchang-metric-item metric-auspicious">
              <span className="metric-tag tag-good">अभिजीत मुहूर्त (शुभ)</span>
              <div className="metric-val-wrap">
                <span className="metric-icon">🌟</span>
                <strong className="metric-value">
                  {panchang?.abhijitMuhurat || "11:45 AM – 12:35 PM"}
                </strong>
              </div>
              <small className="metric-sub">सर्वकार्य सिद्धि हेतु श्रेष्ठ</small>
            </div>

            {/* RAHUKAAL */}
            <div className="panchang-metric-item metric-caution">
              <span className="metric-tag tag-caution">राहुकाल (त्याज्य समय)</span>
              <div className="metric-val-wrap">
                <span className="metric-icon">⚠️</span>
                <strong className="metric-value">
                  {panchang?.rahukaal || "पंचांग में समय देखें"}
                </strong>
              </div>
              <small className="metric-sub">शुभ कार्यों से बचें</small>
            </div>

            {/* SAMVAT */}
            <div className="panchang-metric-item">
              <span className="metric-tag">संवत् एवं संवत्सर</span>
              <div className="metric-val-wrap">
                <span className="metric-icon">🕉️</span>
                <strong className="metric-value">
                  {panchang?.vikramSamvat || "विक्रम संवत् २०८१/८२"}
                </strong>
              </div>
              <small className="metric-sub">
                {panchang?.dayName ? `${panchang.dayName} वासर` : "वैदिक गणना"}
              </small>
            </div>
          </div>

          {/* CARD FOOTER */}
          <div className="panchang-card-footer">
            <div className="panchang-footer-left">
              <span>🔔 किसी विशिष्ट कार्य हेतु शुभ मुहूर्त विचार करना चाहते हैं?</span>
            </div>

            <div className="panchang-footer-right">
              <Link href="/panchang" className="panchang-details-link">
                आज का पूरा पंचांग (विस्तृत विवरण) ↗
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="panchang-whatsapp-link"
              >
                व्हाट्सएप पर मुहूर्त पूछें
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
