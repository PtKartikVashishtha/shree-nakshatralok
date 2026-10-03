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
      phone: form.get("phone"),
      email: form.get("email"),
      dob: form.get("dob"),
      birthTime: form.get("birthTime"),
      address: form.get("address"),
      question: form.get("question"),

      // Honeypot
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
          result.error || "परामर्श अनुरोध भेजने में समस्या आई।"
        );
      }

      formElement.reset();

      if (result.emailSent === false) {
        setStatus("warning");

        setMessage(
          "आपका परामर्श अनुरोध सफलतापूर्वक दर्ज कर लिया गया है। हम आपके दिए गए नंबर पर शीघ्र ही संपर्क करेंगे।"
        );
      } else {
        setStatus("success");

        setMessage(
          result.message ||
            "आपका परामर्श अनुरोध सफलतापूर्वक प्राप्त हो गया है। पंडित जी की टीम आपसे जल्द संपर्क करेगी।"
        );
      }
    } catch (err) {
      setStatus("error");

      setMessage(
        err instanceof Error
          ? err.message
          : "कुछ त्रुटि हुई। कृपया दोबारा प्रयास करें।"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
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
          className="mb-1.5 block text-sm font-semibold text-[#57120d]"
        >
          पूरा नाम <span className="text-red-600">*</span>
        </label>

        <input
          id="name"
          name="name"
          required
          maxLength={100}
          disabled={loading}
          autoComplete="name"
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-[#2b1712] outline-none transition focus:border-[#8b2418] disabled:bg-gray-100"
          placeholder="उदा. अमित कुमार शर्मा"
        />
      </div>

      {/* CONTACT INFO: PHONE & EMAIL */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-semibold text-[#57120d]"
          >
            फ़ोन नंबर / व्हाट्सएप नंबर <span className="text-red-600">*</span>
          </label>

          <input
            id="phone"
            type="tel"
            name="phone"
            required
            maxLength={20}
            disabled={loading}
            autoComplete="tel"
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-[#2b1712] outline-none transition focus:border-[#8b2418] disabled:bg-gray-100"
            placeholder="उदा. 9876543210 (परामर्श हेतु)"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-[#57120d]"
          >
            ईमेल पता <span className="text-xs font-normal text-gray-500">(वैकल्पिक)</span>
          </label>

          <input
            id="email"
            type="email"
            name="email"
            maxLength={120}
            disabled={loading}
            autoComplete="email"
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-[#2b1712] outline-none transition focus:border-[#8b2418] disabled:bg-gray-100"
            placeholder="उदा. yourname@gmail.com"
          />
        </div>
      </div>

      {/* DOB + TIME */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="dob"
            className="mb-1.5 block text-sm font-semibold text-[#57120d]"
          >
            जन्म तिथि <span className="text-red-600">*</span>
          </label>

          <input
            id="dob"
            type="date"
            name="dob"
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-[#2b1712] outline-none focus:border-[#8b2418] disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="birthTime"
            className="mb-1.5 block text-sm font-semibold text-[#57120d]"
          >
            जन्म समय <span className="text-red-600">*</span>
          </label>

          <input
            id="birthTime"
            type="time"
            name="birthTime"
            required
            disabled={loading}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-[#2b1712] outline-none focus:border-[#8b2418] disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* ADDRESS / BIRTH PLACE */}
      <div>
        <label
          htmlFor="address"
          className="mb-1.5 block text-sm font-semibold text-[#57120d]"
        >
          जन्म स्थान (शहर / राज्य) <span className="text-red-600">*</span>
        </label>

        <input
          id="address"
          name="address"
          required
          maxLength={300}
          disabled={loading}
          autoComplete="address-level2"
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-[#2b1712] outline-none focus:border-[#8b2418] disabled:bg-gray-100"
          placeholder="उदा. मुजफ्फरनगर, उत्तर प्रदेश"
        />
      </div>

      {/* QUESTION */}
      <div>
        <label
          htmlFor="question"
          className="mb-1.5 block text-sm font-semibold text-[#57120d]"
        >
          आपका प्रश्न / समस्या का विवरण <span className="text-red-600">*</span>
        </label>

        <textarea
          id="question"
          name="question"
          required
          maxLength={2000}
          rows={4}
          disabled={loading}
          className="w-full resize-none rounded-xl border border-gray-300 bg-white p-3 text-sm text-[#2b1712] outline-none focus:border-[#8b2418] disabled:bg-gray-100"
          placeholder="विवाह, करियर, स्वास्थ्य, व्यापार, पारिवारिक शांति अथवा कोई अन्य प्रश्न जिसके संबंध में आप परामर्श चाहते हैं..."
        />
      </div>

      {/* STATUS */}
      {status !== "idle" && (
        <div
          role="alert"
          className={`rounded-xl p-4 text-sm font-medium ${
            status === "success"
              ? "bg-green-100 text-green-900 border border-green-300"
              : status === "warning"
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : "bg-red-100 text-red-900 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#8b2418] px-6 py-3.5 text-base font-semibold text-white shadow transition hover:bg-[#68170f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "परामर्श अनुरोध भेजा जा रहा है..."
          : "परामर्श हेतु अनुरोध भेजें →"}
      </button>

      <p className="text-center text-xs text-[#7d6b60]">
        🔒 आपकी संपूर्ण जानकारी एवं कुंडली विवरण पूर्णतः गोपनीय रखा जाता है।
      </p>
    </form>
  );
}