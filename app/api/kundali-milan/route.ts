import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const schema = z.object({
  // Requester details
  name: z
    .string()
    .trim()
    .min(1, "नाम आवश्यक है।")
    .max(100),

  phone: z
    .string()
    .trim()
    .min(7, "कृपया मान्य फ़ोन या व्हाट्सएप नंबर दर्ज करें।")
    .max(25, "Phone number is too long."),

  email: z
    .string()
    .trim()
    .email("कृपया मान्य ईमेल पता दर्ज करें।")
    .or(z.literal(""))
    .optional(),

  address: z
    .string()
    .trim()
    .min(1, "निवास स्थान / पता आवश्यक है।")
    .max(500),

  // Person 1
  person1Name: z
    .string()
    .trim()
    .min(1, "Person 1 name is required.")
    .max(100),

  person1Dob: z
    .string()
    .trim()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Please enter a valid date of birth."
    ),

  person1BirthTime: z
    .string()
    .trim()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Please enter a valid birth time."
    ),

  person1BirthPlace: z
    .string()
    .trim()
    .min(1, "Person 1 birth place is required.")
    .max(200),

  // Person 2
  person2Name: z
    .string()
    .trim()
    .min(1, "Person 2 name is required.")
    .max(100),

  person2Dob: z
    .string()
    .trim()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Please enter a valid date of birth."
    ),

  person2BirthTime: z
    .string()
    .trim()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Please enter a valid birth time."
    ),

  person2BirthPlace: z
    .string()
    .trim()
    .min(1, "Person 2 birth place is required.")
    .max(200),

  question: z
    .string()
    .trim()
    .max(2000)
    .optional(),

  // Honeypot
  website: z
    .string()
    .max(0)
    .optional(),
});

