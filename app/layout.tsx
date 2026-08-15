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

const siteName = "Shree Nakshatralok Jyotish Sansthan";

const siteDescription =
  "Shree Nakshatralok Jyotish Sansthan provides traditional Vedic astrology consultations including Janam Kundali, Kundali Milan, Muhurat, Vastu, Gemstones, Numerology, Palmistry, Tarot and Medical Jyotish.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} | Vedic Astrology`,
    template: `%s | Shree Nakshatralok`,
  },

  description: siteDescription,

  applicationName: siteName,

  category: "Astrology",

  keywords: [
    "Shree Nakshatralok",
    "Shree Nakshatralok Jyotish Sansthan",
    "Vedic Astrology",
    "Jyotish",
    "Astrologer in Muzaffarnagar",
    "Vedic Astrologer in Muzaffarnagar",
    "Astrology in Muzaffarnagar",
    "Janam Kundali",
    "Janam Kundli",
    "Kundali Milan",
    "Marriage Matching",
    "Vivah Matching",
    "Muhurat",
    "Naamkaran",
    "Graha Dosh",
    "Vastu",
    "Gemstone Consultation",
    "Numerology",
    "Ank Jyotish",
    "Palmistry",
    "Hast Rekha",
    "Tarot Reading",
    "Career Astrology",
    "Education Astrology",
    "Medical Jyotish",
    "Medical Astrology",
    "Chikitsa Jyotish",
  ],

  authors: [
    {
      name: siteName,
    },
  ],

  creator: siteName,

  publisher: siteName,

  alternates: {
    canonical: "/",
  },

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
    google: "pERzjxk8Qjby2pR-AaIIGtJc7uPreDk3vDEkDDdLMMA",
  },

  icons: {
    icon: "/icon.svg",
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,

    title: `${siteName} | Vedic Astrology`,

    description:
      "Traditional Vedic astrology guidance including Janam Kundali, Kundali Milan, Muhurat, Vastu, Numerology, Palmistry, Tarot and other Jyotish consultations.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: `${siteName} | Vedic Astrology`,

    description:
      "Traditional Vedic astrology guidance from Shree Nakshatralok Jyotish Sansthan.",

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

      name: siteName,

      alternateName: "Shree Nakshatralok",

      inLanguage: ["en-IN", "hi-IN"],
    },

    /* ================= LOCAL BUSINESS ================= */

    {
      "@type": "LocalBusiness",

      "@id": `${siteUrl}/#business`,

      name: siteName,

      alternateName: "Shree Nakshatralok",

      url: `${siteUrl}/`,

      telephone: site.phone,

      image: [
        `${siteUrl}/astrologer/radhey-shyam-01.jpg`,
        `${siteUrl}/astrologer/radhey-shyam-02.jpg`,
        `${siteUrl}/astrologer/radhey-shyam-03.jpg`,
        `${siteUrl}/astrologer/radhey-shyam-04.jpg`,
      ],

      logo: `${siteUrl}/icon.svg`,

      description: siteDescription,

      address: {
        "@type": "PostalAddress",

        streetAddress: "Shanti Nagar",

        addressLocality: "Muzaffarnagar",

        addressRegion: "Uttar Pradesh",

        postalCode: "251002",

        addressCountry: "IN",
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
        "Muhurat",
        "Naamkaran",
        "Graha Dosh",
        "Career Astrology",
        "Education Astrology",
        "Business Astrology",
        "Vastu",
        "Gemstone Consultation",
        "Numerology",
        "Palmistry",
        "Tarot Reading",
        "Medical Jyotish",
      ],
    },

    /* ================= ASTROLOGER ================= */

    {
      "@type": "Person",

      "@id": `${siteUrl}/#astrologer`,

      name: "Radhey Shyam Sharma",

      alternateName: "राधे श्याम शर्मा",

      image: `${siteUrl}/astrologer/radhey-shyam-01.jpg`,

      jobTitle: "Vedic Astrologer",

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
        "Muhurat",
        "Naamkaran",
        "Career Astrology",
        "Education Astrology",
        "Family Astrology",
        "Business Astrology",
        "Vastu",
        "Gemstone Consultation",
        "Numerology",
        "Palmistry",
        "Tarot Reading",
        "Medical Jyotish",
      ],
    },

    /* ================= MAIN SERVICE ================= */

    {
      "@type": "Service",

      "@id": `${siteUrl}/#astrology-consultation`,

      name: "Vedic Astrology Consultation",

      provider: {
        "@id": `${siteUrl}/#business`,
      },

      serviceType: "Vedic Astrology Consultation",

      description:
        "Traditional Vedic astrology consultation including birth chart analysis, Kundali Milan, Vivah Matching, Muhurat, career guidance, Vastu, gemstones, Numerology, Palmistry, Tarot and Medical Jyotish.",

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

          serviceType: "Online Consultation",

          availableLanguage: ["English", "Hindi"],
        },

        {
          "@type": "ServiceChannel",

          serviceType: "Offline Consultation",

          serviceLocation: {
            "@type": "Place",

            name: siteName,

            address: {
              "@type": "PostalAddress",

              streetAddress: "Shanti Nagar",

              addressLocality: "Muzaffarnagar",

              addressRegion: "Uttar Pradesh",

              postalCode: "251002",

              addressCountry: "IN",
            },
          },

          availableLanguage: ["English", "Hindi"],
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