import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import ShareButtons from "@/components/blog/ShareButtons";
import { sanitizeHtml } from "@/lib/sanitize";
import { formatHindiDate } from "@/lib/date";
import type { Metadata } from "next";

const siteUrl = "https://shree-nakshatralok.vercel.app";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "PUBLISHED") {
    return {
      title: "Article Not Found | Shree Nakshatralok",
      robots: { index: false, follow: false },
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const canonical = post.canonicalUrl || `/blog/${post.slug}`;
  const imageUrl = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `${siteUrl}${post.featuredImage}`
    : `${siteUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: post.seoKeywords
      ? post.seoKeywords.split(",").map((k) => k.trim())
      : [post.category, "Vedic Astrology", "Shree Nakshatralok"],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author],
      siteName: "Shree Nakshatralok Jyotish Sansthan",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const wordCount = post.content
    ? post.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: post.id },
    },
    orderBy: [
      { category: post.category ? "asc" : "desc" },
      { publishedAt: "desc" },
    ],
    take: 3,
  });

  const imageUrl = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : `${siteUrl}${post.featuredImage}`
    : `${siteUrl}/og-image.jpg`;

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.slug}`,
    image: imageUrl,
    datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Vedic Astrologer",
      worksFor: {
        "@type": "Organization",
        name: "Shree Nakshatralok Jyotish Sansthan",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Shree Nakshatralok Jyotish Sansthan",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-[#f7f0e5] text-[#291412]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <PublicHeader activePage="blog" />

      {/* ARTICLE HEADER HERO */}
      <section className="relative overflow-hidden bg-[#300604] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#d7ad63]" />
          <div className="absolute -right-12 -top-20 h-80 w-80 rounded-full border border-[#d7ad63]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-xs text-[#a99683]">
            <Link href="/" className="hover:text-white transition">
              मुख्य पृष्ठ
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition">
              ज्योतिष लेख
            </Link>
            <span>/</span>
            <span className="text-[#f2d99d] truncate max-w-xs">{post.category}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded bg-[#f3ead9]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#e5c67d] border border-[#d7ad63]/30">
              {post.category}
            </span>
            <span className="text-xs text-[#d8c8b8]" suppressHydrationWarning>
              {formatHindiDate(post.publishedAt)}
            </span>
            <span className="text-xs text-[#d8c8b8]">·</span>
            <span className="text-xs text-[#d8c8b8]">{readingTime} मिनट स्वाध्याय</span>
          </div>

          <h1 className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-[#f5dfad]">
            {post.title}
          </h1>

          <p className="mt-6 font-serif text-base leading-8 text-[#d8c8b8] md:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-3.5 border-t border-[#4d100c] pt-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7ad63]/50 bg-[#420b08] text-base font-serif text-[#f2d99d]">
              ✦
            </div>
            <div>
              <p className="text-sm font-semibold text-[#f5dfad]">{post.author}</p>
              <p className="text-xs text-[#a99683]">वरिष्ठ वैदिक ज्योतिषाचार्य · श्री नक्षत्रलोक संस्थान</p>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
        {/* FEATURED IMAGE WITH PROPER 16:9 RATIO */}
        {post.featuredImage && (
          <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#ded1be] shadow-sm">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* SANITIZED ARTICLE CONTENT */}
        <article className="prose prose-lg max-w-none text-[#33221d]">
          <div
            className="space-y-6 font-serif text-base sm:text-lg leading-8 text-[#53433b] [&>h2]:font-serif [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-medium [&>h2]:text-[#57120d] [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:font-serif [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:text-[#57120d] [&>h3]:mt-8 [&>h3]:mb-3 [&>blockquote]:border-l-4 [&>blockquote]:border-[#b78a40] [&>blockquote]:bg-[#faf5eb] [&>blockquote]:p-4 [&>blockquote]:rounded-r-lg [&>blockquote]:font-serif [&>blockquote]:italic [&>blockquote]:text-[#5c4a40] [&>blockquote]:my-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>p]:leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(post.content),
            }}
          />
        </article>

        {/* SHARE BAR */}
        <div className="mt-14 border-t border-b border-[#ddcfbb] py-6">
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        {/* ASTROLOGER BIO CARD */}
        <div className="mt-12 rounded-2xl border border-[#d8cbb8] bg-[#fffdf9] p-8 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#5c130d] font-serif text-2xl text-[#f2d99d] shadow-sm">
              ✦
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                ज्योतिषाचार्य परिचय · ABOUT THE AUTHOR
              </p>
              <h3 className="font-serif text-2xl text-[#57120d]">
                {post.author}
              </h3>
              <p className="font-serif text-sm leading-6 text-[#736157]">
                श्री नक्षत्रलोक ज्योतिष संस्थान के वरिष्ठ ज्योतिषाचार्य। ५५ से अधिक वर्षों की अनवरत वैदिक साधना के साथ महर्षि पाराशर एवं जैमिनी पद्धति द्वारा जन्म कुंडली, ग्रह दोष एवं आयुर्वेद परामर्श में सिद्धहस्त।
              </p>
            </div>
          </div>
        </div>

        {/* CONSULTATION CTA BOX */}
        <div className="mt-12 rounded-2xl bg-[#300604] p-8 md:p-12 text-white text-center shadow-md">
          <p className="text-xs font-bold uppercase tracking-[3px] text-[#d7ad63]">
            ॥ व्यक्तिगत वैदिक परामर्श ॥
          </p>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl text-[#f3dca8]">
            अपनी जन्म कुंडली एवं जीवन के प्रश्नों पर मार्गदर्शन प्राप्त करें
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#d4c3b5]">
            विवाह, करियर, व्यापार, स्वास्थ्य अथवा ग्रह दोष से जुड़ी किसी भी समस्या के समाधान हेतु पंडित राधे श्याम शर्मा जी से प्रत्यक्ष अथवा फोन पर परामर्श लें।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#contact"
              className="rounded-lg bg-[#d2a75c] px-8 py-3.5 text-xs font-bold text-[#300604] transition hover:bg-[#e1bd78]"
            >
              परामर्श हेतु अनुरोध करें →
            </a>
            <Link
              href="/blog"
              className="rounded-lg border border-[#d7ad63]/40 px-7 py-3.5 text-xs font-semibold text-[#f2d99d] transition hover:bg-white/10"
            >
              अन्य लेख पढ़ें
            </Link>
          </div>
        </div>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between border-b border-[#ddcfbb] pb-3">
              <h3 className="font-serif text-2xl text-[#57120d]">
                संबंधित अन्य लेख
              </h3>
              <Link
                href="/blog"
                className="text-xs font-semibold text-[#8b2418] hover:underline"
              >
                सभी लेख देखें →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-[#ded1be] bg-[#fffdf9] p-5 shadow-sm transition hover:shadow-md"
                >
                  <span className="rounded bg-[#f3ead9] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9c712d]">
                    {item.category}
                  </span>
                  <h4 className="mt-3 font-serif text-lg font-medium leading-snug text-[#57120d] hover:text-[#8b2418] transition line-clamp-2">
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h4>
                  <p className="mt-2 font-serif text-xs leading-5 text-[#6d5b51] line-clamp-2">
                    {item.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <PublicFooter />
    </main>
  );
}
