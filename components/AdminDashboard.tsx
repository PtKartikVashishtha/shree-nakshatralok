"use client";

import { useMemo, useState } from "react";

type SubmissionStatus =
  | "NEW"
  | "CONTACTED"
  | "COMPLETED";

type SubmissionType =
  | "GENERAL"
  | "KUNDALI_MILAN";

type Submission = {
  id: string;

  type?: SubmissionType;

  name?: string;
  dob?: string;
  birthTime?: string;
  address?: string;
  question?: string;

  person1Name?: string;
  person1Dob?: string;
  person1BirthTime?: string;
  person1BirthPlace?: string;

  person2Name?: string;
  person2Dob?: string;
  person2BirthTime?: string;
  person2BirthPlace?: string;

  status: SubmissionStatus;
  createdAt: string;
};

type Props = {
  submissions: Submission[];
};

export default function AdminDashboard({
  submissions: initialSubmissions,
}: Props) {
  const [submissions, setSubmissions] = useState(
    initialSubmissions
  );

  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(
    null
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return submissions;

    return submissions.filter((item) =>
      [
        item.type,
        item.name,
        item.dob,
        item.birthTime,
        item.address,
        item.question,

        item.person1Name,
        item.person1Dob,
        item.person1BirthTime,
        item.person1BirthPlace,

        item.person2Name,
        item.person2Dob,
        item.person2BirthTime,
        item.person2BirthPlace,

        item.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, submissions]);

  const today = new Date();

  const todayCount = submissions.filter((item) => {
    const date = new Date(item.createdAt);

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }).length;

  const weekStart = new Date(today);

  weekStart.setDate(
    today.getDate() - today.getDay()
  );

  weekStart.setHours(0, 0, 0, 0);

  const weekCount = submissions.filter((item) => {
    return new Date(item.createdAt) >= weekStart;
  }).length;

  const newCount = submissions.filter(
    (item) => item.status === "NEW"
  ).length;

  const completedCount = submissions.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  async function deleteSubmission(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this consultation request?"
    );

    if (!confirmed) return;

    setDeleting(id);

    try {
      const res = await fetch(
        `/api/admin/submissions/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error ||
            "Unable to delete submission."
        );
      }

      setSubmissions((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setDeleting(null);
    }
  }

  async function updateStatus(
    id: string,
    status: SubmissionStatus
  ) {
    try {
      const res = await fetch(
        `/api/admin/submissions/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error ||
            "Unable to update status."
        );
      }

      setSubmissions((current) =>
        current.map((item) =>
          item.id === id
            ? { ...item, status }
            : item
        )
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  return (
    <div>

      {/* ================= STATS ================= */}

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">

        {/* TOTAL */}

        <div className="group relative overflow-hidden rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#d7b26b]/20" />

          <div className="relative flex items-start justify-between">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a27a3a]">
                Total Requests
              </p>

              <p className="mt-3 font-serif text-4xl text-[#57120d]">
                {submissions.length}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4ead8] text-lg text-[#a2742e]">
              ✦
            </div>

          </div>

          <p className="mt-4 text-xs text-[#927f73]">
            All consultation enquiries
          </p>

        </div>


        {/* TODAY */}

        <div className="group relative overflow-hidden rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#d7b26b]/20" />

          <div className="relative flex items-start justify-between">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a27a3a]">
                Today
              </p>

              <p className="mt-3 font-serif text-4xl text-[#57120d]">
                {todayCount}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4ead8] text-lg text-[#a2742e]">
              ◷
            </div>

          </div>

          <p className="mt-4 text-xs text-[#927f73]">
            Requests received today
          </p>

        </div>


        {/* THIS WEEK */}

        <div className="group relative overflow-hidden rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#d7b26b]/20" />

          <div className="relative flex items-start justify-between">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a27a3a]">
                This Week
              </p>

              <p className="mt-3 font-serif text-4xl text-[#57120d]">
                {weekCount}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4ead8] text-lg text-[#a2742e]">
              ◌
            </div>

          </div>

          <p className="mt-4 text-xs text-[#927f73]">
            Requests since Sunday
          </p>

        </div>


        {/* NEW */}

        <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="relative">

            <p className="text-[10px] font-bold uppercase tracking-[2px] text-amber-700">
              New
            </p>

            <p className="mt-3 font-serif text-4xl text-amber-700">
              {newCount}
            </p>

            <p className="mt-4 text-xs text-amber-800/70">
              Awaiting response
            </p>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="group relative overflow-hidden rounded-2xl border border-green-200 bg-green-50/50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="relative">

            <p className="text-[10px] font-bold uppercase tracking-[2px] text-green-700">
              Completed
            </p>

            <p className="mt-3 font-serif text-4xl text-green-700">
              {completedCount}
            </p>

            <p className="mt-4 text-xs text-green-800/70">
              Consultation handled
            </p>

          </div>

        </div>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="mt-8 rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-4 shadow-sm">

        <div className="flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">

            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a98d70]">
              ⌕
            </span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search name, DOB, address, question or status..."
              className="w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] py-3.5 pl-11 pr-4 text-sm text-[#3b2520] outline-none transition placeholder:text-[#aa9a8e] focus:border-[#b78a40] focus:bg-white focus:ring-4 focus:ring-[#c79a45]/10"
            />

          </div>

          {search && (
            <button
              onClick={() => setSearch("")}
              className="rounded-xl border border-[#ded0bd] px-5 py-3 text-xs font-semibold text-[#745f54] transition hover:bg-[#f6efe3]"
            >
              Clear
            </button>
          )}

        </div>

      </div>


      {/* ================= LIST HEADER ================= */}

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
            ENQUIRIES
          </p>

          <h2 className="mt-1 font-serif text-3xl text-[#57120d]">
            Consultation Requests
          </h2>

          <p className="mt-1 text-xs text-[#8c796c]">
            Showing {filtered.length} of{" "}
            {submissions.length}
          </p>

        </div>


        <a
          href="/api/admin/export"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5c130d] px-5 py-3 text-xs font-bold tracking-wide text-[#f2d99d] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#420b08] hover:shadow-md"
        >
          <span>↓</span>
          Export CSV
        </a>

      </div>


      {/* ================= EMPTY ================= */}

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-[#d8c9b5] bg-[#fffdf8] px-6 py-20 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b976] bg-[#f8efdf] text-2xl text-[#ad7e2d]">
            ✦
          </div>

          <h3 className="mt-5 font-serif text-2xl text-[#57120d]">
            {submissions.length === 0
              ? "No consultation requests yet"
              : "No matching requests"}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8c796c]">
            {submissions.length === 0
              ? "New consultation enquiries submitted through the website will appear here."
              : "Try another name, date, address, question or status."}
          </p>

        </div>
      )}


      {/* ================= SUBMISSIONS ================= */}

      <div className="mt-6 space-y-5">

        {filtered.map((item, index) => {

          const isKundali =
            item.type === "KUNDALI_MILAN";

          const displayName =
            isKundali
              ? `${item.person1Name || "Person 1"} & ${item.person2Name || "Person 2"}`
              : item.name || "Unnamed";

          const initial =
            displayName
              .charAt(0)
              .toUpperCase();

          return (
            <article
              key={item.id}
              className={`overflow-hidden rounded-2xl border bg-[#fffdf8] shadow-sm transition hover:shadow-lg ${
                isKundali
                  ? "border-[#c9a15d]/70"
                  : "border-[#ded1be] hover:border-[#c9a15d]/60"
              }`}
            >

              {/* CARD HEADER */}

              <div className="flex flex-col gap-4 border-b border-[#e7dccd] bg-[#faf5eb] px-6 py-5 md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5b130d] font-serif text-lg text-[#e7c77d]">
                    {initial}
                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-serif text-2xl text-[#57120d]">
                        {displayName}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-[1px] ${
                          isKundali
                            ? "bg-[#ead6a7] text-[#704b0d]"
                            : "bg-[#eee5d7] text-[#735e51]"
                        }`}
                      >
                        {isKundali
                          ? "Kundali Milan"
                          : "General Consultation"}
                      </span>

                      {index === 0 && (
                        <span className="rounded-full bg-[#f0dfb9] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[1px] text-[#805819]">
                          Latest
                        </span>
                      )}

                    </div>

                    <p className="mt-1 text-[10px] text-[#958275]">
                      Received{" "}
                      {new Date(
                        item.createdAt
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="flex flex-wrap items-center gap-2">

                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(
                        item.id,
                        e.target.value as SubmissionStatus
                      )
                    }
                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold outline-none transition ${
                      item.status === "NEW"
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : item.status === "CONTACTED"
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-green-200 bg-green-50 text-green-700"
                    }`}
                  >

                    <option value="NEW">
                      New
                    </option>

                    <option value="CONTACTED">
                      Contacted
                    </option>

                    <option value="COMPLETED">
                      Completed
                    </option>

                  </select>

                  <button
                    onClick={() =>
                      deleteSubmission(item.id)
                    }
                    disabled={
                      deleting === item.id
                    }
                    className="rounded-xl border border-[#e5caca] px-4 py-2.5 text-xs font-semibold text-[#a03930] transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deleting === item.id
                      ? "Deleting..."
                      : "Delete Request"}
                  </button>

                </div>

              </div>


              {/* ================= KUNDALI MILAN ================= */}

              {isKundali ? (

                <div className="px-6 py-7">

                  <div className="grid gap-5 md:grid-cols-2">

                    {/* PERSON 1 */}

                    <div className="rounded-2xl border border-[#eadfcf] bg-[#fbf7ef] p-5">

                      <div className="mb-5 flex items-center justify-between">

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                            Person 1
                          </p>

                          <h4 className="mt-1 font-serif text-2xl text-[#57120d]">
                            {item.person1Name ||
                              "Not provided"}
                          </h4>

                        </div>

                        <span className="text-xl text-[#c49a50]">
                          01
                        </span>

                      </div>

                      <div className="space-y-4">

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                            Date of Birth
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#39251f]">
                            {item.person1Dob ||
                              "Not provided"}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                            Birth Time
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#39251f]">
                            {item.person1BirthTime ||
                              "Not provided"}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                            Birth Place
                          </p>

                          <p className="mt-1 text-sm leading-6 text-[#64524a]">
                            {item.person1BirthPlace ||
                              "Not provided"}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* PERSON 2 */}

                    <div className="rounded-2xl border border-[#eadfcf] bg-[#fbf7ef] p-5">

                      <div className="mb-5 flex items-center justify-between">

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                            Person 2
                          </p>

                          <h4 className="mt-1 font-serif text-2xl text-[#57120d]">
                            {item.person2Name ||
                              "Not provided"}
                          </h4>

                        </div>

                        <span className="text-xl text-[#c49a50]">
                          02
                        </span>

                      </div>

                      <div className="space-y-4">

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                            Date of Birth
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#39251f]">
                            {item.person2Dob ||
                              "Not provided"}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                            Birth Time
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#39251f]">
                            {item.person2BirthTime ||
                              "Not provided"}
                          </p>

                        </div>

                        <div>

                          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                            Birth Place
                          </p>

                          <p className="mt-1 text-sm leading-6 text-[#64524a]">
                            {item.person2BirthPlace ||
                              "Not provided"}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* QUESTION */}

                  {item.question && (
                    <div className="mt-6">

                      <div className="flex items-center justify-between">

                        <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                          Additional Question
                        </p>

                        <span className="text-[#c49a50]">
                          ✦
                        </span>

                      </div>

                      <div className="mt-3 rounded-xl border border-[#eadfcf] bg-[#fbf7ef] px-5 py-4">

                        <p className="whitespace-pre-wrap text-sm leading-7 text-[#56443d]">
                          {item.question}
                        </p>

                      </div>

                    </div>
                  )}

                </div>

              ) : (

                /* ================= GENERAL ================= */

                <div className="grid gap-7 px-6 py-7 md:grid-cols-2">

                  {/* DOB */}

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                      Date of Birth
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#39251f]">
                      {item.dob || "Not provided"}
                    </p>

                  </div>


                  {/* TIME */}

                  <div>

                    <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                      Birth Time
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#39251f]">
                      {item.birthTime ||
                        "Not provided"}
                    </p>

                  </div>


                  {/* ADDRESS */}

                  <div className="md:col-span-2">

                    <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                      Address
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#64524a]">
                      {item.address ||
                        "Not provided"}
                    </p>

                  </div>


                  {/* QUESTION */}

                  <div className="md:col-span-2">

                    <div className="flex items-center justify-between">

                      <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                        Question
                      </p>

                      <span className="text-[#c49a50]">
                        ✦
                      </span>

                    </div>

                    <div className="mt-3 rounded-xl border border-[#eadfcf] bg-[#fbf7ef] px-5 py-4">

                      <p className="whitespace-pre-wrap text-sm leading-7 text-[#56443d]">
                        {item.question ||
                          "Not provided"}
                      </p>

                    </div>

                  </div>

                </div>

              )}

            </article>
          );
        })}

      </div>

    </div>
  );
}