/**
 * Converts a text title into an SEO-friendly, URL-safe slug.
 */
export function slugify(text: string): string {
  if (!text) return "";

  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accent marks
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid characters
    .replace(/\s+/g, "-") // replace whitespace with hyphens
    .replace(/-+/g, "-") // collapse consecutive hyphens
    .replace(/^-+|-+$/g, ""); // trim leading and trailing hyphens

  return slug || "post-" + Math.random().toString(36).substring(2, 8);
}
