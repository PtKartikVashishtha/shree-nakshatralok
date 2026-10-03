"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/lib/slug";
import { sanitizeHtml } from "@/lib/sanitize";

export type BlogFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  author: string;
  status: "DRAFT" | "PUBLISHED";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalUrl: string;
};

type Props = {
  initialData?: BlogFormData;
  isEditing?: boolean;
};

const CATEGORIES = [
  "Jyotish",
  "Ayurveda",
  "Spirituality",
  "Vedic Knowledge",
  "Panchang",
  "Muhurat",
  "Graha Dosh",
  "Vastu",
  "General",
];

export default function BlogEditor({ initialData, isEditing = false }: Props) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const featuredFileInputRef = useRef<HTMLInputElement>(null);
  const contentFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<BlogFormData>(
    initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Jyotish",
      featuredImage: "",
      author: "Pt. Radhey Shyam Sharma",
      status: "DRAFT",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      canonicalUrl: "",
    }
  );

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [activeFormTab, setActiveFormTab] = useState<"content" | "media" | "seo">("content");
  const [customSlugLocked, setCustomSlugLocked] = useState(isEditing);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingContentImg, setUploadingContentImg] = useState(false);
  const [showUrlImagePrompt, setShowUrlImagePrompt] = useState(false);
  const [manualImageUrl, setManualImageUrl] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle title change & auto-generate slug if unlocked
  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (!customSlugLocked && !isEditing) {
        updated.slug = slugify(val);
      }
      return updated;
    });
  };

  // Helper to insert tags or blocks into textarea at cursor position
  const insertFormatting = (before: string, after: string = "", defaultText: string = "") => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selection = text.substring(start, end) || defaultText;

    const replacement = `${before}${selection}${after}`;
    const newContent = text.substring(0, start) + replacement + text.substring(end);

    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selection.length);
    }, 10);
  };

  // Insert a web link with friendly prompt
  const handleInsertLink = () => {
    const url = window.prompt("वेबसाइट लिंक (URL) दर्ज करें (उदा. https://...):", "https://");
    if (!url || url.trim() === "https://") return;
    const linkText = window.prompt("लिंक पर दिखने वाला शब्द (Link text):", "यहाँ क्लिक करें") || "यहाँ क्लिक करें";
    insertFormatting(`<a href="${url.trim()}" target="_blank" class="text-[#8c251d] underline hover:text-[#57120d]">`, "</a>", linkText);
  };

  // Local File Upload for Content Images (directly from user's computer / phone)
  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingContentImg(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "फोटो अपलोड नहीं हो सकी।");
      }

      const imgHtml = `\n<figure class="my-6 text-center">\n  <img src="${json.url}" alt="${formData.title || "श्री नक्षत्रलोक"}" class="rounded-2xl shadow-md mx-auto max-w-full border border-[#ded1be]" />\n</figure>\n`;
      insertFormatting(imgHtml, "", "");
      setSuccessMsg("✓ फोटो सफलतापूर्वक लेख में जुड़ गई!");
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "फोटो अपलोड विफल रही। कृपया JPG या PNG फाइल चुनें।");
    } finally {
      setUploadingContentImg(false);
      if (contentFileInputRef.current) contentFileInputRef.current.value = "";
    }
  };

  // Upload handler for Featured Cover Image
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFeatured(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "फोटो अपलोड नहीं हो सकी।");
      }

      setFormData((prev) => ({ ...prev, featuredImage: json.url }));
      setSuccessMsg("✓ मुख्य फोटो सफलतापूर्वक अपलोड हो गई!");
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "फोटो अपलोड विफल रही।");
    } finally {
      setUploadingFeatured(false);
      if (featuredFileInputRef.current) featuredFileInputRef.current.value = "";
    }
  };

  // Insert manual URL image if user explicitly wants
  const handleInsertManualUrlImage = () => {
    if (!manualImageUrl.trim()) return;
    const imgHtml = `\n<figure class="my-6 text-center">\n  <img src="${manualImageUrl.trim()}" alt="${formData.title || "श्री नक्षत्रलोक"}" class="rounded-2xl shadow-md mx-auto max-w-full border border-[#ded1be]" />\n</figure>\n`;
    insertFormatting(imgHtml, "", "");
    setManualImageUrl("");
    setShowUrlImagePrompt(false);
  };

  // Quick Vedic Presets
  const insertShlokaBox = () => {
    const block = `\n<blockquote class="my-6 rounded-2xl border-l-4 border-[#b78a40] bg-[#fbf6ec] p-5 shadow-sm">\n  <p class="font-serif text-lg font-bold text-[#57120d] leading-relaxed">॥ यहाँ संस्कृत श्लोक या मंत्र लिखें ॥</p>\n  <p class="mt-2 text-sm text-[#735e52] italic">— यहाँ श्लोक का सरल हिंदी अर्थ लिखें</p>\n</blockquote>\n`;
    insertFormatting(block, "", "");
  };

  const insertRemedyBox = () => {
    const block = `\n<div class="my-6 rounded-2xl border border-[#e2d5c3] bg-[#fffcf5] p-5 shadow-sm">\n  <h4 class="font-serif text-base font-bold text-[#8c251d] flex items-center gap-2">✨ विशेष ज्योतिषीय उपाय:</h4>\n  <ul class="mt-2 list-disc pl-5 space-y-1 text-sm text-[#5a483e]">\n    <li>प्रथम उपाय यहाँ लिखें...</li>\n    <li>द्वितीय उपाय यहाँ लिखें...</li>\n  </ul>\n</div>\n`;
    insertFormatting(block, "", "");
  };

  // Word count & reading time
  const wordCount = formData.content
    ? formData.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Submit handler
  const handleSubmit = async (targetStatus?: "DRAFT" | "PUBLISHED") => {
    setErrorMsg("");
    setSuccessMsg("");
    setSaving(true);

    const payload = {
      ...formData,
      status: targetStatus || formData.status,
    };

    if (!payload.title.trim()) {
      setErrorMsg("कृपया लेख का शीर्षक दर्ज करें।");
      setSaving(false);
      return;
    }

    if (!payload.excerpt.trim()) {
      setErrorMsg("कृपया लेख का संक्षिप्त विवरण (1-2 पंक्तियाँ) दर्ज करें।");
      setSaving(false);
      return;
    }

    if (!payload.content.trim()) {
      setErrorMsg("लेख की मुख्य सामग्री खाली नहीं हो सकती।");
      setSaving(false);
      return;
    }

    try {
      const url = isEditing && initialData?.id
        ? `/api/admin/blog/${initialData.id}`
        : "/api/admin/blog";

      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "लेख सुरक्षित नहीं हो सका।");
      }

      setSuccessMsg(
        isEditing
          ? "✓ लेख सफलतापूर्वक अपडेट हो गया!"
          : "✓ नया लेख सफलतापूर्वक बन गया!"
      );

      setTimeout(() => {
        router.push("/admin/blog");
        router.refresh();
      }, 900);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "सुरक्षित करते समय कोई त्रुटि हुई।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HIDDEN FILE INPUT FOR CONTENT BODY IMAGES */}
      <input
        type="file"
        ref={contentFileInputRef}
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleContentImageUpload}
        className="hidden"
      />

      {/* HEADER CONTROLS */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#ddcfbb] pb-5">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c7462] hover:text-[#57120d] transition"
          >
            ← सभी लेखों की सूची पर वापस जाएं (Back)
          </Link>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-[#57120d]">
            {isEditing ? "लेख सम्पादन (Edit Article)" : "नया लेख लिखें (Write New Article)"}
          </h1>
          <p className="text-xs text-[#806d63] mt-0.5">
            सरल और सहज सम्पादक — बिना तकनीकी ज्ञान के सुंदर लेख लिखें
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleSubmit("DRAFT")}
            disabled={saving}
            className="rounded-xl border border-[#d8cbb8] bg-[#fffdf8] px-4 py-2.5 text-xs font-semibold text-[#665449] shadow-sm hover:bg-[#f6eee2] transition disabled:opacity-50 flex items-center gap-1.5"
          >
            <span>📝</span>
            <span>{saving ? "सुरक्षित हो रहा है..." : "ड्राफ्ट सुरक्षित रखें (Save Draft)"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={saving}
            className="rounded-xl bg-[#5c130d] px-5 py-2.5 text-xs font-bold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition disabled:opacity-50 flex items-center gap-2"
          >
            <span>✦</span>
            <span>{saving ? "प्रकाशित हो रहा है..." : "लेख प्रकाशित करें (Publish Live)"}</span>
          </button>
        </div>
      </div>

      {/* NOTIFICATION MESSAGES */}
      {errorMsg && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 flex items-center gap-2 shadow-sm">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800 flex items-center gap-2 shadow-sm">
          <span>✓</span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* EASY WRITING GUIDE BANNER (Toggleable) */}
      <div className="rounded-2xl border border-[#e5d8c6] bg-[#fbf7ee] p-4 text-xs text-[#574438] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-[#57120d]">
            <span>💡</span>
            <span>लेख लिखने के आसान निर्देश (Easy Writing Guide)</span>
          </div>
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="text-xs font-semibold text-[#8c251d] hover:underline"
          >
            {showGuide ? "निर्देश छिपाएं ▲" : "निर्देश देखें ▼"}
          </button>
        </div>

        {showGuide && (
          <div className="mt-3 pt-3 border-t border-[#eedfc9] grid gap-2 sm:grid-cols-2 text-xs leading-relaxed text-[#685549]">
            <div className="space-y-1">
              <p>• <strong>शीर्षक (Title):</strong> अपने लेख का मुख्य नाम लिखें (उदा. &quot;बृहस्पति ग्रह का जीवन पर प्रभाव&quot;)।</p>
              <p>• <strong>फोटो लगाना:</strong> <strong>&quot;📷 फोटो अपलोड&quot;</strong> बटन दबाएं और अपने कंप्यूटर या फोन से सीधे फोटो चुनें।</p>
              <p>• <strong>हेडिंग बनाना:</strong> किसी भी जरूरी विषय को अलग से दिखाने के लिए <strong>&quot;📌 मुख्य हेडिंग&quot;</strong> दबाएं।</p>
            </div>
            <div className="space-y-1">
              <p>• <strong>श्लोक / मंत्र:</strong> <strong>&quot;📜 श्लोक / सुविचार&quot;</strong> दबाकर सुंदर बॉक्स में मंत्र व उसका अर्थ लिखें।</p>
              <p>• <strong>पूर्वावलोकन:</strong> ऊपर दाईं ओर <strong>&quot;👁️ पूर्वावलोकन (Preview)&quot;</strong> दबाकर देखें कि आपका लेख पाठकों को कैसा दिखेगा।</p>
              <p>• <strong>सुरक्षित करना:</strong> पूरा होने पर ऊपर दिए गए <strong>&quot;✦ प्रकाशित करें&quot;</strong> बटन पर क्लिक करें।</p>
            </div>
          </div>
        )}
      </div>

      {/* TABS FOR SECTIONS */}
      <div className="flex items-center gap-2 border-b border-[#e2d5c3]">
        <button
          type="button"
          onClick={() => setActiveFormTab("content")}
          className={`border-b-2 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeFormTab === "content"
              ? "border-[#57120d] text-[#57120d] bg-[#fbf6ee] rounded-t-xl"
              : "border-transparent text-[#8a7668] hover:text-[#57120d]"
          }`}
        >
          <span>✍️</span>
          <span>1. लेख और सामग्री (Article)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("media")}
          className={`border-b-2 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeFormTab === "media"
              ? "border-[#57120d] text-[#57120d] bg-[#fbf6ee] rounded-t-xl"
              : "border-transparent text-[#8a7668] hover:text-[#57120d]"
          }`}
        >
          <span>🖼️</span>
          <span>2. मुख्य फोटो व श्रेणी (Photo & Category)</span>
          {formData.featuredImage && <span className="text-green-600 text-xs font-bold">✓</span>}
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("seo")}
          className={`border-b-2 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeFormTab === "seo"
              ? "border-[#57120d] text-[#57120d] bg-[#fbf6ee] rounded-t-xl"
              : "border-transparent text-[#8a7668] hover:text-[#57120d]"
          }`}
        >
          <span>🔍</span>
          <span>3. सर्च सेटिंग्स (SEO - Optional)</span>
        </button>
      </div>

      {/* TAB 1: CONTENT */}
      {activeFormTab === "content" && (
        <div className="space-y-6">
          {/* TITLE & EXCERPT */}
          <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-5 sm:p-7 shadow-sm space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a2742e]">
                  लेख का शीर्षक (Article Title) *
                </label>
                <span className="text-[11px] text-[#958275]">हिंदी या अंग्रेजी दोनों में लिख सकते हैं</span>
              </div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="उदा. वैदिक ज्योतिष में बृहस्पति ग्रह का महत्व और उसके चमत्कारी उपाय"
                className="mt-2 w-full rounded-2xl border border-[#e0d4c3] bg-[#fbf7ef] p-4 font-serif text-lg sm:text-xl font-medium text-[#3b2520] outline-none placeholder:text-[#aa9a8e] focus:border-[#b78a40] focus:bg-white transition"
              />
            </div>

            {/* SHORT EXCERPT */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a48d7b]">
                  संक्षिप्त विवरण (Short Summary) *
                </label>
                <span className="text-[11px] text-[#958275]">पाठकों को लेख सूची में दिखने वाली 1-2 पंक्तियाँ</span>
              </div>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="उदा. इस लेख में जानें कि कुंडली में गुरु ग्रह के शुभ-अशुभ प्रभाव क्या होते हैं और सुख-समृद्धि हेतु सरल उपाय..."
                className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none placeholder:text-[#aa9a8e] focus:border-[#b78a40] focus:bg-white leading-relaxed"
              />
            </div>

            {/* SLUG HELPER */}
            <div className="pt-2 border-t border-[#f0e6d6]">
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#8c7462]">
                  <span className="font-semibold text-[#57120d]">वेबसाइट लिंक (URL): </span>
                  <span className="font-mono text-[#a59589]">/blog/</span>
                  <span className="font-mono font-medium text-[#57120d]">{formData.slug || "your-article-link"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomSlugLocked(!customSlugLocked)}
                  className="text-xs text-[#8c7462] hover:text-[#57120d] underline"
                >
                  {customSlugLocked ? "🔓 लिंक बदलें" : "🔒 लिंक लॉक करें"}
                </button>
              </div>

              {!customSlugLocked && (
                <div className="mt-2 flex items-center rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] px-3 py-1.5 text-xs text-[#6e5d54]">
                  <span className="text-[#a59589]">/blog/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        slug: slugify(e.target.value),
                      }))
                    }
                    className="ml-1 w-full bg-transparent font-mono outline-none text-[#57120d]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* MAIN WRITING WORKSPACE */}
          <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] shadow-sm overflow-hidden">
            {/* RICH TOOLBAR */}
            <div className="border-b border-[#e7dccd] bg-[#faf5eb] p-3 sm:p-4 space-y-2.5">
              {/* PRIMARY FORMATTING BUTTONS */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {/* HEADING BUTTON */}
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n<h2>", "</h2>\n", "मुख्य हेडिंग यहाँ लिखें")}
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-3 py-2 text-xs font-bold text-[#57120d] hover:bg-[#ede3d1] hover:border-[#b78a40] transition flex items-center gap-1 shadow-2xs"
                    title="मुख्य हेडिंग (Heading 2)"
                  >
                    <span>📌</span>
                    <span>मुख्य हेडिंग</span>
                  </button>

                  {/* SUB HEADING BUTTON */}
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n<h3>", "</h3>\n", "उप-हेडिंग यहाँ लिखें")}
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-3 py-2 text-xs font-semibold text-[#57120d] hover:bg-[#ede3d1] transition flex items-center gap-1 shadow-2xs"
                    title="उप-हेडिंग (Sub-heading 3)"
                  >
                    <span>📝</span>
                    <span>उप-हेडिंग</span>
                  </button>

                  {/* PARAGRAPH BUTTON */}
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n<p>", "</p>\n", "पैराग्राफ यहाँ लिखें...")}
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-3 py-2 text-xs text-[#57120d] hover:bg-[#ede3d1] transition flex items-center gap-1 shadow-2xs"
                    title="नया पैराग्राफ"
                  >
                    <span>✍️</span>
                    <span>पैराग्राफ</span>
                  </button>

                  <span className="hidden sm:inline-block h-6 w-px bg-[#d8cbb8] mx-0.5" />

                  {/* BOLD */}
                  <button
                    type="button"
                    onClick={() => insertFormatting("<strong>", "</strong>", "महत्वपूर्ण शब्द")}
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-2.5 py-2 text-xs font-bold text-[#3b2520] hover:bg-[#ede3d1] transition shadow-2xs"
                    title="बोल्ड (गहरे अक्षर)"
                  >
                    𝗕 बोल्ड
                  </button>

                  {/* ITALIC */}
                  <button
                    type="button"
                    onClick={() => insertFormatting("<em>", "</em>", "विशेष शब्द")}
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-2.5 py-2 text-xs italic text-[#3b2520] hover:bg-[#ede3d1] transition shadow-2xs"
                    title="इटैलिक (तिरछे अक्षर)"
                  >
                    𝘐 इटैलिक
                  </button>

                  <span className="hidden sm:inline-block h-6 w-px bg-[#d8cbb8] mx-0.5" />

                  {/* VEDIC SHLOKA / QUOTE */}
                  <button
                    type="button"
                    onClick={insertShlokaBox}
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-3 py-2 text-xs font-medium text-[#7d2019] hover:bg-[#ede3d1] transition flex items-center gap-1.5 shadow-2xs"
                    title="संस्कृत श्लोक या अनमोल वचन"
                  >
                    <span>📜</span>
                    <span>श्लोक / सुविचार</span>
                  </button>

                  {/* BULLET LIST */}
                  <button
                    type="button"
                    onClick={() =>
                      insertFormatting(
                        "\n<ul class=\"list-disc pl-5 my-4 space-y-1.5\">\n  <li>",
                        "</li>\n  <li>दूसरा बिंदु यहाँ लिखें</li>\n  <li>तीसरा बिंदु यहाँ लिखें</li>\n</ul>\n",
                        "पहला बिंदु यहाँ लिखें"
                      )
                    }
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-3 py-2 text-xs text-[#3b2520] hover:bg-[#ede3d1] transition flex items-center gap-1 shadow-2xs"
                    title="बिंदुवार सूची (Bullet Points)"
                  >
                    <span>📋</span>
                    <span>बिंदु सूची</span>
                  </button>

                  {/* NUMBERED LIST */}
                  <button
                    type="button"
                    onClick={() =>
                      insertFormatting(
                        "\n<ol class=\"list-decimal pl-5 my-4 space-y-1.5\">\n  <li>",
                        "</li>\n  <li>दूसरा नियम/बिंदु</li>\n  <li>तीसरा नियम/बिंदु</li>\n</ol>\n",
                        "पहला नियम/बिंदु"
                      )
                    }
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-3 py-2 text-xs text-[#3b2520] hover:bg-[#ede3d1] transition flex items-center gap-1 shadow-2xs"
                    title="क्रमवार सूची (1, 2, 3)"
                  >
                    <span>🔢</span>
                    <span>1,2,3 सूची</span>
                  </button>
                </div>

                {/* TAB TOGGLE: EDITOR VS VISUAL PREVIEW */}
                <div className="flex items-center gap-1 rounded-xl bg-[#e8ded0] p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`rounded-lg px-3.5 py-1.5 font-bold transition flex items-center gap-1 ${
                      activeTab === "write"
                        ? "bg-[#fffdf8] text-[#57120d] shadow-sm"
                        : "text-[#7a675a] hover:text-[#57120d]"
                    }`}
                  >
                    <span>✍️</span>
                    <span>लेखन (Write)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`rounded-lg px-3.5 py-1.5 font-bold transition flex items-center gap-1 ${
                      activeTab === "preview"
                        ? "bg-[#fffdf8] text-[#57120d] shadow-sm"
                        : "text-[#7a675a] hover:text-[#57120d]"
                    }`}
                  >
                    <span>👁️</span>
                    <span>पूर्वावलोकन (Preview)</span>
                  </button>
                </div>
              </div>

              {/* SECONDARY ROW: DEVICE IMAGE UPLOAD & PRESET TEMPLATES */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#ede0d0]">
                <div className="flex flex-wrap items-center gap-2">
                  {/* DIRECT LOCAL DEVICE IMAGE UPLOAD BUTTON */}
                  <button
                    type="button"
                    onClick={() => contentFileInputRef.current?.click()}
                    disabled={uploadingContentImg}
                    className="rounded-xl bg-[#8c251d] hover:bg-[#6e1c15] text-[#fff6e5] px-4 py-2 text-xs font-bold shadow-sm transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <span>📷</span>
                    <span>{uploadingContentImg ? "अपलोड हो रहा है..." : "कंप्यूटर/मोबाइल से फोटो लगाएं (Upload Photo)"}</span>
                  </button>

                  {/* OPTIONAL URL PROMPT TOGGLE */}
                  <button
                    type="button"
                    onClick={() => setShowUrlImagePrompt(!showUrlImagePrompt)}
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-3 py-2 text-xs text-[#6e5a4f] hover:bg-[#ede3d1] transition flex items-center gap-1"
                    title="इंटरनेट लिंक द्वारा फोटो लगाएं"
                  >
                    <span>🌐</span>
                    <span>फोटो लिंक (URL)</span>
                  </button>

                  {/* WEB LINK */}
                  <button
                    type="button"
                    onClick={handleInsertLink}
                    className="rounded-xl border border-[#dccbb5] bg-[#fffdf8] px-3 py-2 text-xs text-[#6e5a4f] hover:bg-[#ede3d1] transition flex items-center gap-1"
                  >
                    <span>🔗</span>
                    <span>वेब लिंक जोड़ें</span>
                  </button>

                  {/* SPECIAL REMEDY BOX */}
                  <button
                    type="button"
                    onClick={insertRemedyBox}
                    className="rounded-xl border border-[#d7ad63] bg-[#fbf6ec] px-3 py-2 text-xs font-medium text-[#7d4e12] hover:bg-[#f6ebd5] transition flex items-center gap-1"
                    title="ज्योतिषीय उपाय का आकर्षक बॉक्स"
                  >
                    <span>✨</span>
                    <span>उपाय बॉक्स</span>
                  </button>
                </div>

                <div className="text-xs text-[#8a7668]">
                  {wordCount} शब्द · पढ़ने का समय ~{readingTime} मिनट
                </div>
              </div>

              {/* EXPANDABLE URL IMAGE PROMPT */}
              {showUrlImagePrompt && (
                <div className="mt-2 rounded-xl border border-[#ded1be] bg-[#fffdf8] p-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#57120d]">फोटो का वेब लिंक (Image URL):</span>
                  <input
                    type="text"
                    value={manualImageUrl}
                    onChange={(e) => setManualImageUrl(e.target.value)}
                    placeholder="https://... या /uploads/..."
                    className="flex-1 min-w-[220px] rounded-lg border border-[#ded1be] bg-[#fbf7ef] px-3 py-1.5 text-xs text-[#3b2520] outline-none focus:border-[#b78a40]"
                  />
                  <button
                    type="button"
                    onClick={handleInsertManualUrlImage}
                    className="rounded-lg bg-[#57120d] text-[#f2d99d] px-3 py-1.5 text-xs font-bold hover:bg-[#420b08]"
                  >
                    लेख में जोड़ें
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUrlImagePrompt(false)}
                    className="text-xs text-[#8c7462] hover:text-[#57120d]"
                  >
                    रद्द करें
                  </button>
                </div>
              )}
            </div>

            {/* TAB CONTENT: WRITE MODE VS PREVIEW MODE */}
            {activeTab === "write" ? (
              <div className="p-4 sm:p-6 bg-[#fffdf8]">
                <textarea
                  ref={textareaRef}
                  rows={22}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="यहाँ अपना लेख विस्तार से लिखें... ऊपर दिए गए बटनों की सहायता से हेडिंग, श्लोक, सूची और अपने फोन/कंप्यूटर से फोटो आसानी से लगाएं।"
                  className="w-full resize-y rounded-2xl border border-[#ede3d5] bg-[#fffcf5] p-5 font-sans text-base leading-relaxed text-[#2c1815] outline-none focus:border-[#b78a40] focus:bg-white transition"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#958275] gap-2">
                  <span>💡 सलाह: किसी भी वाक्य को हेडिंग बनाने के लिए उसे चुनें और ऊपर <strong>&quot;📌 मुख्य हेडिंग&quot;</strong> पर क्लिक करें।</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className="font-bold text-[#57120d] hover:underline"
                  >
                    👁️ पूर्वावलोकन देखें →
                  </button>
                </div>
              </div>
            ) : (
              /* LIVE PREVIEW MODE */
              <div className="p-6 sm:p-10 bg-[#fffdf8] min-h-[450px]">
                <div className="max-w-3xl mx-auto">
                  <div className="inline-block rounded-full bg-[#f4ebe0] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#a2742e]">
                    {formData.category || "Jyotish"}
                  </div>

                  <h1 className="mt-4 font-serif text-3xl sm:text-4xl text-[#57120d] font-medium leading-tight">
                    {formData.title || "लेख का शीर्षक यहाँ दिखेगा"}
                  </h1>

                  {formData.excerpt && (
                    <p className="mt-4 text-base italic text-[#6e5d54] border-l-3 border-[#d7ad63] pl-4 bg-[#fcf9f2] py-2 rounded-r-xl">
                      {formData.excerpt}
                    </p>
                  )}

                  {formData.featuredImage && (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-[#e5d8c6] shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.featuredImage}
                        alt={formData.title}
                        className="w-full max-h-96 object-cover"
                      />
                    </div>
                  )}

                  <div
                    className="mt-8 space-y-4 text-base leading-8 text-[#53433b] prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(formData.content || "<p class='text-[#99887e] italic'>अभी कोई सामग्री नहीं लिखी गई है। 'लेखन' टैब में जाकर लिखें।</p>"),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FEATURED IMAGE & CATEGORY */}
      {activeFormTab === "media" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* FEATURED IMAGE UPLOAD (LOCAL FIRST) */}
          <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#57120d]">
                मुख्य आवरण फोटो (Featured Cover Photo)
              </h3>
              <p className="text-xs text-[#806d63] mt-1">
                यह फोटो लेख की मुख्य पहचान होगी और वेबसाइट के मुख्य पृष्ठ व सोशल मीडिया पर दिखेगी।
              </p>
            </div>

            {/* BIG CLICK-TO-UPLOAD BUTTON FOR DEVICE */}
            <div className="rounded-2xl border-2 border-dashed border-[#d8cbb8] bg-[#fbf7ef] p-6 text-center hover:border-[#b78a40] transition">
              <input
                type="file"
                ref={featuredFileInputRef}
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFeaturedImageUpload}
                className="hidden"
              />

              <div className="text-3xl mb-2">📁</div>
              <button
                type="button"
                onClick={() => featuredFileInputRef.current?.click()}
                disabled={uploadingFeatured}
                className="rounded-xl bg-[#5c130d] px-5 py-2.5 text-xs font-bold text-[#f2d99d] shadow-sm hover:bg-[#420b08] transition disabled:opacity-50"
              >
                {uploadingFeatured ? "फोटो अपलोड हो रही है..." : "कंप्यूटर या मोबाइल से फोटो चुनें (Upload from Device)"}
              </button>
              <p className="mt-2 text-[11px] text-[#8c7462]">
                JPG, PNG या WEBP फाइलें स्वीकार्य हैं (अधिकतम 5MB)
              </p>
            </div>

            {/* PREVIEW OF FEATURED IMAGE */}
            {formData.featuredImage ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#57120d]">✓ चुनी गई फोटो:</span>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, featuredImage: "" }))}
                    className="text-red-700 hover:underline font-semibold"
                  >
                    🗑️ फोटो हटाएं (Remove)
                  </button>
                </div>
                <div className="overflow-hidden rounded-2xl border border-[#d8cbb8] shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.featuredImage}
                    alt="Featured preview"
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-[#f5ede2] p-4 text-xs text-[#7e695d] text-center">
                अभी कोई मुख्य फोटो नहीं चुनी गई है।
              </div>
            )}

            {/* OPTIONAL URL FIELD */}
            <div className="pt-3 border-t border-[#f0e6d6]">
              <label className="block text-[11px] font-bold text-[#8c7462]">
                या फोटो का इंटरनेट लिंक (Image URL) दर्ज करें:
              </label>
              <input
                type="text"
                value={formData.featuredImage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featuredImage: e.target.value,
                  }))
                }
                placeholder="https://images.unsplash.com/... या /og-image.jpg"
                className="mt-1.5 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-2.5 text-xs text-[#3b2520] outline-none focus:border-[#b78a40]"
              />
            </div>
          </div>

          {/* CATEGORY & AUTHOR */}
          <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm space-y-5">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#57120d]">
                श्रेणी और लेखक (Category & Author)
              </h3>
              <p className="text-xs text-[#806d63] mt-1">
                लेख का विषय चुनें ताकि पाठक इसे आसानी से ढूंढ सकें।
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#a2742e]">
                लेख की श्रेणी (Category) *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#a48d7b]">
                लेखक का नाम (Author Name)
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, author: e.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#a48d7b]">
                प्रकाशन स्थिति (Status)
              </label>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, status: "DRAFT" }))
                  }
                  className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                    formData.status === "DRAFT"
                      ? "border-amber-400 bg-amber-50 text-amber-900 font-bold"
                      : "border-[#d8cbb8] text-[#78665a] hover:bg-[#f6eee2]"
                  }`}
                >
                  📝 ड्राफ्ट (अप्रकाशित)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, status: "PUBLISHED" }))
                  }
                  className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                    formData.status === "PUBLISHED"
                      ? "border-green-400 bg-green-50 text-green-900 font-bold"
                      : "border-[#d8cbb8] text-[#78665a] hover:bg-[#f6eee2]"
                  }`}
                >
                  ✓ लाइव (सार्वजनिक)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEO */}
      {activeFormTab === "seo" && (
        <div className="rounded-3xl border border-[#ded1be] bg-[#fffdf8] p-6 shadow-sm space-y-5 max-w-3xl">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#57120d]">
              सर्च इंजन सेटिंग्स (SEO & Google Search Settings)
            </h3>
            <p className="text-xs text-[#806d63] mt-1">
              यह सेटिंग्स वैकल्पिक (optional) हैं। यदि आप इन्हें खाली छोड़ते हैं, तो आपका शीर्षक और संक्षिप्त विवरण अपने आप उपयोग हो जाएगा।
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#a2742e]">
              कस्टम SEO शीर्षक (Custom SEO Title)
            </label>
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))
              }
              placeholder="उदा. Brihaspati Grah Upay & Significance | Shree Nakshatralok"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
            <p className="mt-1 text-xs text-[#958275]">
              Google पर दिखने वाला शीर्षक (सुझाव: 50-60 अक्षर)
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#a48d7b]">
              कस्टम SEO विवरण (Custom SEO Meta Description)
            </label>
            <textarea
              rows={3}
              value={formData.seoDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  seoDescription: e.target.value,
                }))
              }
              placeholder="Google सर्च रिजल्ट में शीर्षक के नीचे दिखने वाला 2 पंक्तियों का संक्षिप्त विवरण..."
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
            <p className="mt-1 text-xs text-[#958275]">
              सुझाव: 140-160 अक्षर
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#a48d7b]">
              मुख्य कीवर्ड (Keywords - अल्पविराम से अलग करें)
            </label>
            <input
              type="text"
              value={formData.seoKeywords}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, seoKeywords: e.target.value }))
              }
              placeholder="उदा. Jupiter, Brihaspati, Vedic Astrology, Jyotish Upay"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#a48d7b]">
              कैनोनिकल लिंक (Canonical URL - वैकल्पिक)
            </label>
            <input
              type="text"
              value={formData.canonicalUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  canonicalUrl: e.target.value,
                }))
              }
              placeholder="सामान्यतः खाली छोड़ दें"
              className="mt-2 w-full rounded-xl border border-[#e0d4c3] bg-[#fbf7ef] p-3 text-sm text-[#3b2520] outline-none focus:border-[#b78a40]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
