import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = "https://shree-nakshatralok.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Fetch only published blog posts for sitemap
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const publishedPosts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    });

    blogEntries = publishedPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching published posts for sitemap:", error);
  }

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/panchang`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogEntries,
  ];
}