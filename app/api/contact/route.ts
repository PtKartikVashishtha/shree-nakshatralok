import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "नाम आवश्यक है।")
    .max(100, "Name must be 100 characters or less."),

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

  dob: z
    .string()
    .trim()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Please enter a valid date of birth."
    ),

  birthTime: z
    .string()
    .trim()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "Please enter a valid birth time."
    ),

  address: z
    .string()
    .trim()
    .min(1, "Address is required.")
    .max(
      500,
      "Address must be 500 characters or less."
    ),

  question: z
    .string()
    .trim()
    .min(1, "Question is required.")
    .max(
      2000,
      "Question must be 2000 characters or less."
    ),

  website: z
    .string()
    .max(0)
    .optional(),
});

export async function POST(req: Request) {
  try {
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
      `contact:${ip}`
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
      dob,
      birthTime,
      address,
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
            "Your consultation request has been submitted successfully.",
        },
        {
          status: 201,
        }
      );
    }

    // -----------------------------
    // DOB VALIDATION
    // -----------------------------

    const birthDate = new Date(
      `${dob}T00:00:00`
    );

    if (
      Number.isNaN(birthDate.getTime()) ||
      birthDate > new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid date of birth.",
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
          type: "GENERAL",
          name,
          phone,
          email: email || null,
          dob,
          birthTime,
          address,
          question,
        },
      });

    // -----------------------------
    // SEND EMAIL (WITH CONTACT RETRACE LINKS)
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
          `New Consultation Request - ${name} (${phone})`,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; color: #333; line-height: 1.6;">
            <h2 style="color: #68170f; border-bottom: 2px solid #68170f; padding-bottom: 8px;">
              New Consultation Request (नया परामर्श अनुरोध)
            </h2>

            <div style="background-color: #fff8ee; border: 1px solid #ebd3b0; border-radius: 8px; padding: 15px; margin: 15px 0;">
              <h3 style="margin-top: 0; color: #8b2418;">Contact & Follow-up Details</h3>
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
            </div>

            <h3>Birth Details & Question</h3>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Date of Birth:</strong> ${escapeHtml(dob)}</p>
            <p><strong>Time of Birth:</strong> ${escapeHtml(birthTime)}</p>
            <p><strong>Place of Birth / Address:</strong> ${escapeHtml(address)}</p>

            <h4 style="color: #57120d; margin-top: 20px;">Question / Query:</h4>
            <div style="background: #fbfbfb; border-left: 4px solid #8b2418; padding: 10px 14px; white-space: pre-wrap;">
              ${escapeHtml(question)}
            </div>

            <hr style="margin-top: 25px; border: none; border-top: 1px solid #eee;" />
            <p style="color: #777; font-size: 12px;">
              Submission ID: ${submission.id} · Saved in Admin Portal.
            </p>
          </div>
        `,

        text: `
New Consultation Request

Customer Contact Details:
Name: ${name}
Phone: ${phone}
${waLink ? `WhatsApp: ${waLink}` : ""}
Email: ${email || "Not provided"}

Birth Details:
Date of Birth: ${dob}
Time of Birth: ${birthTime}
Address / Place of Birth: ${address}

Question:
${question}

This request has also been saved in the admin dashboard.
Submission ID: ${submission.id}
        `,
      });

    // -----------------------------
    // EMAIL FAILED
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
      "Email sent:",
      data?.id
    );

    return NextResponse.json(
      {
        success: true,
        emailSent: true,
        message:
          "Your consultation request has been submitted successfully. We will contact you soon.",
        id: submission.id,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(
      "Contact submission error:",
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}