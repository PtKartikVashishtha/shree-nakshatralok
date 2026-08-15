import type { MetadataRoute } from "next";

const siteUrl = "https://shree-nakshatralok.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
      ],
    },

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}