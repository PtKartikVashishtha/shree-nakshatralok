import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rateLimit";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const schema = z.object({
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
    // SAVE
    // -----------------------------

    const submission =
      await prisma.submission.create({
        data: {
          type: "KUNDALI_MILAN",

          person1Name,
          person1Dob,
          person1BirthTime,
          person1BirthPlace,

          person2Name,
          person2Dob,
          person2BirthTime,
          person2BirthPlace,

          question: question || "",
        },
      });

    // -----------------------------
    // EMAIL
    // -----------------------------

    const { data, error } =
      await resend.emails.send({
        from:
          process.env.RESEND_FROM ||
          "Shree Nakshatralok <onboarding@resend.dev>",

        to: [process.env.CLIENT_EMAIL!],

        subject:
          `New Kundali Milan Request - ${person1Name} & ${person2Name}`,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; color: #333;">

            <h2 style="color: #68170f;">
              New Kundali Milan Request
            </h2>

            <hr />

            <h3>Person 1</h3>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(person1Name)}
            </p>

            <p>
              <strong>Date of Birth:</strong>
              ${escapeHtml(person1Dob)}
            </p>

            <p>
              <strong>Time of Birth:</strong>
              ${escapeHtml(person1BirthTime)}
            </p>

            <p>
              <strong>Birth Place:</strong>
              ${escapeHtml(person1BirthPlace)}
            </p>

            <hr />

            <h3>Person 2</h3>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(person2Name)}
            </p>

            <p>
              <strong>Date of Birth:</strong>
              ${escapeHtml(person2Dob)}
            </p>

            <p>
              <strong>Time of Birth:</strong>
              ${escapeHtml(person2BirthTime)}
            </p>

            <p>
              <strong>Birth Place:</strong>
              ${escapeHtml(person2BirthPlace)}
            </p>

            <hr />

            <h3>Question</h3>

            <p style="white-space: pre-wrap;">
              ${escapeHtml(question || "No additional question")}
            </p>

            <hr />

            <p style="color: #666;">
              This request has also been saved
              in the admin dashboard.
            </p>

          </div>
        `,

        text: `
New Kundali Milan Request

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
${question || "No additional question"}

This request has also been saved
in the admin dashboard.
        `,
      });

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}