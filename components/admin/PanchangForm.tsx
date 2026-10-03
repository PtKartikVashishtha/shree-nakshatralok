"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type PanchangFormData = {
  id?: string;
  date: string;
  dayName: string;
  location: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  paksha: string;
  vikramSamvat: string;
  shakaSamvat: string;
  ayana: string;
  ritu: string;
  moonSign: string;
  sunSign: string;
  rahukaal: string;
  yamaganda: string;
  gulikaKaal: string;
  abhijitMuhurat: string;
  brahmaMuhurat: string;
  auspiciousTimings: string;
  inauspiciousTimings: string;
  festivals: string;
  specialNotes: string;
  status: "DRAFT" | "PUBLISHED";
};

type Props = {
  initialData?: PanchangFormData;
  isEditing?: boolean;
};

const WEEKDAYS = [
  "Sunday · रविवार",
  "Monday · सोमवार",
  "Tuesday · मंगलवार",
  "Wednesday · बुधवार",
  "Thursday · गुरुवार",
  "Friday · शुक्रवार",
  "Saturday · शनिवार",
];

export default function PanchangForm({ initialData, isEditing = false }: Props) {
  const router = useRouter();

  // Helper to get formatted date string YYYY-MM-DD
  const getTodayString = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getTomorrowString = () => {
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    const y = tm.getFullYear();
    const m = String(tm.getMonth() + 1).padStart(2, "0");
    const d = String(tm.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getDayNameFromDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return "";
    const dateObj = new Date(y, m - 1, d);
    return WEEKDAYS[dateObj.getDay()] || "";
  };

  const defaultDate = getTodayString();

  const [formData, setFormData] = useState<PanchangFormData>(
    initialData || {
      date: defaultDate,
      dayName: getDayNameFromDate(defaultDate),
      location: "Muzaffarnagar, Uttar Pradesh",
      sunrise: "06:15 AM",
      sunset: "06:05 PM",
      moonrise: "",
      moonset: "",
      tithi: "",
      nakshatra: "",
      yoga: "",
      karana: "",
      paksha: "Shukla Paksha",
      vikramSamvat: "2083",
      shakaSamvat: "1948",
      ayana: "Dakshinayana",
      ritu: "Sharad",
      moonSign: "",
      sunSign: "",
      rahukaal: "",
      yamaganda: "",
      gulikaKaal: "",
      abhijitMuhurat: "11:45 AM – 12:35 PM",
      brahmaMuhurat: "04:35 AM – 05:25 AM",
      auspiciousTimings: "",
      inauspiciousTimings: "",
      festivals: "",
      specialNotes: "",
      status: "PUBLISHED",
    }
  );

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleDateChange = (val: string) => {
    const day = getDayNameFromDate(val);
    setFormData((prev) => ({
      ...prev,
      date: val,
      dayName: day || prev.dayName,
    }));
  };

  const setPresetDate = (type: "today" | "tomorrow") => {
    const d = type === "today" ? getTodayString() : getTomorrowString();
    handleDateChange(d);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSaving(true);

    if (!formData.date) {
      setErrorMsg("Date is required.");
      setSaving(false);
      return;
    }

    if (!formData.tithi.trim() || !formData.nakshatra.trim()) {
      setErrorMsg("Tithi and Nakshatra are required core Panchang elements.");
      setSaving(false);
      return;
    }

    try {
      const url = isEditing && initialData?.id
        ? `/api/admin/panchang/${initialData.id}`
        : "/api/admin/panchang";

      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to save Panchang entry.");
      }

      setSuccessMsg(
        isEditing
          ? "Panchang entry updated successfully!"
          : "Panchang entry published successfully!"
      );

      setTimeout(() => {
        router.push("/admin/panchang");
        router.refresh();
      }, 700);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#ddcfbb] pb-5">
        <div>
          <Link
            href="/admin/panchang"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c7462] hover:text-[#57120d] transition"
          >
            ← Back to Panchang Dashboard
          </Link>
          <h1 className="mt-1 font-serif text-3xl font-medium text-[#57120d]">
            {isEditing ? `Edit Panchang: ${formData.date}` : "Create Daily Panchang"}
          </h1>
          <p className="text-xs text-[#806d66] mt-0.5">
            Published daily Panchang data automatically powers the public Panchang page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/panchang"
            className="rounded-xl border border-[#d8cbb8] bg-[#fffdf8] px-5 py-2.5 text-xs font-semibold text-[#665449] hover:bg-[#f6eee2] transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#5c130d] px-6 py-2.5 text-xs font-bold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition disabled:opacity-50 flex items-center gap-2"
          >
            <span>✦</span>
            <span>{saving ? "Saving..." : isEditing ? "Save Changes" : "Publish Panchang"}</span>
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      {errorMsg && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          ⚠️ {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          ✓ {successMsg}
        </div>
      )}

      {/* SECTION 1: DATE & LOCATION */}
      <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm">
        <div className="border-b border-[#ebdcca] pb-3 mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
              SECTION 1
            </p>
            <h2 className="font-serif text-2xl text-[#57120d]">Date & Location</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPresetDate("today")}
              className="rounded-lg bg-[#f3ead9] px-3 py-1.5 text-xs font-semibold text-[#80612c] hover:bg-[#ebdcc0]"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setPresetDate("tomorrow")}
              className="rounded-lg bg-[#f3ead9] px-3 py-1.5 text-xs font-semibold text-[#80612c] hover:bg-[#ebdcc0]"
            >
              Tomorrow
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Calendar Date * (YYYY-MM-DD)
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleDateChange(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Weekday / Vaar *
            </label>
            <input
              type="text"
              value={formData.dayName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dayName: e.target.value }))
              }
              placeholder="e.g. Saturday · शनिवार"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Location / City *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="Muzaffarnagar, Uttar Pradesh"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: SUNRISE / SUNSET & MOON */}
      <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm">
        <div className="border-b border-[#ebdcca] pb-3 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
            SECTION 2
          </p>
          <h2 className="font-serif text-2xl text-[#57120d]">Sun & Moon Timings</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Sunrise (सूर्योदय) *
            </label>
            <input
              type="text"
              value={formData.sunrise}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sunrise: e.target.value }))
              }
              placeholder="06:17 AM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Sunset (सूर्यास्त) *
            </label>
            <input
              type="text"
              value={formData.sunset}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sunset: e.target.value }))
              }
              placeholder="06:05 PM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Moonrise (चन्द्रोदय)
            </label>
            <input
              type="text"
              value={formData.moonrise}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, moonrise: e.target.value }))
              }
              placeholder="10:45 PM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Moonset (चन्द्रास्त)
            </label>
            <input
              type="text"
              value={formData.moonset}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, moonset: e.target.value }))
              }
              placeholder="11:20 AM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: CORE PANCHANG ELEMENTS */}
      <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm">
        <div className="border-b border-[#ebdcca] pb-3 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
            SECTION 3
          </p>
          <h2 className="font-serif text-2xl text-[#57120d]">Five Elements of Panchang (पञ्चाङ्ग)</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              1. Tithi (तिथि) *
            </label>
            <input
              type="text"
              value={formData.tithi}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tithi: e.target.value }))
              }
              placeholder="e.g. Ashtami up to 04:32 PM, then Navami"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              2. Nakshatra (नक्षत्र) *
            </label>
            <input
              type="text"
              value={formData.nakshatra}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, nakshatra: e.target.value }))
              }
              placeholder="e.g. Rohini up to 02:15 PM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              3. Yoga (योग) *
            </label>
            <input
              type="text"
              value={formData.yoga}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, yoga: e.target.value }))
              }
              placeholder="e.g. Shiva / Siddhi"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              4. Karana (करण) *
            </label>
            <input
              type="text"
              value={formData.karana}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, karana: e.target.value }))
              }
              placeholder="e.g. Kaulava / Taitila"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              5. Paksha (पक्ष) *
            </label>
            <select
              value={formData.paksha}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, paksha: e.target.value }))
              }
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3.5 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            >
              <option value="Shukla Paksha">Shukla Paksha (शुक्ल पक्ष)</option>
              <option value="Krishna Paksha">Krishna Paksha (कृष्ण पक्ष)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 4: MUHURAT & TIMINGS */}
      <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm">
        <div className="border-b border-[#ebdcca] pb-3 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
            SECTION 4
          </p>
          <h2 className="font-serif text-2xl text-[#57120d]">Muhurat & Planetary Timings</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-green-700">
              Abhijit Muhurat (शुभ अभिजीत)
            </label>
            <input
              type="text"
              value={formData.abhijitMuhurat}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, abhijitMuhurat: e.target.value }))
              }
              placeholder="11:45 AM – 12:35 PM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-green-700">
              Brahma Muhurat (ब्रह्म मुहूर्त)
            </label>
            <input
              type="text"
              value={formData.brahmaMuhurat}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, brahmaMuhurat: e.target.value }))
              }
              placeholder="04:35 AM – 05:25 AM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-red-700">
              Rahukaal (राहुकाल - अशुभ)
            </label>
            <input
              type="text"
              value={formData.rahukaal}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rahukaal: e.target.value }))
              }
              placeholder="09:15 AM – 10:45 AM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Yamaganda Kaal (यमगण्ड)
            </label>
            <input
              type="text"
              value={formData.yamaganda}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, yamaganda: e.target.value }))
              }
              placeholder="01:30 PM – 03:00 PM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Gulika Kaal (गुलिक काल)
            </label>
            <input
              type="text"
              value={formData.gulikaKaal}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gulikaKaal: e.target.value }))
              }
              placeholder="06:17 AM – 07:45 AM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Other Auspicious Timings (शुभ मुहूर्त / अमृत काल)
            </label>
            <input
              type="text"
              value={formData.auspiciousTimings}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, auspiciousTimings: e.target.value }))
              }
              placeholder="e.g. Amrit Kaal: 02:10 PM – 03:40 PM; Vijaya: 02:00 PM"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>
        </div>
      </div>

      {/* SECTION 5: VEDIC CALENDAR & RASHI */}
      <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm">
        <div className="border-b border-[#ebdcca] pb-3 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
            SECTION 5
          </p>
          <h2 className="font-serif text-2xl text-[#57120d]">Samvat, Ayana & Rashi</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Vikram Samvat (विक्रम संवत)
            </label>
            <input
              type="text"
              value={formData.vikramSamvat}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, vikramSamvat: e.target.value }))
              }
              placeholder="2083"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Shaka Samvat (शक संवत)
            </label>
            <input
              type="text"
              value={formData.shakaSamvat}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, shakaSamvat: e.target.value }))
              }
              placeholder="1948"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Ayana (अयन)
            </label>
            <input
              type="text"
              value={formData.ayana}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ayana: e.target.value }))
              }
              placeholder="Dakshinayana / Uttarayana"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Ritu (ऋतु - Season)
            </label>
            <input
              type="text"
              value={formData.ritu}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ritu: e.target.value }))
              }
              placeholder="Sharad (शरद)"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Moon Sign (चन्द्र राशि)
            </label>
            <input
              type="text"
              value={formData.moonSign}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, moonSign: e.target.value }))
              }
              placeholder="Vrishabha (वृषभ - Taurus)"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
              Sun Sign (सूर्य राशि)
            </label>
            <input
              type="text"
              value={formData.sunSign}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sunSign: e.target.value }))
              }
              placeholder="Kanya (कन्या - Virgo)"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>
        </div>
      </div>

      {/* SECTION 6: FESTIVALS & SPECIAL NOTES */}
      <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm space-y-5">
        <div className="border-b border-[#ebdcca] pb-3">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#a2742e]">
            SECTION 6
          </p>
          <h2 className="font-serif text-2xl text-[#57120d]">Festivals & Astrological Notes</h2>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
            Festivals / Vrats / Visesha Vrat (त्योहार / व्रत)
          </label>
          <input
            type="text"
            value={formData.festivals}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, festivals: e.target.value }))
            }
            placeholder="e.g. Durga Ashtami, Kalashtami Vrat"
            className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
            Special Notes / Daily Guidance
          </label>
          <textarea
            rows={3}
            value={formData.specialNotes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, specialNotes: e.target.value }))
            }
            placeholder="e.g. Auspicious day for spiritual practices, recitation of Durga Saptashati, and charity..."
            className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[2px] text-[#a48d7b]">
            Publishing Status
          </label>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, status: "PUBLISHED" }))
              }
              className={`rounded-xl border px-4 py-2 text-xs font-semibold ${
                formData.status === "PUBLISHED"
                  ? "border-green-300 bg-green-50 text-green-800"
                  : "border-[#d8cbb8] text-[#78665a]"
              }`}
            >
              Published (Live on website)
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, status: "DRAFT" }))
              }
              className={`rounded-xl border px-4 py-2 text-xs font-semibold ${
                formData.status === "DRAFT"
                  ? "border-amber-300 bg-amber-50 text-amber-800"
                  : "border-[#d8cbb8] text-[#78665a]"
              }`}
            >
              Draft (Hidden from public)
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
