"use client";

import { FormEvent, useState } from "react";

export default function JanamKundliForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const form = event.currentTarget;

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      dob: formData.get("dob"),
      birthTime: formData.get("birthTime"),
      birthPlace: formData.get("birthPlace"),
      question: formData.get("question"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch(
        "/api/janam-kundli",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Unable to submit your request."
        );
      }

      setMessage(
        data.message ||
          "Your Janam Kundli request has been submitted successfully."
      );

      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#d8c6aa] bg-[#fffaf2] p-6 shadow-sm md:p-10"
    >
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
          JANAM KUNDLI CONSULTATION
        </p>

        <h3 className="mt-3 font-serif text-3xl text-[#57120d] md:text-4xl">
          Share your{" "}
          <em>birth details.</em>
        </h3>

        <p className="mt-4 leading-7 text-[#74645b]">
          Provide your birth information and tell us
          what you would like to discuss during your
          consultation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="janam-name"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            Name
          </label>

          <input
            id="janam-name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder="Your full name"
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />
        </div>

        <div>
          <label
            htmlFor="janam-dob"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            Date of Birth
          </label>

          <input
            id="janam-dob"
            name="dob"
            type="date"
            required
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />
        </div>

        <div>
          <label
            htmlFor="janam-birth-time"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            Time of Birth
          </label>

          <input
            id="janam-birth-time"
            name="birthTime"
            type="time"
            required
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />

          <p className="mt-2 text-xs leading-5 text-[#806d66]">
            If your exact birth time is uncertain,
            mention that in your question instead of
            guessing.
          </p>
        </div>

        <div>
          <label
            htmlFor="janam-birth-place"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            Place of Birth
          </label>

          <input
            id="janam-birth-place"
            name="birthPlace"
            type="text"
            required
            maxLength={200}
            placeholder="City, town or place"
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="janam-question"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            What would you like to discuss?
          </label>

          <textarea
            id="janam-question"
            name="question"
            required
            maxLength={2000}
            rows={6}
            placeholder="For example: career, education, marriage, family, business or an important life question."
            className="w-full resize-y rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />
        </div>

        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="janam-website">
            Website
          </label>

          <input
            id="janam-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Submitting..."
          : "Request Janam Kundli Consultation →"}
      </button>
    </form>
  );
}