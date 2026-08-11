import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Cinzel,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://shree-nakshatralok.vercel.app"
  ),

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
    "Janam Kundali",
    "Kundali Milan",
    "Marriage Matching",
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
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shree-nakshatralok.vercel.app",
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
        {children}
      </body>
    </html>
  );
}