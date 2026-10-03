"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export type BlogItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string | null;
};

type Props = {
  initialPosts: BlogItem[];
};

export default function BlogListClient({ initialPosts }: Props) {
  const [posts, setPosts] = useState<BlogItem[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  // Filtered posts
  const filtered = useMemo(() => {
    return posts.filter((item) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.slug.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [posts, search, selectedCategory, statusFilter]);

  // Stats
  const publishedCount = posts.filter((p) => p.status === "PUBLISHED").length;
  const draftCount = posts.filter((p) => p.status === "DRAFT").length;

  // Toggle publish status
  const toggleStatus = async (id: string, currentStatus: "DRAFT" | "PUBLISHED") => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setTogglingId(id);

    try {
      const res = await fetch(`/api/admin/blog/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to update status");
      }

      setPosts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: nextStatus } : item
        )
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error updating status");
    } finally {
      setTogglingId(null);
    }
  };

  // Delete article
  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${title}"?`
    );
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to delete article");
      }

      setPosts((prev) => prev.filter((item) => item.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error deleting article");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a27a3a]">
            Total Articles
          </p>
          <p className="mt-3 font-serif text-4xl text-[#57120d]">
            {posts.length}
          </p>
          <p className="mt-3 text-xs text-[#927f73]">All blog content records</p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50/50 p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-green-700">
            Published Live
          </p>
          <p className="mt-3 font-serif text-4xl text-green-700">
            {publishedCount}
          </p>
          <p className="mt-3 text-xs text-green-800/70">Visible to public & search engines</p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-amber-700">
            Drafts
          </p>
          <p className="mt-3 font-serif text-4xl text-amber-700">
            {draftCount}
          </p>
          <p className="mt-3 text-xs text-amber-800/70">Unpublished / Work in progress</p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-5 shadow-sm space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, category, or slug..."
              className="w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] py-3 px-4 text-sm text-[#3b2520] outline-none placeholder:text-[#aa9a8e] focus:border-[#b78a40] focus:bg-white"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-3 text-xs text-[#806d60] hover:text-[#57120d]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] px-4 py-3 text-xs font-semibold text-[#57120d] outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | "DRAFT" | "PUBLISHED")
              }
              className="rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] px-4 py-3 text-xs font-semibold text-[#57120d] outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>

            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5c130d] px-5 py-3 text-xs font-bold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition"
            >
              <span>+</span>
              <span>New Article</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ARTICLE LIST */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#d8c9b5] bg-[#fffdf8] px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b976] bg-[#f8efdf] text-2xl text-[#ad7e2d]">
            ✦
          </div>
          <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
            {search ? "No matching articles found" : "No blog articles yet"}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8c796c]">
            {search
              ? "Try adjusting your search or category filters."
              : "Create your first Jyotish or Ayurveda article to share Vedic wisdom."}
          </p>
          <div className="mt-6">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5c130d] px-6 py-3 text-xs font-bold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition"
            >
              + Create First Article
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f3ead9] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9c712d]">
                      {item.category}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        item.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>

                    <span className="text-[11px] text-[#958275]">
                      {item.status === "PUBLISHED" && item.publishedAt
                        ? `Published ${new Date(item.publishedAt).toLocaleDateString("en-IN")}`
                        : `Created ${new Date(item.createdAt).toLocaleDateString("en-IN")}`}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#57120d]">
                    <Link
                      href={`/admin/blog/${item.id}/edit`}
                      className="hover:underline"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-xs font-mono text-[#8a776c]">
                    /blog/{item.slug}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                  {item.status === "PUBLISHED" && (
                    <Link
                      href={`/blog/${item.slug}`}
                      target="_blank"
                      className="rounded-xl border border-[#ded0bd] bg-[#fcf8f0] px-3.5 py-2 text-xs font-semibold text-[#6e5d54] hover:bg-[#f6eee2] transition"
                    >
                      View ↗
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleStatus(item.id, item.status)}
                    disabled={togglingId === item.id}
                    className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                      item.status === "PUBLISHED"
                        ? "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                        : "border-green-300 bg-green-50 text-green-800 hover:bg-green-100"
                    }`}
                  >
                    {togglingId === item.id
                      ? "Updating..."
                      : item.status === "PUBLISHED"
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <Link
                    href={`/admin/blog/${item.id}/edit`}
                    className="rounded-xl border border-[#d8cbb8] bg-[#fffdf8] px-3.5 py-2 text-xs font-semibold text-[#57120d] hover:bg-[#faf5eb] transition"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    disabled={deletingId === item.id}
                    className="rounded-xl border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 transition disabled:opacity-50"
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
