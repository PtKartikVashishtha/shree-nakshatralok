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
  All: "सभी लेख",
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
      {/* FILTER & SEARCH */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-[#ddcfbb] pb-8">
        {/* CATEGORY PILLS */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider transition ${
                selectedCat === cat
                  ? "bg-[#5c130d] text-[#f2d99d] shadow-sm"
                  : "border border-[#ded1be] bg-[#fffdf8] text-[#6d5b51] hover:bg-[#faf5ec]"
              }`}
            >
              {CATEGORY_NAMES_HINDI[cat] || cat}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="लेख खोजें... (Search articles)"
            className="w-full rounded-full border border-[#ded1be] bg-[#fffdf8] py-2.5 pl-4 pr-10 text-xs text-[#3b2520] outline-none placeholder:text-[#aa9a8e] focus:border-[#b78a40]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-2.5 text-xs text-[#8c796c] hover:text-[#57120d]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#d8c9b5] bg-[#fffdf8] px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b976] bg-[#f8efdf] text-2xl text-[#ad7e2d]">
            📜
          </div>
          <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
            कोई लेख नहीं मिला
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#8c796c] leading-relaxed">
            {search
              ? `आपके खोज शब्द "${search}" से मेल खाता कोई लेख नहीं मिला। कृपया अन्य शब्द खोजें अथवा सभी लेख देखें।`
              : "इस श्रेणी में अभी कोई लेख प्रकाशित नहीं हुआ है।"}
          </p>
          {(search || selectedCat !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCat("All");
              }}
              className="mt-6 inline-flex rounded-full bg-[#5c130d] px-6 py-2.5 text-xs font-semibold text-[#f2d99d]"
            >
              सभी लेख देखें
            </button>
          )}
        </div>
      ) : (
        <>
          {/* FEATURED / LATEST ARTICLE HERO CARD */}
          {featuredPost && (
            <article className="overflow-hidden rounded-3xl border border-[#ded1be] bg-[#fffdf8] shadow-sm transition hover:shadow-lg">
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[300px] bg-[#300604] overflow-hidden">
                  {featuredPost.featuredImage ? (
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#300604] to-[#4d100c] p-8 text-center">
                      <div className="space-y-2">
                        <span className="text-4xl text-[#d7ad63]">✦</span>
                        <p className="font-serif text-xl text-[#f2d99d]">
                          {CATEGORY_NAMES_HINDI[featuredPost.category] || featuredPost.category}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between p-8 md:p-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#f3ead9] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9c712d]">
                        {CATEGORY_NAMES_HINDI[featuredPost.category] || featuredPost.category}
                      </span>
                      <span className="text-xs text-[#958275]" suppressHydrationWarning>
                        {formatHindiDate(featuredPost.publishedAt)}
                      </span>
                      <span className="text-xs text-[#958275]">·</span>
                      <span className="text-xs text-[#958275]">
                        {featuredPost.readingTime} मिनट पठन
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-[#57120d] hover:text-[#8a2217] transition">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-sm leading-7 text-[#6d5b51] line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#ebdcca] pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5c130d] text-xs font-serif text-[#f2d99d]">
                        ✦
                      </div>
                      <p className="text-xs font-semibold text-[#57120d]">
                        {featuredPost.author}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b2418] hover:translate-x-1 transition"
                    >
                      <span>पूरा लेख पढ़ें</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* GRID OF OTHER ARTICLES */}
          {remainingPosts.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[#ded1be] bg-[#fffdf8] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <div className="relative h-48 w-full bg-[#300604] overflow-hidden">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover transition duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#300604] to-[#4d100c] text-[#d7ad63]">
                          <span className="text-3xl">✦</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-[#958275]">
                        <span className="rounded-full bg-[#f3ead9] px-3 py-1 font-bold uppercase tracking-wider text-[#9c712d]">
                          {CATEGORY_NAMES_HINDI[post.category] || post.category}
                        </span>
                        <span>{post.readingTime} मिनट पठन</span>
                      </div>

                      <h3 className="font-serif text-xl font-medium leading-snug text-[#57120d] hover:text-[#8a2217] transition line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-xs leading-6 text-[#6d5b51] line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#ebdcca] p-6 pt-4 flex items-center justify-between text-xs">
                    <span className="text-[#958275]" suppressHydrationWarning>
                      {formatHindiDate(post.publishedAt)}
                    </span>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-bold text-[#8b2418] hover:underline"
                    >
                      पूरा लेख पढ़ें →
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
