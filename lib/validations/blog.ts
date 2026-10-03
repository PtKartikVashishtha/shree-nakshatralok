import { z } from "zod";

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(250, "Title must not exceed 250 characters")
    .trim(),
  slug: z
    .string()
    .max(250)
    .trim()
    .optional(),
  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(1000, "Excerpt must not exceed 1000 characters")
    .trim(),
  content: z
    .string()
    .min(20, "Content must be at least 20 characters"),
  category: z
    .string()
    .min(2, "Category is required")
    .max(100, "Category must not exceed 100 characters")
    .trim(),
  featuredImage: z
    .string()
    .max(1000)
    .trim()
    .optional()
    .or(z.literal("")),
  author: z
    .string()
    .max(150)
    .trim()
    .default("Pt. Radhey Shyam Sharma"),
  status: z
    .enum(["DRAFT", "PUBLISHED"])
    .default("DRAFT"),
  seoTitle: z
    .string()
    .max(200)
    .trim()
    .optional()
    .or(z.literal("")),
  seoDescription: z
    .string()
    .max(400)
    .trim()
    .optional()
    .or(z.literal("")),
  seoKeywords: z
    .string()
    .max(400)
    .trim()
    .optional()
    .or(z.literal("")),
  canonicalUrl: z
    .string()
    .max(500)
    .trim()
    .optional()
    .or(z.literal("")),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
