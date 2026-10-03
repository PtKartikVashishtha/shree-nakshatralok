"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  userEmail?: string | null;
  onLogout?: () => Promise<void>;
};

export default function AdminNav({ userEmail, onLogout }: Props) {
  const pathname = usePathname();

  const navItems = [
    { label: "Consultations", href: "/admin" },
    { label: "Blog CMS", href: "/admin/blog" },
    { label: "Panchang CMS", href: "/admin/panchang" },
  ];

  const isCurrent = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="relative overflow-hidden bg-[#300604] text-white shadow-md">
      {/* Decorative astrological rings */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border border-[#d7ad63]" />
        <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full border border-[#d7ad63]" />
        <div className="absolute right-20 top-10 text-5xl text-[#d7ad63]">✦</div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-5 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* BRAND */}
          <Link href="/admin" className="flex items-center gap-4 transition hover:opacity-90">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cda456]/50 text-xl text-[#e4c57d] shadow-sm">
              ✦
            </div>
            <div>
              <p className="font-serif text-lg tracking-wide text-[#f2d99d]">
                श्री नक्षत्रलोक
              </p>
              <p className="text-[9px] tracking-[3px] text-[#a99683]">
                ADMIN CONTROL CENTER
              </p>
            </div>
          </Link>

          {/* USER & LOGOUT */}
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-xs text-[#a99683]">Signed in as</p>
              <p className="text-sm font-medium text-[#ead9b3]">{userEmail || "Admin"}</p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="hidden rounded-full border border-[#d5ae62]/30 px-3.5 py-2 text-xs font-medium text-[#d9c7a3] transition hover:bg-white/10 md:inline-flex"
                title="View live website"
              >
                Website ↗
              </Link>

              {onLogout && (
                <form action={onLogout}>
                  <button
                    type="submit"
                    className="rounded-full border border-[#d5ae62]/40 px-5 py-2.5 text-xs font-semibold tracking-wide text-[#ead49a] transition hover:bg-white/10"
                  >
                    Logout
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#4d100c] pt-4">
          {navItems.map((item) => {
            const active = isCurrent(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition ${
                  active
                    ? "bg-[#5b130d] text-[#f2d99d] shadow-inner border border-[#d5ae62]/40"
                    : "text-[#cbb9aa] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#e4c57d]" />}
              </Link>
            );
          })}

          <div className="ml-auto hidden items-center gap-3 text-xs text-[#a99683] lg:flex">
            <Link
              href="/blog"
              target="_blank"
              className="transition hover:text-[#f2d99d]"
            >
              Public Blog ↗
            </Link>
            <span>·</span>
            <Link
              href="/panchang"
              target="_blank"
              className="transition hover:text-[#f2d99d]"
            >
              Public Panchang ↗
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
