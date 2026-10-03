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
      phone: formData.get("phone"),
      email: formData.get("email"),
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
            "परामर्श अनुरोध भेजने में समस्या आई।"
        );
      }

      setMessage(
        data.message ||
          "आपकी जन्म कुंडली परामर्श का अनुरोध सफलतापूर्वक दर्ज कर लिया गया है। हम आपके नंबर पर शीघ्र संपर्क करेंगे।"
      );

      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "परामर्श अनुरोध भेजने में समस्या आई। कृपया पुनः प्रयास करें।"
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
          जन्म कुंडली परामर्श · JANAM KUNDLI CONSULTATION
        </p>

        <h3 className="mt-3 font-serif text-3xl text-[#57120d] md:text-4xl">
          अपना <em>जन्म विवरण</em> साझा करें।
        </h3>

        <p className="mt-4 leading-7 text-[#74645b]">
          अपनी जन्म तिथि, समय, जन्म स्थान और संपर्क सूत्र साझा करें। पंडित जी द्वारा आपकी पत्रिका का सूक्ष्म अध्ययन कर आपको संपूर्ण मार्गदर्शन प्रदान किया जाएगा।
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="janam-name"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            पूरा नाम <span className="text-red-600">*</span>
          </label>

          <input
            id="janam-name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder="उदा. राहुल शर्मा"
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />
        </div>

        <div>
          <label
            htmlFor="janam-phone"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            फ़ोन / व्हाट्सएप नंबर <span className="text-red-600">*</span>
          </label>

          <input
            id="janam-phone"
            name="phone"
            type="tel"
            required
            maxLength={20}
            placeholder="उदा. 9876543210 (परामर्श हेतु)"
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />
        </div>

        <div>
          <label
            htmlFor="janam-email"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            ईमेल पता <span className="text-xs font-normal text-gray-500">(वैकल्पिक)</span>
          </label>

          <input
            id="janam-email"
            name="email"
            type="email"
            maxLength={120}
            placeholder="उदा. yourname@gmail.com"
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />
        </div>

        <div>
          <label
            htmlFor="janam-dob"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            जन्म तिथि <span className="text-red-600">*</span>
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
            जन्म समय <span className="text-red-600">*</span>
          </label>

          <input
            id="janam-birth-time"
            name="birthTime"
            type="time"
            required
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />

          <p className="mt-2 text-xs leading-5 text-[#806d66]">
            यदि जन्म का सही समय निश्चित न हो, तो नीचे प्रश्न वाले भाग में उल्लेख करें।
          </p>
        </div>

        <div>
          <label
            htmlFor="janam-birth-place"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            जन्म स्थान (शहर / जिला / राज्य) <span className="text-red-600">*</span>
          </label>

          <input
            id="janam-birth-place"
            name="birthPlace"
            type="text"
            required
            maxLength={200}
            placeholder="उदा. मुजफ्फरनगर, उत्तर प्रदेश"
            className="w-full rounded-xl border border-[#d5c5ae] bg-white px-4 py-3 outline-none transition focus:border-[#8b2418]"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="janam-question"
            className="mb-2 block text-sm font-semibold text-[#57120d]"
          >
            आपका मुख्य प्रश्न / जीवन का विषय <span className="text-red-600">*</span>
          </label>

          <textarea
            id="janam-question"
            name="question"
            required
            maxLength={2000}
            rows={5}
            placeholder="उदा. करियर व नौकरी, शिक्षा, विवाह की संभावना, संतान सुख, व्यापार वृद्धि, स्वास्थ्य संबंधी शंका अथवा कोई विशिष्ट प्रश्न..."
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
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#8b2418] px-8 py-4 font-semibold text-white transition hover:bg-[#68170f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "अनुरोध भेजा जा रहा है..."
          : "जन्म कुंडली परामर्श हेतु अनुरोध भेजें →"}
      </button>

      <p className="mt-3 text-center text-xs text-[#7d6b60]">
        🔒 आपका जन्म विवरण व संपर्क सूत्र शत-प्रतिशत सुरक्षित एवं गोपनीय रखा जाता है।
      </p>
    </form>
  );
}