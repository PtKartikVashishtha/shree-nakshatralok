import { z } from "zod";

export const panchangSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  dayName: z
    .string()
    .min(2, "Day name is required")
    .max(50, "Day name is too long")
    .trim(),
  location: z
    .string()
    .min(2, "Location is required")
    .max(120, "Location is too long")
    .trim()
    .default("Muzaffarnagar, Uttar Pradesh"),
  sunrise: z
    .string()
    .min(2, "Sunrise timing is required")
    .max(50)
    .trim(),
  sunset: z
    .string()
    .min(2, "Sunset timing is required")
    .max(50)
    .trim(),
  moonrise: z.string().max(50).trim().optional().or(z.literal("")),
  moonset: z.string().max(50).trim().optional().or(z.literal("")),
  tithi: z
    .string()
    .min(2, "Tithi is required")
    .max(120)
    .trim(),
  nakshatra: z
    .string()
    .min(2, "Nakshatra is required")
    .max(120)
    .trim(),
  yoga: z
    .string()
    .min(2, "Yoga is required")
    .max(120)
    .trim(),
  karana: z
    .string()
    .min(2, "Karana is required")
    .max(120)
    .trim(),
  paksha: z
    .string()
    .min(2, "Paksha is required")
    .max(50)
    .trim(),
  vikramSamvat: z.string().max(50).trim().optional().or(z.literal("")),
  shakaSamvat: z.string().max(50).trim().optional().or(z.literal("")),
  ayana: z.string().max(50).trim().optional().or(z.literal("")),
  ritu: z.string().max(50).trim().optional().or(z.literal("")),
  moonSign: z.string().max(80).trim().optional().or(z.literal("")),
  sunSign: z.string().max(80).trim().optional().or(z.literal("")),
  rahukaal: z.string().max(80).trim().optional().or(z.literal("")),
  yamaganda: z.string().max(80).trim().optional().or(z.literal("")),
  gulikaKaal: z.string().max(80).trim().optional().or(z.literal("")),
  abhijitMuhurat: z.string().max(80).trim().optional().or(z.literal("")),
  brahmaMuhurat: z.string().max(80).trim().optional().or(z.literal("")),
  auspiciousTimings: z.string().max(500).trim().optional().or(z.literal("")),
  inauspiciousTimings: z.string().max(500).trim().optional().or(z.literal("")),
  festivals: z.string().max(500).trim().optional().or(z.literal("")),
  specialNotes: z.string().max(1000).trim().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
});

export type PanchangInput = z.infer<typeof panchangSchema>;
