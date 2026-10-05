import Link from "next/link";
import { site } from "@/lib/site";
import {
  SunIcon,
  MoonIcon,
  NakshatraIcon,
  YogaIcon,
  MuhuratIcon,
  KaalIcon,
  SamvatIcon,
  CalendarPatrikaIcon,
  LocationIcon,
} from "@/components/panchang/PanchangIcons";

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
    encodeURIComponent("नमस्ते पंडित जी, मुझे आज के पंचांग एवं विशिष्ट शुभ मुहूर्त के विषय में शास्त्रीय मार्गदर्शन चाहिए।");

  return (
    <section id="panchang-section" className="home-panchang-section">
      <div className="home-panchang-glow" />
      <div className="home-panchang-inner">

        {/* SECTION HEADER */}
        <div className="home-panchang-header">
          <div className="home-panchang-eyebrow">
            <span>✦</span> ॥ ॐ सूर्याय नमः ॥ · दैनिक वैदिक पञ्चाङ्ग · TODAY&apos;S ALMANAC <span>✦</span>
          </div>

          <h2 className="home-panchang-title">
            आज का पंचांग एवं <em>दैनिक शुभ मुहूर्त</em>
          </h2>

          <p className="home-panchang-subtitle">
            प्राचीन काल से शुभ कार्यों का शुभारंभ शास्त्रसम्मत तिथि, नक्षत्र और मुहूर्त देखकर ही किया जाता है। मुजफ्फरनगर एवं संपूर्ण क्षेत्र हेतु आज का प्रामाणिक वैदिक पंचांग।
          </p>
        </div>

        {/* PANCHANG PATRIKA CARD */}
        <div className="home-panchang-card">
          <div className="panchang-card-header">
            <div className="panchang-date-badge">
              <div className="panchang-calendar-icon">
                <CalendarPatrikaIcon size={24} />
              </div>
              <div className="panchang-date-meta">
                <strong>{formattedDate}</strong>
                <small>
                  <span>{formattedDayHindi} वासर</span>
                  <span>·</span>
                  <span className="loc-tag">
                    <LocationIcon size={14} /> मुजफ्फरनगर (उ.प्र.)
                  </span>
                </small>
              </div>
            </div>

            <div className="panchang-card-actions">
              <Link href="/panchang" className="panchang-view-full-btn">
                <span>सम्पूर्ण पंचांग देखें</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>

          {/* PRIMARY PANCHA-ANGA (FOUR QUADRANTS) */}
          <div className="panchang-metrics-grid">
            {/* TITHI & PAKSHA */}
            <div className="panchang-metric-item">
              <span className="metric-tag">
                <MoonIcon size={14} /> तिथि एवं पक्ष
              </span>
              <div className="metric-val-wrap">
                <div className="metric-icon-wrap">
                  <MoonIcon size={18} />
                </div>
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
              <span className="metric-tag">
                <NakshatraIcon size={14} /> नक्षत्र
              </span>
              <div className="metric-val-wrap">
                <div className="metric-icon-wrap">
                  <NakshatraIcon size={18} />
                </div>
                <strong className="metric-value">
                  {panchang?.nakshatra || "आज का नक्षत्र"}
                </strong>
              </div>
              <small className="metric-sub">
                {panchang?.yoga ? `योग: ${panchang.yoga}` : "ग्रह-नक्षत्र संचरण"}
              </small>
            </div>

            {/* YOGA & KARANA */}
            <div className="panchang-metric-item">
              <span className="metric-tag">
                <YogaIcon size={14} /> योग एवं करण
              </span>
              <div className="metric-val-wrap">
                <div className="metric-icon-wrap">
                  <YogaIcon size={18} />
                </div>
                <strong className="metric-value">
                  {panchang?.yoga || "दैनिक योग"}
                </strong>
              </div>
              <small className="metric-sub">
                {panchang?.karana ? `करण: ${panchang.karana}` : "वैदिक काल गणना"}
              </small>
            </div>

            {/* SUNRISE & SUNSET */}
            <div className="panchang-metric-item">
              <span className="metric-tag">
                <SunIcon size={14} /> सूर्योदय एवं सूर्यास्त
              </span>
              <div className="metric-val-wrap">
                <div className="metric-icon-wrap">
                  <SunIcon size={18} />
                </div>
                <strong className="metric-value">
                  {panchang?.sunrise && panchang?.sunset
                    ? `${panchang.sunrise} | ${panchang.sunset}`
                    : "06:15 AM | 06:10 PM"}
                </strong>
              </div>
              <small className="metric-sub">स्थानीय मुजफ्फरनगर अक्षांश</small>
            </div>
          </div>

          {/* DUAL MUHURAT STRIP (SHUBH, VARJYA, SAMVAT) */}
          <div className="panchang-muhurat-strip">
            {/* ABHIJIT MUHURAT */}
            <div className="muhurat-strip-cell cell-auspicious">
              <div className="muhurat-cell-icon">
                <MuhuratIcon size={20} />
              </div>
              <div className="muhurat-cell-text">
                <span className="muhurat-cell-label">अभिजीत मुहूर्त (शुभ काल)</span>
                <strong className="muhurat-cell-value">
                  {panchang?.abhijitMuhurat || "11:45 AM – 12:35 PM"}
                </strong>
                <span className="muhurat-cell-sub">सर्वकार्य सिद्धि हेतु सर्वश्रेष्ठ मुहूर्त</span>
              </div>
            </div>

            {/* RAHUKAAL */}
            <div className="muhurat-strip-cell cell-caution">
              <div className="muhurat-cell-icon">
                <KaalIcon size={20} />
              </div>
              <div className="muhurat-cell-text">
                <span className="muhurat-cell-label">राहुकाल (त्याज्य समय)</span>
                <strong className="muhurat-cell-value">
                  {panchang?.rahukaal || "पंचांग में समय देखें"}
                </strong>
                <span className="muhurat-cell-sub">इस काल में नूतन कार्य आरंभ से बचें</span>
              </div>
            </div>

            {/* SAMVAT */}
            <div className="muhurat-strip-cell cell-samvat">
              <div className="muhurat-cell-icon">
                <SamvatIcon size={20} />
              </div>
              <div className="muhurat-cell-text">
                <span className="muhurat-cell-label">संवत्सर एवं कालचक्र</span>
                <strong className="muhurat-cell-value">
                  {panchang?.vikramSamvat || "विक्रम संवत् २०८१/८२"}
                </strong>
                <span className="muhurat-cell-sub">
                  {panchang?.dayName ? `${panchang.dayName} वासरिय काल` : "सृष्टि संवत गणना"}
                </span>
              </div>
            </div>
          </div>

          {/* CARD FOOTER */}
          <div className="panchang-card-footer">
            <div className="panchang-footer-left">
              <span className="bullet">✦</span>
              <span>विवाह, गृह प्रवेश, व्यापार आरंभ अथवा नामकरण हेतु व्यक्तिगत मुहूर्त परामर्श उपलब्ध है।</span>
            </div>

            <div className="panchang-footer-right">
              <Link href="/panchang" className="panchang-details-link">
                सम्पूर्ण विस्तृत पञ्चाङ्ग दर्पण ↗
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="panchang-whatsapp-link"
              >
                <span>व्हाट्सएप पर मुहूर्त पूछें</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
