"use client";

import { useMemo, useState } from "react";

type SubmissionStatus =
  | "NEW"
  | "CONTACTED"
  | "COMPLETED";

type SubmissionType =
  | "GENERAL"
  | "KUNDALI_MILAN"
  | "JANAM_KUNDLI";

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
  const [submissions, setSubmissions] =
    useState(initialSubmissions);

  const [search, setSearch] = useState("");

  const [deleting, setDeleting] =
    useState<string | null>(null);

  const [activeSection, setActiveSection] =
    useState<SubmissionType>("KUNDALI_MILAN");

  // --------------------------------
  // SEARCH
  // --------------------------------

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

  // --------------------------------
  // SEPARATE REQUEST TYPES
  // --------------------------------

  const kundaliSubmissions =
    filtered.filter(
      (item) => item.type === "KUNDALI_MILAN"
    );

  const generalSubmissions =
    filtered.filter(
      (item) => item.type === "GENERAL"
    );

  const janamKundliSubmissions =
    filtered.filter(
      (item) => item.type === "JANAM_KUNDLI"
    );

  const activeSubmissions =
    activeSection === "KUNDALI_MILAN"
      ? kundaliSubmissions
      : activeSection === "JANAM_KUNDLI"
      ? janamKundliSubmissions
      : generalSubmissions;

  // --------------------------------
  // STATS
  // --------------------------------

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

  const weekCount = submissions.filter(
    (item) =>
      new Date(item.createdAt) >= weekStart
  ).length;

  const newCount = submissions.filter(
    (item) => item.status === "NEW"
  ).length;

  const completedCount = submissions.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  // --------------------------------
  // DELETE
  // --------------------------------

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
        current.filter(
          (item) => item.id !== id
        )
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

  // --------------------------------
  // STATUS
  // --------------------------------

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

  // --------------------------------
  // REQUEST CARD
  // --------------------------------

  function renderSubmission(
    item: Submission
  ) {
    const isKundali =
      item.type === "KUNDALI_MILAN";

    const isJanamKundli =
      item.type === "JANAM_KUNDLI";

    const displayName = isKundali
      ? `${item.person1Name || "Person 1"} & ${
          item.person2Name || "Person 2"
        }`
      : item.name || "Unnamed";

    const initial = displayName
      .charAt(0)
      .toUpperCase();

    return (
      <article
        key={item.id}
        className="overflow-hidden rounded-3xl border border-[#ded1be] bg-[#fffdf8] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        {/* HEADER */}

        <div className="flex flex-col gap-4 border-b border-[#e7dccd] bg-[#faf5eb] px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5b130d] font-serif text-lg text-[#e7c77d]">
              {initial}
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[#57120d]">
                {displayName}
              </h3>

              <p className="mt-1 text-[10px] text-[#958275]">
                Received{" "}
                {new Date(
                  item.createdAt
                ).toLocaleString("en-IN")}
              </p>
            </div>

          </div>

          <div className="flex flex-wrap items-center gap-2">

            <select
              value={item.status}
              onChange={(e) =>
                updateStatus(
                  item.id,
                  e.target.value as SubmissionStatus
                )
              }
              className={`rounded-xl border px-3 py-2.5 text-xs font-semibold outline-none ${
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
              disabled={deleting === item.id}
              className="rounded-xl border border-[#e5caca] px-4 py-2.5 text-xs font-semibold text-[#a03930] transition hover:bg-red-50 disabled:opacity-50"
            >
              {deleting === item.id
                ? "Deleting..."
                : "Delete"}
            </button>

          </div>
        </div>

        {/* ================= KUNDALI MILAN ================= */}

        {isKundali ? (
          <div className="px-6 py-7">

            <div className="mb-6 rounded-2xl border border-[#eadfcf] bg-[#fbf7ef] p-5">

              <div className="mb-4">
                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                  Requester Details
                </p>

                <h4 className="mt-1 font-serif text-2xl text-[#57120d]">
                  {item.name ||
                    "Name not provided"}
                </h4>
              </div>

              <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                Address
              </p>

              <p className="mt-2 text-sm leading-6 text-[#64524a]">
                {item.address ||
                  "Address not provided"}
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* PERSON 1 */}

              <div className="rounded-2xl border border-[#eadfcf] bg-[#fbf7ef] p-5">

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                  Person 1
                </p>

                <h4 className="mt-1 font-serif text-2xl text-[#57120d]">
                  {item.person1Name ||
                    "Not provided"}
                </h4>

                <div className="mt-5 space-y-4">

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

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                  Person 2
                </p>

                <h4 className="mt-1 font-serif text-2xl text-[#57120d]">
                  {item.person2Name ||
                    "Not provided"}
                </h4>

                <div className="mt-5 space-y-4">

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

            {item.question && (
              <div className="mt-6">

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                  Additional Question
                </p>

                <div className="mt-3 rounded-xl border border-[#eadfcf] bg-[#fbf7ef] px-5 py-4">

                  <p className="whitespace-pre-wrap text-sm leading-7 text-[#56443d]">
                    {item.question}
                  </p>

                </div>

              </div>
            )}

          </div>

        ) : isJanamKundli ? (

          /* ================= JANAM KUNDLI ================= */

          <div className="px-6 py-7">

            <div className="rounded-2xl border border-[#eadfcf] bg-[#fbf7ef] p-5">

              <div className="mb-6">

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                  JANAM KUNDLI REQUEST
                </p>

                <h4 className="mt-1 font-serif text-2xl text-[#57120d]">
                  {item.name ||
                    "Name not provided"}
                </h4>

              </div>

              <div className="grid gap-5 md:grid-cols-3">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                    Date of Birth
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#39251f]">
                    {item.dob ||
                      "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                    Birth Time
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#39251f]">
                    {item.birthTime ||
                      "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                    Place of Birth
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#64524a]">
                    {item.address ||
                      "Not provided"}
                  </p>
                </div>

              </div>

              <div className="mt-6 border-t border-[#e5d8c6] pt-5">

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                  Question
                </p>

                <div className="mt-3 rounded-xl border border-[#eadfcf] bg-white/60 px-5 py-4">

                  <p className="whitespace-pre-wrap text-sm leading-7 text-[#56443d]">
                    {item.question ||
                      "Not provided"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ) : (

          /* ================= GENERAL ================= */

          <div className="px-6 py-7">

            <div className="rounded-2xl border border-[#eadfcf] bg-[#fbf7ef] p-5">

              <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                REQUESTER
              </p>

              <h4 className="mt-1 font-serif text-2xl text-[#57120d]">
                {item.name ||
                  "Name not provided"}
              </h4>

              <div className="mt-5 grid gap-5 md:grid-cols-3">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                    Date of Birth
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#39251f]">
                    {item.dob ||
                      "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                    Birth Time
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#39251f]">
                    {item.birthTime ||
                      "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                    Address
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#64524a]">
                    {item.address ||
                      "Not provided"}
                  </p>
                </div>

              </div>

              <div className="mt-6 border-t border-[#e5d8c6] pt-5">

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
                  Question
                </p>

                <div className="mt-3 rounded-xl border border-[#eadfcf] bg-white/60 px-5 py-4">

                  <p className="whitespace-pre-wrap text-sm leading-7 text-[#56443d]">
                    {item.question ||
                      "Not provided"}
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}
      </article>
    );
  }

  return (
    <div>

      {/* ================= STATS ================= */}

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">

        <div className="rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a27a3a]">
            Total Requests
          </p>

          <p className="mt-3 font-serif text-4xl text-[#57120d]">
            {submissions.length}
          </p>

          <p className="mt-4 text-xs text-[#927f73]">
            All consultation enquiries
          </p>
        </div>

        <div className="rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a27a3a]">
            Today
          </p>

          <p className="mt-3 font-serif text-4xl text-[#57120d]">
            {todayCount}
          </p>

          <p className="mt-4 text-xs text-[#927f73]">
            Requests received today
          </p>
        </div>

        <div className="rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a27a3a]">
            This Week
          </p>

          <p className="mt-3 font-serif text-4xl text-[#57120d]">
            {weekCount}
          </p>

          <p className="mt-4 text-xs text-[#927f73]">
            Requests since Sunday
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
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

        <div className="rounded-2xl border border-green-200 bg-green-50/50 p-6 shadow-sm">
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

      {/* ================= SEARCH ================= */}

      <div className="mt-8 rounded-2xl border border-[#ddcfbb] bg-[#fffdf8] p-4 shadow-sm">

        <div className="flex flex-col gap-3 md:flex-row">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search consultations..."
            className="w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] py-3.5 px-4 text-sm text-[#3b2520] outline-none placeholder:text-[#aa9a8e] focus:border-[#b78a40] focus:bg-white"
          />

          {search && (
            <button
              onClick={() =>
                setSearch("")
              }
              className="rounded-xl border border-[#ded0bd] px-5 py-3 text-xs font-semibold text-[#745f54] hover:bg-[#f6efe3]"
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* ================= REQUEST HEADER ================= */}

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
            ENQUIRIES
          </p>

          <h2 className="mt-1 font-serif text-3xl text-[#57120d]">
            Consultation Requests
          </h2>

          <p className="mt-1 text-xs text-[#8c796c]">
            Select a consultation category below
          </p>

        </div>

        <a
          href="/api/admin/export"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5c130d] px-5 py-3 text-xs font-bold tracking-wide text-[#f2d99d] shadow-sm transition hover:bg-[#420b08]"
        >
          ↓ Export CSV
        </a>

      </div>

      {/* ================= TABS ================= */}

      <div className="mt-7 grid overflow-hidden rounded-3xl border border-[#d8cbb9] bg-[#fffdf8] shadow-sm md:grid-cols-3">

        {/* KUNDALI MILAN */}

        <button
          type="button"
          onClick={() =>
            setActiveSection("KUNDALI_MILAN")
          }
          className={`relative px-6 py-6 text-left transition ${
            activeSection === "KUNDALI_MILAN"
              ? "bg-gradient-to-br from-[#fffdf8] to-[#f5ede2]"
              : "bg-[#fffdf8] hover:bg-[#faf5eb]"
          }`}
        >

          {activeSection === "KUNDALI_MILAN" && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#9c712d]" />
          )}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
                  activeSection === "KUNDALI_MILAN"
                    ? "bg-[#5b130d] text-[#e7c77d]"
                    : "bg-[#f3ead9] text-[#9c712d]"
                }`}
              >
                ♡
              </div>

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                  MARRIAGE CONSULTATION
                </p>

                <h3 className="mt-1 font-serif text-2xl text-[#57120d]">
                  Kundali Milan
                </h3>

              </div>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                activeSection === "KUNDALI_MILAN"
                  ? "bg-[#eee5d7] text-[#735e51]"
                  : "bg-[#f3ead9] text-[#806d60]"
              }`}
            >
              {kundaliSubmissions.length}
            </span>

          </div>

          <p className="mt-4 pl-16 text-xs text-[#806d60]">
            Marriage matching and compatibility enquiries
          </p>

        </button>


        {/* GENERAL CONSULTATION */}

        <button
          type="button"
          onClick={() =>
            setActiveSection("GENERAL")
          }
          className={`relative border-t border-[#e1d6c6] px-6 py-6 text-left transition md:border-l md:border-t-0 ${
            activeSection === "GENERAL"
              ? "bg-gradient-to-br from-[#fffdf8] to-[#f5ede2]"
              : "bg-[#fffdf8] hover:bg-[#faf5eb]"
          }`}
        >

          {activeSection === "GENERAL" && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#9c712d]" />
          )}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
                  activeSection === "GENERAL"
                    ? "bg-[#5b130d] text-[#e7c77d]"
                    : "bg-[#f3ead9] text-[#9c712d]"
                }`}
              >
                ✦
              </div>

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                  ASTROLOGY CONSULTATION
                </p>

                <h3 className="mt-1 font-serif text-2xl text-[#57120d]">
                  General Consultation
                </h3>

              </div>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                activeSection === "GENERAL"
                  ? "bg-[#eee5d7] text-[#735e51]"
                  : "bg-[#f3ead9] text-[#806d60]"
              }`}
            >
              {generalSubmissions.length}
            </span>

          </div>

          <p className="mt-4 pl-16 text-xs text-[#806d60]">
            Individual astrology and life-guidance enquiries
          </p>

        </button>


        {/* JANAM KUNDLI */}

        <button
          type="button"
          onClick={() =>
            setActiveSection("JANAM_KUNDLI")
          }
          className={`relative border-t border-[#e1d6c6] px-6 py-6 text-left transition md:border-l md:border-t-0 ${
            activeSection === "JANAM_KUNDLI"
              ? "bg-gradient-to-br from-[#fffdf8] to-[#f5ede2]"
              : "bg-[#fffdf8] hover:bg-[#faf5eb]"
          }`}
        >

          {activeSection === "JANAM_KUNDLI" && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#9c712d]" />
          )}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
                  activeSection === "JANAM_KUNDLI"
                    ? "bg-[#5b130d] text-[#e7c77d]"
                    : "bg-[#f3ead9] text-[#9c712d]"
                }`}
              >
                📜
              </div>

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a2742e]">
                  BIRTH CHART
                </p>

                <h3 className="mt-1 font-serif text-2xl text-[#57120d]">
                  Janam Kundli
                </h3>

              </div>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                activeSection === "JANAM_KUNDLI"
                  ? "bg-[#eee5d7] text-[#735e51]"
                  : "bg-[#f3ead9] text-[#806d60]"
              }`}
            >
              {janamKundliSubmissions.length}
            </span>

          </div>

          <p className="mt-4 pl-16 text-xs text-[#806d60]">
            Birth chart and life guidance enquiries
          </p>

        </button>

      </div>
      {/* ================= ACTIVE SECTION ================= */}

      <div className="mt-8 flex items-center justify-between">

        <div>

          <p className="text-[9px] font-bold uppercase tracking-[2px] text-[#a2742e]">
            {activeSection === "KUNDALI_MILAN"
              ? "KUNDALI MILAN REQUESTS"
              : activeSection === "JANAM_KUNDLI"
              ? "JANAM KUNDLI REQUESTS"
              : "GENERAL CONSULTATION REQUESTS"}
          </p>

          <h3 className="mt-1 font-serif text-2xl text-[#57120d]">
            {activeSection === "KUNDALI_MILAN"
              ? "Marriage Matching Enquiries"
              : activeSection === "JANAM_KUNDLI"
              ? "Birth Chart Enquiries"
              : "Astrology Consultation Enquiries"}
          </h3>

        </div>

        <span className="rounded-full border border-[#ddcfbb] bg-[#fffdf8] px-4 py-2 text-xs font-semibold text-[#806d60]">
          {activeSubmissions.length}{" "}
          {activeSubmissions.length === 1
            ? "Request"
            : "Requests"}
        </span>

      </div>

      {/* ================= REQUESTS ================= */}

      {activeSubmissions.length === 0 ? (

        <div className="mt-5 rounded-3xl border border-dashed border-[#d8c9b5] bg-[#fffdf8] px-6 py-20 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b976] bg-[#f8efdf] text-2xl text-[#ad7e2d]">
            {activeSection === "KUNDALI_MILAN"
              ? "♡"
              : activeSection === "JANAM_KUNDLI"
              ? "📜"
              : "✦"}
          </div>

          <h3 className="mt-5 font-serif text-2xl text-[#57120d]">

            {search
              ? "No matching requests"
              : activeSection === "KUNDALI_MILAN"
              ? "No Kundali Milan requests yet"
              : activeSection === "JANAM_KUNDLI"
              ? "No Janam Kundli requests yet"
              : "No General Consultation requests yet"}

          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8c796c]">

            {search
              ? "Try another search term."
              : activeSection === "KUNDALI_MILAN"
              ? "New Kundali Milan enquiries will appear here."
              : activeSection === "JANAM_KUNDLI"
              ? "New Janam Kundli enquiries will appear here."
              : "New general astrology enquiries will appear here."}

          </p>

        </div>

      ) : (

        <div className="mt-5 space-y-5">
          {activeSubmissions.map(
            (item) =>
              renderSubmission(item)
          )}
        </div>

      )}

    </div>
  );
}