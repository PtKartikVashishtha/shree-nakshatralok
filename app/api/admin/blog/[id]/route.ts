import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validations/blog";
import { sanitizeHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/slug";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Get blog post error:", error);
    return NextResponse.json(
      { error: "Unable to retrieve blog post." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const partialSchema = blogPostSchema.partial();
    const validation = partialSchema.safeParse(body);

    if (!validation.success) {
      const issueDetails = validation.error.issues
        .map((issue) => issue.message)
        .join(" | ");

      console.error("Blog update validation error:", issueDetails, body);

      return NextResponse.json(
        {
          error: issueDetails || "Validation error",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const updatePayload: Record<string, unknown> = {};

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.excerpt !== undefined) updatePayload.excerpt = data.excerpt;
    if (data.category !== undefined) updatePayload.category = data.category;
    if (data.featuredImage !== undefined) {
      updatePayload.featuredImage = data.featuredImage || null;
    }
    if (data.author !== undefined) updatePayload.author = data.author;
    if (data.seoTitle !== undefined) updatePayload.seoTitle = data.seoTitle || null;
    if (data.seoDescription !== undefined) {
      updatePayload.seoDescription = data.seoDescription || null;
    }
    if (data.seoKeywords !== undefined) {
      updatePayload.seoKeywords = data.seoKeywords || null;
    }
    if (data.canonicalUrl !== undefined) {
      updatePayload.canonicalUrl = data.canonicalUrl || null;
    }

    if (data.content !== undefined) {
      updatePayload.content = sanitizeHtml(data.content);
    }

    // Handle slug change if provided
    if (data.slug && data.slug.trim() !== "") {
      const newSlug = slugify(data.slug);
      if (newSlug !== existing.slug) {
        let finalSlug = newSlug;
        let counter = 1;
        while (true) {
          const conflict = await prisma.blogPost.findFirst({
            where: {
              slug: finalSlug,
              NOT: { id },
            },
            select: { id: true },
          });
          if (!conflict) break;
          finalSlug = `${newSlug}-${counter}`;
          counter++;
        }
        updatePayload.slug = finalSlug;
      }
    }

    // Handle status transitions
    if (data.status !== undefined) {
      updatePayload.status = data.status;
      if (data.status === "PUBLISHED" && !existing.publishedAt) {
        updatePayload.publishedAt = new Date();
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: updatePayload,
    });

    try {
      revalidatePath("/blog");
      revalidatePath("/");
      if (updated.slug) revalidatePath(`/blog/${updated.slug}`);
      if (existing.slug && existing.slug !== updated.slug) {
        revalidatePath(`/blog/${existing.slug}`);
      }
    } catch (revalError) {
      console.error("Cache revalidation failed:", revalError);
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error("Update blog post error:", error);
    return NextResponse.json(
      { error: "Unable to update blog post." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await verifyAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found." },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    try {
      revalidatePath("/blog");
      revalidatePath("/");
      if (existing.slug) revalidatePath(`/blog/${existing.slug}`);
    } catch (revalError) {
      console.error("Cache revalidation failed:", revalError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json(
      { error: "Unable to delete blog post." },
      { status: 500 }
    );
  }
}
