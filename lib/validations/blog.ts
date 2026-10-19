import { z } from "zod";

export const blogPostSchema = z.object({
  id: z
    .string()
    .optional()
    .nullable(),
  title: z
    .string()
    .min(1, "शीर्षक आवश्यक है (Title is required)")
    .max(300, "शीर्षक 300 अक्षरों से अधिक नहीं होना चाहिए")
    .trim(),
  slug: z
    .string()
    .max(300)
    .trim()
    .optional()
    .nullable()
    .or(z.literal("")),
  excerpt: z
    .string()
    .min(1, "संक्षिप्त विवरण आवश्यक है (Excerpt is required)")
    .max(2000, "संक्षिप्त विवरण 2000 अक्षरों से अधिक नहीं होना चाहिए")
    .trim(),
  content: z
    .string()
    .min(1, "लेख की सामग्री आवश्यक है (Content is required)"),
  category: z
    .string()
    .min(1, "श्रेणी आवश्यक है (Category is required)")
    .max(100)
    .trim()
    .default("General"),
  featuredImage: z
    .string()
    .trim()
    .optional()
    .nullable()
    .or(z.literal("")),
  author: z
    .string()
    .max(200)
    .trim()
    .optional()
    .nullable()
    .or(z.literal(""))
    .default("Pt. Radhey Shyam Sharma"),
  status: z
    .preprocess(
      (val) => (typeof val === "string" ? val.toUpperCase() : val),
      z.enum(["DRAFT", "PUBLISHED"])
    )
    .default("DRAFT"),
  seoTitle: z
    .string()
    .max(300)
    .trim()
    .optional()
    .nullable()
    .or(z.literal("")),
  seoDescription: z
    .string()
    .max(1000)
    .trim()
    .optional()
    .nullable()
    .or(z.literal("")),
  seoKeywords: z
    .string()
    .max(1000)
    .trim()
    .optional()
    .nullable()
    .or(z.literal("")),
  canonicalUrl: z
    .string()
    .max(1000)
    .trim()
    .optional()
    .nullable()
    .or(z.literal("")),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
