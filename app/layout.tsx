import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Cinzel,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const siteUrl = "https://shree-nakshatralok.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Shree Nakshatralok Jyotish Sansthan | Vedic Astrology",
    template: "%s | Shree Nakshatralok",
  },

  description:
    "Shree Nakshatralok Jyotish Sansthan offers personalized Vedic astrology guidance including Janam Kundali, Kundali Milan, marriage matching, career guidance, Vastu, gemstones, Tarot and Medical Astrology.",

  applicationName:
    "Shree Nakshatralok Jyotish Sansthan",

  keywords: [
    "Shree Nakshatralok",
    "Shree Nakshatralok Jyotish Sansthan",
    "Vedic Astrology",
    "Jyotish",
    "Astrologer in Muzaffarnagar",
    "Vedic Astrologer in Muzaffarnagar",
    "Janam Kundali",
    "Kundali Milan",
    "Marriage Matching",
    "Vivah Matching",
    "Vastu",
    "Gemstone Consultation",
    "Career Astrology",
    "Tarot Reading",
    "Medical Astrology",
  ],

  authors: [
    {
      name: "Shree Nakshatralok Jyotish Sansthan",
    },
  ],

  creator:
    "Shree Nakshatralok Jyotish Sansthan",

  publisher:
    "Shree Nakshatralok Jyotish Sansthan",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google:
      "pERzjxk8Qjby2pR-AaIIGtJc7uPreDk3vDEkDDdLMMA",
  },

  icons: {
    icon: "/icon.svg",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,

    siteName:
      "Shree Nakshatralok Jyotish Sansthan",

    title:
      "Shree Nakshatralok Jyotish Sansthan | Vedic Astrology",

    description:
      "Personalized Vedic astrology guidance for life's important questions.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt:
          "Shree Nakshatralok Jyotish Sansthan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Shree Nakshatralok Jyotish Sansthan | Vedic Astrology",

    description:
      "Personalized Vedic astrology guidance for life's important questions.",

    images: ["/og-image.jpg"],
  },
};

/* =====================================================
   STRUCTURED DATA / JSON-LD
===================================================== */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    /* ================= WEBSITE ================= */

    {
      "@type": "WebSite",

      "@id": `${siteUrl}/#website`,

      url: `${siteUrl}/`,

      name:
        "Shree Nakshatralok Jyotish Sansthan",

      alternateName:
        "Shree Nakshatralok",

      inLanguage: ["en-IN", "hi-IN"],
    },

    /* ================= LOCAL BUSINESS ================= */

    {
      "@type": "LocalBusiness",

      "@id": `${siteUrl}/#business`,

      name:
        "Shree Nakshatralok Jyotish Sansthan",

      alternateName:
        "Shree Nakshatralok",

      url: `${siteUrl}/`,

      telephone: site.phone,

      image: [
        `${siteUrl}/astrologer/radhey-shyam-01.jpg`,
        `${siteUrl}/astrologer/radhey-shyam-02.jpg`,
        `${siteUrl}/astrologer/radhey-shyam-03.jpg`,
        `${siteUrl}/astrologer/radhey-shyam-04.jpg`,
      ],

      logo: `${siteUrl}/icon.svg`,

      description:
        "Shree Nakshatralok Jyotish Sansthan provides traditional Vedic astrology consultations, Janam Kundali, Kundali Milan, Vivah Matching, Vastu, career guidance, gemstones, Tarot and Medical Astrology.",

      address: {
        "@type": "PostalAddress",

        streetAddress:
          "Shanti Nagar",

        addressLocality:
          "Muzaffarnagar",

        addressRegion:
          "Uttar Pradesh",

        postalCode:
          "251002",

        addressCountry:
          "IN",
      },

      areaServed: [
        {
          "@type": "City",
          name: "Muzaffarnagar",
        },
        {
          "@type": "Country",
          name: "India",
        },
        {
          "@type": "Place",
          name: "Worldwide",
        },
      ],

      founder: {
        "@id": `${siteUrl}/#astrologer`,
      },

      employee: {
        "@id": `${siteUrl}/#astrologer`,
      },

      knowsAbout: [
        "Vedic Astrology",
        "Janam Kundali",
        "Kundali Milan",
        "Vivah Matching",
        "Marriage Astrology",
        "Career Astrology",
        "Education Astrology",
        "Business Astrology",
        "Vastu",
        "Gemstone Consultation",
        "Tarot Reading",
        "Medical Astrology",
      ],
    },

    /* ================= ASTROLOGER ================= */

    {
      "@type": "Person",

      "@id": `${siteUrl}/#astrologer`,

      name:
        "Radhey Shyam Sharma",

      alternateName:
        "राधे श्याम शर्मा",

      image:
        `${siteUrl}/astrologer/radhey-shyam-01.jpg`,

      jobTitle:
        "Vedic Astrologer",

      description:
        "Radhey Shyam Sharma is a Vedic astrologer associated with Shree Nakshatralok Jyotish Sansthan in Muzaffarnagar, Uttar Pradesh, providing traditional astrological consultation and guidance.",

      worksFor: {
        "@id": `${siteUrl}/#business`,
      },

      knowsAbout: [
        "Vedic Astrology",
        "Janam Kundali",
        "Kundali Milan",
        "Vivah Matching",
        "Marriage Astrology",
        "Career Astrology",
        "Education Astrology",
        "Family Astrology",
        "Business Astrology",
        "Vastu",
        "Gemstone Consultation",
        "Tarot Reading",
        "Medical Astrology",
      ],
    },

    /* ================= SERVICES ================= */

    {
      "@type": "Service",

      "@id": `${siteUrl}/#astrology-consultation`,

      name:
        "Vedic Astrology Consultation",

      provider: {
        "@id": `${siteUrl}/#business`,
      },

      serviceType:
        "Vedic Astrology Consultation",

      description:
        "Personalized Vedic astrology consultation including birth chart analysis, Kundali Milan, Vivah Matching, career guidance, Vastu, gemstones, Tarot and Medical Astrology.",

      areaServed: [
        {
          "@type": "City",
          name: "Muzaffarnagar",
        },
        {
          "@type": "Country",
          name: "India",
        },
        {
          "@type": "Place",
          name: "Worldwide",
        },
      ],

      availableChannel: [
        {
          "@type": "ServiceChannel",

          serviceType:
            "Online Consultation",

          availableLanguage: [
            "English",
            "Hindi",
          ],
        },

        {
          "@type": "ServiceChannel",

          serviceType:
            "Offline Consultation",

          serviceLocation: {
            "@type": "Place",

            name:
              "Shree Nakshatralok Jyotish Sansthan",

            address: {
              "@type": "PostalAddress",

              streetAddress:
                "Shanti Nagar",

              addressLocality:
                "Muzaffarnagar",

              addressRegion:
                "Uttar Pradesh",

              postalCode:
                "251002",

              addressCountry:
                "IN",
            },
          },

          availableLanguage: [
            "English",
            "Hindi",
          ],
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        {children}
      </body>
    </html>
  );
}