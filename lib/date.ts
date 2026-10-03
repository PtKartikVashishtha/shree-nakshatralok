// Deterministic Hindi date formatting to guarantee 100% hydration consistency
// between server (Node.js ICU) and client browser (V8/WebKit ICU).

export const HINDI_MONTHS = [
  "जनवरी",
  "फ़रवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर",
];

export const HINDI_WEEKDAYS = [
  "रविवार",
  "सोमवार",
  "मंगलवार",
  "बुधवार",
  "गुरुवार",
  "शुक्रवार",
  "शनिवार",
];

export function formatHindiDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return "";

  const day = d.getDate();
  const month = HINDI_MONTHS[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatHindiDateWithDay(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return "";

  const weekday = HINDI_WEEKDAYS[d.getDay()];
  const day = d.getDate();
  const month = HINDI_MONTHS[d.getMonth()];
  const year = d.getFullYear();

  return `${weekday}, ${day} ${month} ${year}`;
}
