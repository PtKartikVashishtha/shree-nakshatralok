"use client";

import Image from "next/image";
import { site } from "@/lib/site";

const quickTopics = [
  {
    icon: "☾",
    title: "विवाह एवं कुंडली मिलान",
    desc: "गुण मिलान, मांगलिक विचार व वैवाहिक सुख",
    message: "नमस्ते पंडित जी, मुझे विवाह एवं कुंडली मिलान के संबंध में आपसे परामर्श करना है।",
  },
  {
    icon: "☉",
    title: "करियर, नौकरी एवं व्यवसाय",
    desc: "पदोन्नति, व्यापार वृद्धि व अनुकूल समय",
    message: "नमस्ते पंडित जी, मुझे करियर, नौकरी अथवा व्यापार के विषय में आपका मार्गदर्शन चाहिए।",
  },
  {
    icon: "♄",
    title: "ग्रह दोष व साढ़ेसाती निवारण",
    desc: "शनि ढैय्या, कालसर्प व राहु-केतु शांति",
    message: "नमस्ते पंडित जी, मुझे ग्रह दोष निवारण एवं वैदिक शांति उपायों के बारे में बात करनी है।",
  },
  {
    icon: "⌂",
    title: "वास्तु दोष एवं गृह शांति",
    desc: "घर व व्यापारिक स्थल का वास्तु विश्लेषण",
    message: "नमस्ते पंडित जी, मुझे वास्तु विचार एवं गृह शांति हेतु परामर्श प्राप्त करना है।",
  },
  {
    icon: "◇",
    title: "रत्न परामर्श एवं धारण विधि",
    desc: "राशि व लग्नानुसार शुद्ध रत्न सुझाव",
    message: "नमस्ते पंडित जी, मुझे अपनी कुंडली अनुसार उपयुक्त रत्न परामर्श की जानकारी चाहिए।",
  },
  {
    icon: "✧",
    title: "अन्य व्यक्तिगत प्रश्न",
    desc: "स्वास्थ्य, शिक्षा या तात्कालिक समस्या",
    message: "नमस्ते पंडित जी, मुझे एक आवश्यक व्यक्तिगत प्रश्न हेतु आपसे परामर्श करना है।",
  },
];

