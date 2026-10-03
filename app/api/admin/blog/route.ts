import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validations/blog";
import { sanitizeHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/slug";

export async function GET(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim().toLowerCase();
    const category = searchParams.get("category")?.trim();
    const status = searchParams.get("status")?.trim();

    const where: Record<string, unknown> = {};

    if (category && category !== "All") {
      where.category = category;
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Fetch blog posts error:", error);
    return NextResponse.json(
      { error: "Unable to retrieve blog posts." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = blogPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      category,
      featuredImage,
      author,
      status,
      seoTitle,
      seoDescription,
      seoKeywords,
      canonicalUrl,
    } = validation.data;

    // Generate unique slug
    let baseSlug = slugify(customSlug || title);
    if (!baseSlug) baseSlug = "article";

    let finalSlug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await prisma.blogPost.findUnique({
        where: { slug: finalSlug },
        select: { id: true },
      });

      if (!existing) break;
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Sanitize content server-side
    const sanitizedContent = sanitizeHtml(content);

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content: sanitizedContent,
        category,
        featuredImage: featuredImage || null,
        author: author || "Pt. Radhey Shyam Sharma",
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || null,
        canonicalUrl: canonicalUrl || null,
      },
    });

    return NextResponse.json(
      { success: true, post },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create blog post error:", error);
    return NextResponse.json(
      { error: "Unable to create blog post." },
      { status: 500 }
    );
  }
}
