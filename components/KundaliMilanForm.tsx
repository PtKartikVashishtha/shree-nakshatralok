"use client";

import { FormEvent, useState } from "react";

type Status =
  | "idle"
  | "success"
  | "warning"
  | "error";

export default function KundaliMilanForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] =
    useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const formElement = e.currentTarget;

    setLoading(true);
    setStatus("idle");
    setMessage("");

    const form = new FormData(formElement);

    const data = {
      name: form.get("name"),
      address: form.get("address"),
      question: form.get("question"),

      person1Name: form.get("person1Name"),
      person1Dob: form.get("person1Dob"),
      person1BirthTime:
        form.get("person1BirthTime"),
      person1BirthPlace:
        form.get("person1BirthPlace"),

      person2Name: form.get("person2Name"),
      person2Dob: form.get("person2Dob"),
      person2BirthTime:
        form.get("person2BirthTime"),
      person2BirthPlace:
        form.get("person2BirthPlace"),

      website: form.get("website"),
    };

    try {
      const res = await fetch(
        "/api/kundali-milan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error ||
            "Submission failed."
        );
      }

      formElement.reset();

      if (result.emailSent === false) {
        setStatus("warning");

        setMessage(
          "Your Kundali Milan request has been saved successfully, but we could not send the notification. We will still be able to see your request."
        );
      } else {
        setStatus("success");

        setMessage(
          result.message ||
            "Your Kundali Milan request has been submitted successfully. We will contact you soon."
        );
      }
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-5xl space-y-8"
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

      {/* REQUESTER */}

      <div>
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
          YOUR DETAILS · आपके विवरण
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Your Name
            </label>

            <input
              id="name"
              name="name"
              required
              maxLength={100}
              disabled={loading}
              autoComplete="name"
              placeholder="Your name"
              className="w-full rounded-xl border border-[#ded1be] bg-[#fffdf8] p-3 outline-none transition focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-medium"
            >
              Address
            </label>

            <input
              id="address"
              name="address"
              required
              maxLength={500}
              disabled={loading}
              autoComplete="street-address"
              placeholder="Your address"
              className="w-full rounded-xl border border-[#ded1be] bg-[#fffdf8] p-3 outline-none transition focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* PERSON 1 */}

      <div className="rounded-2xl border border-[#ded1be] bg-[#fffdf8] p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
              PERSON 1
            </p>

            <h3 className="mt-1 font-serif text-3xl text-[#57120d]">
              First Birth Chart
            </h3>
          </div>

          <span className="font-serif text-3xl text-[#c49a50]">
            01
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="person1Name"
              className="mb-2 block text-sm font-medium"
            >
              Name
            </label>

            <input
              id="person1Name"
              name="person1Name"
              required
              maxLength={100}
              disabled={loading}
              placeholder="Person 1 name"
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person1BirthPlace"
              className="mb-2 block text-sm font-medium"
            >
              Birth Place
            </label>

            <input
              id="person1BirthPlace"
              name="person1BirthPlace"
              required
              maxLength={200}
              disabled={loading}
              placeholder="City, State, Country"
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person1Dob"
              className="mb-2 block text-sm font-medium"
            >
              Date of Birth
            </label>

            <input
              id="person1Dob"
              type="date"
              name="person1Dob"
              required
              disabled={loading}
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person1BirthTime"
              className="mb-2 block text-sm font-medium"
            >
              Time of Birth
            </label>

            <input
              id="person1BirthTime"
              type="time"
              name="person1BirthTime"
              required
              disabled={loading}
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* PERSON 2 */}

      <div className="rounded-2xl border border-[#ded1be] bg-[#fffdf8] p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#a2742e]">
              PERSON 2
            </p>

            <h3 className="mt-1 font-serif text-3xl text-[#57120d]">
              Second Birth Chart
            </h3>
          </div>

          <span className="font-serif text-3xl text-[#c49a50]">
            02
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="person2Name"
              className="mb-2 block text-sm font-medium"
            >
              Name
            </label>

            <input
              id="person2Name"
              name="person2Name"
              required
              maxLength={100}
              disabled={loading}
              placeholder="Person 2 name"
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person2BirthPlace"
              className="mb-2 block text-sm font-medium"
            >
              Birth Place
            </label>

            <input
              id="person2BirthPlace"
              name="person2BirthPlace"
              required
              maxLength={200}
              disabled={loading}
              placeholder="City, State, Country"
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person2Dob"
              className="mb-2 block text-sm font-medium"
            >
              Date of Birth
            </label>

            <input
              id="person2Dob"
              type="date"
              name="person2Dob"
              required
              disabled={loading}
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person2BirthTime"
              className="mb-2 block text-sm font-medium"
            >
              Time of Birth
            </label>

            <input
              id="person2BirthTime"
              type="time"
              name="person2BirthTime"
              required
              disabled={loading}
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* QUESTION */}

      <div>
        <label
          htmlFor="question"
          className="mb-2 block text-sm font-medium"
        >
          Additional Question
        </label>

        <textarea
          id="question"
          name="question"
          maxLength={2000}
          rows={5}
          disabled={loading}
          placeholder="Any specific question about the marriage matching?"
          className="w-full resize-none rounded-xl border border-[#ded1be] bg-[#fffdf8] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
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

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#8b2418] px-6 py-4 font-semibold text-white transition hover:bg-[#68170f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : "Request Kundali Milan Consultation →"}
      </button>

      <p className="text-center text-xs text-[#806d66]">
        Your birth details are used for the
        consultation request only.
      </p>
    </form>
  );
}