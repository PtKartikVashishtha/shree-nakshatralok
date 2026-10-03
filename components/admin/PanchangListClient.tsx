"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export type PanchangListItem = {
  id: string;
  date: string;
  dayName: string;
  location: string;
  sunrise: string;
  sunset: string;
  tithi: string;
  nakshatra: string;
  paksha: string;
  festivals?: string | null;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
};

type Props = {
  initialEntries: PanchangListItem[];
};

export default function PanchangListClient({ initialEntries }: Props) {
  const [entries, setEntries] = useState<PanchangListItem[]>(initialEntries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Today's date YYYY-MM-DD
  const todayStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  const hasToday = useMemo(() => {
    return entries.some((e) => e.date === todayStr && e.status === "PUBLISHED");
  }, [entries, todayStr]);

  const filtered = useMemo(() => {
    return entries.filter((item) => {
      const matchesSearch =
        !search ||
        item.date.includes(search) ||
        item.dayName.toLowerCase().includes(search.toLowerCase()) ||
        item.tithi.toLowerCase().includes(search.toLowerCase()) ||
        item.nakshatra.toLowerCase().includes(search.toLowerCase()) ||
        (item.festivals && item.festivals.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [entries, search, statusFilter]);

  const toggleStatus = async (id: string, currentStatus: "DRAFT" | "PUBLISHED") => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setTogglingId(id);

    try {
      const res = await fetch(`/api/admin/panchang/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to update status");
      }

      setEntries((prev) =>
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

  const handleDelete = async (id: string, date: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Panchang for ${date}?`
    );
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/panchang/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to delete Panchang record");
      }

      setEntries((prev) => prev.filter((item) => item.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error deleting entry");
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
            Total Entries
          </p>
          <p className="mt-3 font-serif text-4xl text-[#57120d]">
            {entries.length}
          </p>
          <p className="mt-3 text-xs text-[#927f73]">Daily calendar records</p>
        </div>

        <div
          className={`rounded-2xl border p-6 shadow-sm ${
            hasToday
              ? "border-green-200 bg-green-50/50"
              : "border-amber-200 bg-amber-50/50"
          }`}
        >
          <p
            className={`text-[10px] font-bold uppercase tracking-[2px] ${
              hasToday ? "text-green-700" : "text-amber-700"
            }`}
          >
            Today's Panchang ({todayStr})
          </p>
          <p
            className={`mt-3 font-serif text-3xl font-medium ${
              hasToday ? "text-green-700" : "text-amber-700"
            }`}
          >
            {hasToday ? "✓ Active & Live" : "⚠️ Needs Publishing"}
          </p>
          <p className="mt-3 text-xs text-[#806d66]">
            {hasToday
              ? "Visitors see today's Panchang on public page"
              : "Publish today's Panchang for your visitors"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a27a3a]">
            Published Live
          </p>
          <p className="mt-3 font-serif text-4xl text-[#57120d]">
            {entries.filter((e) => e.status === "PUBLISHED").length}
          </p>
          <p className="mt-3 text-xs text-[#927f73]">Available to visitors</p>
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
              placeholder="Search by date (YYYY-MM-DD), tithi, nakshatra, or festival..."
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
              href="/admin/panchang/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5c130d] px-5 py-3 text-xs font-bold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition"
            >
              <span>+</span>
              <span>Create Panchang</span>
            </Link>
          </div>
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#d8c9b5] bg-[#fffdf8] px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b976] bg-[#f8efdf] text-2xl text-[#ad7e2d]">
            ☉
          </div>
          <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
            {search ? "No matching Panchang records found" : "No Panchang entries yet"}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8c796c]">
            {search
              ? "Try adjusting your date or keyword search."
              : "Publish your first daily Panchang entry for today or upcoming dates."}
          </p>
          <div className="mt-6">
            <Link
              href="/admin/panchang/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5c130d] px-6 py-3 text-xs font-bold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition"
            >
              + Create Today's Panchang
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isToday = item.date === todayStr;
            return (
              <article
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-[#fffdf8] p-6 shadow-sm transition hover:shadow-md ${
                  isToday ? "border-[#b78a40] ring-2 ring-[#e4c57d]/40" : "border-[#ded1be]"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-xl font-medium text-[#57120d]">
                        {item.date}
                      </span>
                      <span className="text-xs font-semibold text-[#8a7668]">
                        · {item.dayName}
                      </span>
                      {isToday && (
                        <span className="rounded-full bg-[#5c130d] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f2d99d]">
                          TODAY
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          item.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="grid gap-2 text-xs text-[#6e5d54] sm:grid-cols-3">
                      <div>
                        <strong className="text-[#a2742e]">Tithi:</strong> {item.tithi}
                      </div>
                      <div>
                        <strong className="text-[#a2742e]">Nakshatra:</strong> {item.nakshatra}
                      </div>
                      <div>
                        <strong className="text-[#a2742e]">Sun:</strong> 🌅 {item.sunrise} · 🌇 {item.sunset}
                      </div>
                    </div>

                    {item.festivals && (
                      <p className="text-xs text-[#57120d] font-medium">
                        🎉 <span className="underline decoration-[#d7ad63]">{item.festivals}</span>
                      </p>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                    {item.status === "PUBLISHED" && (
                      <Link
                        href={`/panchang?date=${item.date}`}
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
                      href={`/admin/panchang/${item.id}/edit`}
                      className="rounded-xl border border-[#d8cbb8] bg-[#fffdf8] px-3.5 py-2 text-xs font-semibold text-[#57120d] hover:bg-[#faf5eb] transition"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.date)}
                      disabled={deletingId === item.id}
                      className="rounded-xl border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 transition disabled:opacity-50"
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
