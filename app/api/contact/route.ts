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
    .min(1, "Name is required.")
    .max(
      100,
      "Name must be 100 characters or less."
    ),

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
          name,
          dob,
          birthTime,
          address,
          question,
        },
      });

    // -----------------------------
    // SEND EMAIL
    // -----------------------------

    const { data, error } =
      await resend.emails.send({
        from:
          process.env.RESEND_FROM ||
          "Shree Nakshatralok <onboarding@resend.dev>",

        to: [process.env.CLIENT_EMAIL!],

        subject:
          `New Consultation Request - ${name}`,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; color: #333;">

            <h2 style="color: #68170f;">
              New Consultation Request
            </h2>

            <hr />

            <h3>Customer Details</h3>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Date of Birth:</strong>
              ${escapeHtml(dob)}
            </p>

            <p>
              <strong>Time of Birth:</strong>
              ${escapeHtml(birthTime)}
            </p>

            <p>
              <strong>Address:</strong>
              ${escapeHtml(address)}
            </p>

            <h3>Question</h3>

            <p style="white-space: pre-wrap;">
              ${escapeHtml(question)}
            </p>

            <hr />

            <p style="color: #666;">
              This request has also been saved
              in the admin dashboard.
            </p>

          </div>
        `,

        text: `
New Consultation Request

Name: ${name}
Date of Birth: ${dob}
Time of Birth: ${birthTime}
Address: ${address}

Question:
${question}

This request has also been saved
in the admin dashboard.
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