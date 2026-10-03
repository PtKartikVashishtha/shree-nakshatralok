import { prisma } from "@/lib/prisma";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import BlogListPublic, { PublicBlogPost } from "@/components/blog/BlogListPublic";
import type { Metadata } from "next";

const siteUrl = "https://shree-nakshatralok.vercel.app";

export const metadata: Metadata = {
  title: "Vedic Astrology & Ayurveda Articles | Shree Nakshatralok",
  description:
    "Explore traditional Vedic wisdom, astrological insights, Kundali analysis, Ayurvedic lifestyle principles, and daily spiritual knowledge curated by Pt. Radhey Shyam Sharma.",
  keywords: [
    "Astrology Blog",
    "Vedic Astrology Articles",
    "Ayurveda Articles",
    "Jyotish Wisdom",
    "Kundali Milan Guide",
    "Graha Shanti",
    "Panchang Knowledge",
    "Muhurat Articles",
    "Shree Nakshatralok Blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Vedic Astrology & Ayurveda Articles | Shree Nakshatralok",
    description:
      "Explore traditional Vedic wisdom, astrological insights, Kundali analysis, and spiritual knowledge.",
    url: `${siteUrl}/blog`,
    type: "website",
    siteName: "Shree Nakshatralok Jyotish Sansthan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shree Nakshatralok Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Astrology & Ayurveda Articles | Shree Nakshatralok",
    description:
      "Explore traditional Vedic wisdom, astrological insights, Kundali analysis, and spiritual knowledge.",
    images: ["/og-image.jpg"],
  },
};

export default async function BlogIndexPage() {
  // Fetch only published blog posts
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  const categoriesSet = new Set<string>();
  categoriesSet.add("All");

  const formattedPosts: PublicBlogPost[] = posts.map((p) => {
    if (p.category) {
      categoriesSet.add(p.category);
    }

    const wordCount = p.content
      ? p.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length
      : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      featuredImage: p.featuredImage,
      author: p.author,
      publishedAt: p.publishedAt ? p.publishedAt.toISOString() : p.createdAt.toISOString(),
      createdAt: p.createdAt.toISOString(),
      readingTime,
    };
  });

  const categories = Array.from(categoriesSet);

  // Structured Data / JSON-LD for Blog
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Shree Nakshatralok Vedic Astrology & Ayurveda Blog",
    description:
      "Traditional Vedic wisdom, astrological guidance, and Ayurvedic knowledge from Shree Nakshatralok Jyotish Sansthan.",
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Shree Nakshatralok Jyotish Sansthan",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
    blogPost: formattedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author,
      },
      image: post.featuredImage ? `${siteUrl}${post.featuredImage}` : `${siteUrl}/og-image.jpg`,
    })),
  };

  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <PublicHeader activePage="blog" />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#300604] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute -right-12 -top-20 h-80 w-80 rounded-full border border-[#d7ad63]" />
          <div className="absolute left-[-10rem] bottom-[-16rem] h-[32rem] w-[32rem] rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#d7ad63]">
              ॥ श्री गणेशाय नमः ॥ · ज्ञान एवं मार्गदर्शन
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-[#f5dfad] sm:text-5xl md:text-6xl">
              वैदिक ज्ञान एवं
              <br />
              <em>ज्योतिषीय लेख</em>
            </h1>
            <p className="mt-5 text-base leading-8 text-[#d8c8b8] md:text-lg max-w-2xl">
              वैदिक ज्योतिष, जन्म कुंडली विश्लेषण, ग्रह गोचर, आयुर्वेद एवं आध्यात्मिक जीवन पर आधारित प्रामाणिक लेख व विद्वानों का शास्त्रीय मार्गदर्शन।
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLES CONTAINER */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <BlogListPublic posts={formattedPosts} categories={categories} />
      </section>

      <PublicFooter />
    </main>
  );
}
