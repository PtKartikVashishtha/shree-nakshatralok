"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "success" | "warning" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.currentTarget;

    setLoading(true);
    setStatus("idle");
    setMessage("");

    const form = new FormData(formElement);

    const data = {
      name: form.get("name"),
      dob: form.get("dob"),
      birthTime: form.get("birthTime"),
      address: form.get("address"),
      question: form.get("question"),

      // Honeypot.
      // Humans won't interact with this.
      website: form.get("website"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || "Submission failed."
        );
      }

      formElement.reset();

      if (result.emailSent === false) {
        setStatus("warning");

        setMessage(
          "Your request has been saved successfully, but we could not send the notification. We will still be able to see your request."
        );
      } else {
        setStatus("success");

        setMessage(
          result.message ||
            "Your consultation request has been submitted successfully. We will contact you soon."
        );
      }
    } catch (err) {
      setStatus("error");

      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6"
    >
      {/* HONEYPOT */}

      <div
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* NAME */}

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium"
        >
          Name
        </label>

        <input
          id="name"
          name="name"
          required
          maxLength={100}
          disabled={loading}
          autoComplete="name"
          className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-amber-600 disabled:bg-gray-100"
          placeholder="Your name"
        />
      </div>

      {/* DOB + TIME */}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="dob"
            className="mb-2 block text-sm font-medium"
          >
            Date of Birth
          </label>

          <input
            id="dob"
            type="date"
            name="dob"
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-amber-600 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="birthTime"
            className="mb-2 block text-sm font-medium"
          >
            Time of Birth
          </label>

          <input
            id="birthTime"
            type="time"
            name="birthTime"
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-amber-600 disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* ADDRESS */}

      <div>
        <label
          htmlFor="address"
          className="mb-2 block text-sm font-medium"
        >
          Birth Place
        </label>

        <textarea
          id="address"
          name="address"
          required
          maxLength={500}
          rows={3}
          disabled={loading}
          autoComplete="street-address"
          className="w-full resize-none rounded-xl border border-gray-200 p-3 outline-none focus:border-amber-600 disabled:bg-gray-100"
          placeholder="City / Place of birth"
        />
      </div>

      {/* QUESTION */}

      <div>
        <label
          htmlFor="question"
          className="mb-2 block text-sm font-medium"
        >
          Your Question
        </label>

        <textarea
          id="question"
          name="question"
          required
          maxLength={2000}
          rows={5}
          disabled={loading}
          className="w-full resize-none rounded-xl border border-gray-200 p-3 outline-none focus:border-amber-600 disabled:bg-gray-100"
          placeholder="What would you like guidance about?"
        />
      </div>

      {/* STATUS */}

      {status !== "idle" && (
        <div
          role="alert"
          className={`rounded-xl p-4 text-sm ${
            status === "success"
              ? "bg-green-100 text-green-800"
              : status === "warning"
                ? "bg-amber-100 text-amber-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#8b2418] px-6 py-3 font-semibold text-white transition hover:bg-[#68170f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : "Book Consultation"}
      </button>
    </form>
  );
}