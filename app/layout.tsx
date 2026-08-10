import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shree Nakshatralok Jyotish Sansthan",
    template: "%s | Shree Nakshatralok",
  },

  description:
    "Shree Nakshatralok Jyotish Sansthan — Vedic astrology consultation, Janam Kundali, Kundali Milan, Vastu, Tarot and spiritual guidance.",

  keywords: [
    "Shree Nakshatralok",
    "Jyotish",
    "Astrology",
    "Vedic Astrology",
    "Janam Kundali",
    "Kundali Milan",
    "Vastu",
    "Tarot",
    "Astrologer",
  ],

  authors: [
    {
      name: "Shree Nakshatralok Jyotish Sansthan",
    },
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Shree Nakshatralok Jyotish Sansthan",
    description:
      "Vedic astrology consultation, Janam Kundali, Kundali Milan, Vastu, Tarot and spiritual guidance.",
    type: "website",
    locale: "en_IN",
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
      className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}