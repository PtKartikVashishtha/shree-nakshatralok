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
      phone: form.get("phone"),
      email: form.get("email"),
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
            "परामर्श अनुरोध भेजने में समस्या आई।"
        );
      }

      formElement.reset();

      if (result.emailSent === false) {
        setStatus("warning");

        setMessage(
          "आपकी कुंडली मिलान का अनुरोध सफलतापूर्वक दर्ज कर लिया गया है। हम आपके दिए गए नंबर पर शीघ्र ही संपर्क करेंगे।"
        );
      } else {
        setStatus("success");

        setMessage(
          result.message ||
            "आपकी कुंडली मिलान का अनुरोध सफलतापूर्वक प्राप्त हो गया है। पंडित जी की टीम आपसे जल्द संपर्क करेगी।"
        );
      }
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "कुछ त्रुटि हुई। कृपया दोबारा प्रयास करें।"
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
          परामर्शकर्ता का विवरण · REQUESTER DETAILS
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              आपका पूरा नाम <span className="text-red-600">*</span>
            </label>

            <input
              id="name"
              name="name"
              required
              maxLength={100}
              disabled={loading}
              autoComplete="name"
              placeholder="उदा. राजेश कुमार"
              className="w-full rounded-xl border border-[#ded1be] bg-[#fffdf8] p-3 outline-none transition focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              फ़ोन / व्हाट्सएप नंबर <span className="text-red-600">*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              required
              maxLength={20}
              disabled={loading}
              autoComplete="tel"
              placeholder="उदा. 9876543210 (संपर्क सूत्र)"
              className="w-full rounded-xl border border-[#ded1be] bg-[#fffdf8] p-3 outline-none transition focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              ईमेल पता <span className="text-xs font-normal text-gray-500">(वैकल्पिक)</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              maxLength={120}
              disabled={loading}
              autoComplete="email"
              placeholder="उदा. yourname@gmail.com"
              className="w-full rounded-xl border border-[#ded1be] bg-[#fffdf8] p-3 outline-none transition focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              निवास स्थान / पता <span className="text-red-600">*</span>
            </label>

            <input
              id="address"
              name="address"
              required
              maxLength={500}
              disabled={loading}
              autoComplete="street-address"
              placeholder="उदा. मुजफ्फरनगर, उत्तर प्रदेश"
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
              प्रथम जन्म पत्रिका · PERSON 1 (वर / वधू)
            </p>

            <h3 className="mt-1 font-serif text-3xl text-[#57120d]">
              प्रथम जातक का विवरण
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
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              नाम <span className="text-red-600">*</span>
            </label>

            <input
              id="person1Name"
              name="person1Name"
              required
              maxLength={100}
              disabled={loading}
              placeholder="उदा. वर या कन्या का नाम"
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person1BirthPlace"
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              जन्म स्थान (शहर / राज्य) <span className="text-red-600">*</span>
            </label>

            <input
              id="person1BirthPlace"
              name="person1BirthPlace"
              required
              maxLength={200}
              disabled={loading}
              placeholder="उदा. मेरठ, उत्तर प्रदेश"
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person1Dob"
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              जन्म तिथि <span className="text-red-600">*</span>
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
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              जन्म समय <span className="text-red-600">*</span>
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
              द्वितीय जन्म पत्रिका · PERSON 2 (वर / वधू)
            </p>

            <h3 className="mt-1 font-serif text-3xl text-[#57120d]">
              द्वितीय जातक का विवरण
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
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              नाम <span className="text-red-600">*</span>
            </label>

            <input
              id="person2Name"
              name="person2Name"
              required
              maxLength={100}
              disabled={loading}
              placeholder="उदा. वर या कन्या का नाम"
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person2BirthPlace"
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              जन्म स्थान (शहर / राज्य) <span className="text-red-600">*</span>
            </label>

            <input
              id="person2BirthPlace"
              name="person2BirthPlace"
              required
              maxLength={200}
              disabled={loading}
              placeholder="उदा. देहरादून, उत्तराखंड"
              className="w-full rounded-xl border border-[#ded1be] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="person2Dob"
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              जन्म तिथि <span className="text-red-600">*</span>
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
              className="mb-2 block text-sm font-semibold text-[#57120d]"
            >
              जन्म समय <span className="text-red-600">*</span>
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
          className="mb-2 block text-sm font-semibold text-[#57120d]"
        >
          अतिरिक्त प्रश्न / विशेष शंका (वैकल्पिक)
        </label>

        <textarea
          id="question"
          name="question"
          maxLength={2000}
          rows={4}
          disabled={loading}
          placeholder="मांगलिक दोष, वैवाहिक अनुकूलता, पारिवारिक सामंजस्य अथवा कोई अन्य प्रश्न जिसका समाधान आप चाहते हैं..."
          className="w-full resize-none rounded-xl border border-[#ded1be] bg-[#fffdf8] p-3 outline-none focus:border-[#a2742e] disabled:bg-gray-100"
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

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#8b2418] px-6 py-4 font-semibold text-white shadow transition hover:bg-[#68170f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "अनुरोध भेजा जा रहा है..."
          : "कुंडली मिलान परामर्श हेतु अनुरोध भेजें →"}
      </button>

      <p className="text-center text-xs text-[#806d66]">
        🔒 दोनों जातकों का जन्म विवरण व संपर्क सूत्र पूर्णतः सुरक्षित एवं गोपनीय रखा जाता है।
      </p>
    </form>
  );
}