import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import BlogListClient, { BlogItem } from "@/components/admin/BlogListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Management | Admin | Shree Nakshatralok",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminBlogPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedPosts: BlogItem[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    author: p.author,
    status: p.status as "DRAFT" | "PUBLISHED",
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    featuredImage: p.featuredImage,
  }));

  return (
    <main className="min-h-screen bg-[#f5efe4] text-[#291412]">
      {/* SHARED ADMIN HEADER */}
      <AdminNav userEmail={session.user.email} onLogout={logout} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#a2742e]">
            CONTENT MANAGEMENT
          </p>
          <div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-4xl font-medium text-[#57120d] md:text-5xl">
                Blog & Articles CMS
              </h1>
              <p className="mt-2 text-sm text-[#806d66]">
                Publish and manage articles on Vedic astrology, Ayurveda, Muhurat, and spiritual knowledge.
              </p>
            </div>
          </div>
        </div>

        <BlogListClient initialPosts={formattedPosts} />
      </section>

      <footer className="border-t border-[#d8c9b3] bg-[#eee6d8] mt-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-center text-[10px] tracking-wide text-[#8c796b] md:flex-row md:items-center md:justify-between md:px-8 md:text-left">
          <span>© {new Date().getFullYear()} Shree Nakshatralok Jyotish Sansthan</span>
          <span className="font-medium text-[#7a6456]">
            Made by Kartik Vashishtha <span className="text-[#c93b3b] font-sans">♥</span>
          </span>
          <span className="text-[#a2742e]">सत्य · सेवा · विश्वास</span>
        </div>
      </footer>
    </main>
  );
}
