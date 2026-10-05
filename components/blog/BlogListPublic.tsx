"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatHindiDate } from "@/lib/date";

export type PublicBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featuredImage: string | null;
  author: string;
  publishedAt: string | null;
  createdAt: string;
  readingTime: number;
};

type Props = {
  posts: PublicBlogPost[];
  categories: string[];
};

const CATEGORY_NAMES_HINDI: Record<string, string> = {
  All: "समस्त आलेख (All)",
  Jyotish: "वैदिक ज्योतिष",
  Ayurveda: "आयुर्वेद",
  Spirituality: "अध्यात्म",
  "Vedic Knowledge": "वैदिक ज्ञान",
  Panchang: "दैनिक पंचांग",
  Muhurat: "शुभ मुहूर्त",
  "Graha Dosh": "ग्रह दोष निवारण",
  Vastu: "वास्तु शास्त्र",
  General: "सामान्य",
};

export default function BlogListPublic({ posts, categories }: Props) {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = selectedCat === "All" || p.category === selectedCat;
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, selectedCat, search]);

  const featuredPost = filtered[0];
  const remainingPosts = filtered.slice(1);

  return (
    <div className="space-y-12">
      {/* 1. EDITORIAL FILTER & SEARCH TOOLBAR */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-[#ddcfbb] pb-8">
        {/* CATEGORY TABS */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wider transition ${
                  isActive
                    ? "bg-[#5c130d] text-[#f2d99d] shadow-sm"
                    : "border border-[#ded1be] bg-[#fffdf9] text-[#6d5b51] hover:bg-[#faf4e8]"
                }`}
              >
                {CATEGORY_NAMES_HINDI[cat] || cat}
              </button>
            );
          })}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="लेख खोजें... (Search articles)"
            className="w-full rounded-lg border border-[#ded1be] bg-[#fffdf9] py-2.5 pl-4 pr-10 text-xs text-[#3b2520] outline-none placeholder:text-[#aa9a8e] transition focus:border-[#b78a40]"
          />
          {search ? (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-2.5 text-xs text-[#8c796c] hover:text-[#57120d]"
              aria-label="खोज साफ़ करें"
            >
              ✕
            </button>
          ) : (
            <span className="absolute right-3.5 top-2.5 text-xs text-[#aa9a8e] pointer-events-none">
              🔍
            </span>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d8c9b5] bg-[#fffdf9] px-6 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b976] bg-[#f8efdf] text-xl text-[#ad7e2d]">
            ✦
          </div>
          <h3 className="mt-4 font-serif text-2xl text-[#57120d]">
            कोई लेख नहीं मिला
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#8c796c]">
            {search
              ? `आपके खोज शब्द "${search}" से मेल खाता कोई आलेख नहीं मिला। कृपया अन्य शब्द खोजें अथवा सभी लेख देखें।`
              : "इस श्रेणी में अभी कोई लेख प्रकाशित नहीं हुआ है।"}
          </p>
          {(search || selectedCat !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCat("All");
              }}
              className="mt-6 inline-flex rounded-lg bg-[#5c130d] px-6 py-2.5 text-xs font-semibold text-[#f2d99d] transition hover:bg-[#420b08]"
            >
              सभी लेख देखें
            </button>
          )}
        </div>
      ) : (
        <>
          {/* 2. FEATURED ARTICLE — EDITORIAL COVERAGE */}
          {featuredPost && (
            <article className="overflow-hidden rounded-2xl border border-[#ded1be] bg-[#fffdf9] shadow-sm transition hover:shadow-md">
              <div className="grid md:grid-cols-2">
                {/* 16:10 FEATURED MEDIA */}
                <div className="relative min-h-[300px] w-full bg-[#2a0503] overflow-hidden">
                  <Image
                    src={featuredPost.featuredImage || "/og-image.jpg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-103"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded bg-[#2a0503]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f5dfad] border border-[#d7ad63]/40 backdrop-blur-sm">
                      {CATEGORY_NAMES_HINDI[featuredPost.category] || featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* FEATURED COPY */}
                <div className="flex flex-col justify-between p-8 md:p-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-[#8c7465]">
                      <span suppressHydrationWarning>
                        {formatHindiDate(featuredPost.publishedAt)}
                      </span>
                      <span>·</span>
                      <span>{featuredPost.readingTime} मिनट स्वाध्याय</span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-snug text-[#57120d] hover:text-[#8a2217] transition">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="font-serif text-base leading-7 text-[#634f43] line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#ebdcca] pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5c130d] text-xs font-serif text-[#f2d99d]">
                        ✦
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#57120d]">
                          {featuredPost.author}
                        </p>
                        <p className="text-[10px] text-[#8c7465]">
                          वरिष्ठ वैदिक ज्योतिषाचार्य
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b2418] hover:translate-x-1 transition"
                    >
                      <span>सम्पूर्ण आलेख पढ़ें</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* 3. GRID OF REMAINING ARTICLES (CONSISTENT 16:10 RATIO) */}
          {remainingPosts.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#ded1be] bg-[#fffdf9] shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    {/* CONSISTENT 16:10 ASPECT RATIO CONTAINER */}
                    <div className="relative aspect-[16/10] w-full bg-[#2a0503] overflow-hidden">
                      <Image
                        src={post.featuredImage || "/og-image.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-400 hover:scale-104"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="rounded bg-[#2a0503]/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f5dfad] border border-[#d7ad63]/40 backdrop-blur-sm">
                          {CATEGORY_NAMES_HINDI[post.category] || post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-[#8c7465]">
                        <span suppressHydrationWarning>
                          {formatHindiDate(post.publishedAt)}
                        </span>
                        <span>{post.readingTime} मिनट स्वाध्याय</span>
                      </div>

                      <h3 className="font-serif text-xl font-medium leading-snug text-[#57120d] hover:text-[#8a2217] transition line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="font-serif text-sm leading-6 text-[#634f43] line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#ebdcca] p-6 pt-4 flex items-center justify-between text-xs">
                    <span className="text-[#8c7465]">
                      {post.author}
                    </span>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-bold text-[#8b2418] hover:underline"
                    >
                      आलेख पढ़ें →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
