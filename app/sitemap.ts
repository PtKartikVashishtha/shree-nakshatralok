import type { MetadataRoute } from "next";

const siteUrl = "https://shree-nakshatralok.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = [
    "vedic-astrology",
    "janam-kundli",
    "kundali-milan",
    "muhurat-namkaran",
    "graha-dosh",
    "vastu",
    "gemstone-consultation",
    "numerology",
    "palmistry",
    "tarot-reading",
    "medical-astrology",
  ];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...services.map((service) => ({
      url: `${siteUrl}/services/${service}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}