export default function TalkToAstrologerSection() {
  const defaultWhatsAppUrl =
    `https://wa.me/${site.whatsapp}?text=` +
    encodeURIComponent("नमस्ते पंडित राधे श्याम जी, मुझे ज्योतिषीय परामर्श हेतु आपसे बात करनी है।");

  const getTopicWhatsAppUrl = (msg: string) =>
    `https://wa.me/${site.whatsapp}?text=` + encodeURIComponent(msg);

  return (
    <section id="talk-to-astrologer" className="talk-astrologer-section">
      <div className="talk-astrologer-glow" />
      <div className="talk-astrologer-inner">

        {/* SECTION HEADER */}
        <div className="talk-astrologer-header">
          <p className="talk-astrologer-eyebrow">
            <span>✦</span> प्रत्यक्ष संवाद · TALK TO ASTROLOGER <span>✦</span>
          </p>

          <h2 className="talk-astrologer-title">
            ज्योतिषाचार्य से <em>सीधे व्हाट्सएप पर बात करें</em>
          </h2>

          <p className="talk-astrologer-subtitle">
            बिना किसी औपचारिकता या लंबे इंतजार के, अपने जीवन के महत्वपूर्ण प्रश्नों, जन्म कुंडली और संकट निवारण हेतु पंडित राधे श्याम शर्मा से व्हाट्सएप पर तुरंत संपर्क करें।
          </p>
        </div>

        {/* MAIN SHOWCASE CARD */}
        <div className="talk-astrologer-card">
          {/* PROFILE COLUMN */}
          <div className="talk-astrologer-profile">
            <div className="talk-astrologer-avatar-wrap">
              <div className="talk-astrologer-avatar">
                <Image
                  src="/astrologer/radhey-shyam-01.jpg"
                  alt="पंडित राधे श्याम शर्मा"
                  fill
                  sizes="(max-width: 768px) 160px, 200px"
                  className="talk-astrologer-photo"
                  priority
                />
              </div>

              {/* LIVE ONLINE BADGE */}
              <div className="talk-astrologer-status-badge">
                <span className="status-dot-pulse" />
                <span>व्हाट्सएप पर उपलब्ध</span>
              </div>
            </div>

            <div className="talk-astrologer-info">
              <h3>पंडित राधे श्याम शर्मा</h3>
              <p className="talk-astrologer-subname">
                Pt. Radhey Shyam Sharma · वरिष्ठ ज्योतिषाचार्य
              </p>
              <div className="talk-astrologer-badges">
                <span>५५+ वर्षों का अनुभव</span>
                <span>•</span>
                <span>श्री नक्षत्रलोक संस्थान</span>
              </div>
            </div>

            <div className="talk-astrologer-modes">
              <div className="mode-item">
                <span className="mode-icon">💬</span>
                <div>
                  <strong>चैट परामर्श</strong>
                  <small>कुंडली विवरण व प्रश्न भेजें</small>
                </div>
              </div>
              <div className="mode-item">
                <span className="mode-icon">📞</span>
                <div>
                  <strong>ऑडियो कॉल</strong>
                  <small>व्हाट्सएप / फोन पर सीधी चर्चा</small>
                </div>
              </div>
              <div className="mode-item">
                <span className="mode-icon">📹</span>
                <div>
                  <strong>वीडियो परामर्श</strong>
                  <small>आमने-सामने विस्तृत समाधान</small>
                </div>
              </div>
            </div>

            <div className="talk-astrologer-timings">
              <span>🕒 परामर्श समय: {site.timings}</span>
            </div>
          </div>

          {/* ACTION & TOPICS COLUMN */}
          <div className="talk-astrologer-action-box">
            <div className="action-box-header">
              <h4>किस विषय पर बात करना चाहते हैं?</h4>
              <p>विषय चुनें और सीधा संदेश भेजकर बात शुरू करें:</p>
            </div>

            {/* QUICK TOPIC BUTTONS */}
            <div className="talk-topics-grid">
              {quickTopics.map((topic) => (
                <a
                  key={topic.title}
                  href={getTopicWhatsAppUrl(topic.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="topic-chip"
                  title="व्हाट्सएप पर यह संदेश भेजें"
                >
                  <span className="topic-chip-icon">{topic.icon}</span>
                  <div className="topic-chip-body">
                    <strong>{topic.title}</strong>
                    <small>{topic.desc}</small>
                  </div>
                  <span className="topic-chip-arrow">↗</span>
                </a>
              ))}
            </div>

            {/* PRIMARY CTA BAR */}
            <div className="talk-cta-wrapper">
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="talk-primary-whatsapp-btn"
              >
                <svg
                  className="whatsapp-icon-svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.031 2C6.495 2 2 6.495 2 12.031a10.02 10.02 0 0 0 1.609 5.485L2.086 21.8a.75.75 0 0 0 .914.914l4.316-1.523A9.975 9.975 0 0 0 12.031 22.062c5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.562a8.47 8.47 0 0 1-4.52-1.297.75.75 0 0 0-.58-.08l-3.328 1.176 1.176-3.328a.75.75 0 0 0-.08-.58 8.476 8.476 0 0 1-1.299-4.422c0-4.708 3.823-8.531 8.531-8.531 4.708 0 8.531 3.823 8.531 8.531 0 4.708-3.823 8.531-8.531 8.531zm4.72-6.388c-.26-.13-1.536-.758-1.774-.845-.238-.087-.412-.13-.585.13s-.672.845-.824 1.018c-.152.174-.304.195-.563.065-.26-.13-1.099-.405-2.093-1.291-.774-.69-1.296-1.543-1.448-1.803-.152-.26-.016-.401.114-.53.117-.116.26-.304.39-.456.13-.152.174-.26.26-.434.087-.174.044-.325-.022-.455s-.585-1.409-.802-1.93c-.212-.507-.428-.438-.585-.446-.152-.008-.326-.01-.5-.01s-.456.065-.694.325c-.239.26-.911.89-.911 2.17s.933 2.517 1.063 2.691c.13.174 1.836 2.803 4.448 3.93.621.268 1.106.429 1.484.55.624.198 1.192.17 1.64.103.5-.075 1.536-.628 1.752-1.236.217-.607.217-1.127.152-1.236-.065-.109-.239-.174-.499-.304z" />
                </svg>
                <span>व्हाट्सएप पर अभी बात करें · Chat on WhatsApp</span>
                <span className="btn-arrow">→</span>
              </a>

              <div className="talk-secondary-actions">
                <a href={`tel:${site.phone}`} className="talk-phone-btn">
                  <span>📞 फोन पर सीधे कॉल करें:</span>
                  <strong>+91 {site.phone}</strong>
                </a>

                <div className="talk-trust-tags">
                  <span>🔒 100% गोपनीय</span>
                  <span>•</span>
                  <span>⚡ तुरंत उत्तर</span>
                  <span>•</span>
                  <span>📜 शास्त्रसम्मत उपाय</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