export async function POST(req: Request) {
  try {
    // -----------------------------
    // READ BODY
    // -----------------------------

    const body = await req.json();

    // -----------------------------
    // VALIDATION
    // -----------------------------

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            parsed.error.issues[0]?.message ||
            "Please check your submitted information.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      name,
      phone,
      email,
      address,
      person1Name,
      person1Dob,
      person1BirthTime,
      person1BirthPlace,
      person2Name,
      person2Dob,
      person2BirthTime,
      person2BirthPlace,
      question,
      website,
    } = parsed.data;

    // -----------------------------
    // HONEYPOT
    // -----------------------------

    if (website) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Your Kundali Milan request has been submitted successfully.",
        },
        {
          status: 201,
        }
      );
    }

    // -----------------------------
    // GET CLIENT IP
    // -----------------------------

    const forwardedFor =
      req.headers.get("x-forwarded-for");

    const realIp =
      req.headers.get("x-real-ip");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      realIp ||
      "unknown";

    // -----------------------------
    // RATE LIMIT
    // -----------------------------

    const rate = await checkRateLimit(
      `kundali:${ip}`
    );

    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              rate.retryAfter || 900
            ),
          },
        }
      );
    }

    // -----------------------------
    // DOB VALIDATION
    // -----------------------------

    const d1 = new Date(
      `${person1Dob}T00:00:00`
    );

    const d2 = new Date(
      `${person2Dob}T00:00:00`
    );

    if (
      Number.isNaN(d1.getTime()) ||
      Number.isNaN(d2.getTime()) ||
      d1 > new Date() ||
      d2 > new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter valid dates of birth.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // SAVE TO DATABASE
    // -----------------------------

    const submission =
      await prisma.submission.create({
        data: {
          type: "KUNDALI_MILAN",

          // Requester details
          name,
          phone,
          email: email || null,
          address,

          // Person 1
          person1Name,
          person1Dob,
          person1BirthTime,
          person1BirthPlace,

          // Person 2
          person2Name,
          person2Dob,
          person2BirthTime,
          person2BirthPlace,

          // Additional question
          question: question || "",
        },
      });

    // -----------------------------
    // EMAIL
    // -----------------------------

    const cleanPhoneDigits = phone.replace(/\D/g, "");
    const waLink = cleanPhoneDigits.length >= 10
      ? `https://wa.me/${cleanPhoneDigits.length === 10 ? "91" + cleanPhoneDigits : cleanPhoneDigits}`
      : null;

    const { data, error } =
      await resend.emails.send({
        from:
          process.env.RESEND_FROM ||
          "Shree Nakshatralok <onboarding@resend.dev>",

        to: [process.env.CLIENT_EMAIL!],

        subject:
          `New Kundali Milan Request - ${person1Name} & ${person2Name} (${phone})`,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; color: #333; line-height: 1.6;">
            <h2 style="color: #68170f; border-bottom: 2px solid #68170f; padding-bottom: 8px;">
              New Kundali Milan Request (कुंडली मिलान परामर्श अनुरोध)
            </h2>

            <div style="background-color: #fff8ee; border: 1px solid #ebd3b0; border-radius: 8px; padding: 15px; margin: 15px 0;">
              <h3 style="margin-top: 0; color: #8b2418;">Requester Contact Details (परामर्शकर्ता)</h3>
              <p style="margin: 6px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p style="margin: 6px 0; font-size: 16px;">
                <strong>Phone / Call:</strong> <a href="tel:${escapeHtml(phone)}" style="color: #8b2418; font-weight: bold; font-size: 17px;">${escapeHtml(phone)}</a>
              </p>
              ${waLink ? `
                <p style="margin: 6px 0;">
                  <strong>WhatsApp:</strong> <a href="${waLink}" style="background-color: #25d366; color: white; padding: 4px 10px; border-radius: 4px; text-decoration: none; font-weight: bold; display: inline-block;">Open WhatsApp Chat ↗</a>
                </p>
              ` : ""}
              ${email ? `
                <p style="margin: 6px 0;">
                  <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #0b5394;">${escapeHtml(email)}</a>
                </p>
              ` : '<p style="margin: 6px 0; color: #888;">Email: Not provided</p>'}
              <p style="margin: 6px 0;"><strong>Address:</strong> ${escapeHtml(address)}</p>
            </div>

            <div style="display: flex; gap: 20px; margin-top: 20px;">
              <div style="flex: 1; background: #fafafa; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px;">
                <h4 style="color: #68170f; margin-top: 0;">Person 1 (प्रथम जातक)</h4>
                <p><strong>Name:</strong> ${escapeHtml(person1Name)}</p>
                <p><strong>Date of Birth:</strong> ${escapeHtml(person1Dob)}</p>
                <p><strong>Time of Birth:</strong> ${escapeHtml(person1BirthTime)}</p>
                <p><strong>Birth Place:</strong> ${escapeHtml(person1BirthPlace)}</p>
              </div>

              <div style="flex: 1; background: #fafafa; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px;">
                <h4 style="color: #68170f; margin-top: 0;">Person 2 (द्वितीय जातक)</h4>
                <p><strong>Name:</strong> ${escapeHtml(person2Name)}</p>
                <p><strong>Date of Birth:</strong> ${escapeHtml(person2Dob)}</p>
                <p><strong>Time of Birth:</strong> ${escapeHtml(person2BirthTime)}</p>
                <p><strong>Birth Place:</strong> ${escapeHtml(person2BirthPlace)}</p>
              </div>
            </div>

            <h4 style="color: #57120d; margin-top: 20px;">Additional Question:</h4>
            <div style="background: #fbfbfb; border-left: 4px solid #8b2418; padding: 10px 14px; white-space: pre-wrap;">
              ${escapeHtml(question || "No additional question")}
            </div>

            <hr style="margin-top: 25px; border: none; border-top: 1px solid #eee;" />
            <p style="color: #777; font-size: 12px;">
              Submission ID: ${submission.id} · Saved in Admin Portal.
            </p>
          </div>
        `,

        text: `
New Kundali Milan Request

REQUESTER CONTACT DETAILS
Name: ${name}
Phone: ${phone}
${waLink ? `WhatsApp: ${waLink}` : ""}
Email: ${email || "Not provided"}
Address: ${address}

PERSON 1
Name: ${person1Name}
Date of Birth: ${person1Dob}
Time of Birth: ${person1BirthTime}
Birth Place: ${person1BirthPlace}

PERSON 2
Name: ${person2Name}
Date of Birth: ${person2Dob}
Time of Birth: ${person2BirthTime}
Birth Place: ${person2BirthPlace}

Question:
${question || "None"}

This request has also been saved in the admin dashboard.
Submission ID: ${submission.id}
        `,
      });

    // -----------------------------
    // EMAIL FAILURE
    // -----------------------------

    if (error) {
      console.error(
        "Resend error:",
        error
      );

      return NextResponse.json(
        {
          success: true,
          emailSent: false,
          message:
            "Your request was saved successfully, but the email notification could not be sent.",
          id: submission.id,
        },
        {
          status: 201,
        }
      );
    }

    // -----------------------------
    // SUCCESS
    // -----------------------------

    console.log(
      "Kundali Milan email sent:",
      data?.id
    );

    return NextResponse.json(
      {
        success: true,
        emailSent: true,
        message:
          "Your Kundali Milan request has been submitted successfully. We will contact you soon.",
        id: submission.id,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Kundali Milan submission error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to submit your request. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}

// -----------------------------
// HTML ESCAPING
// -----------------------------

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}