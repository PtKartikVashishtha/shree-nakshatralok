import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight, zero-dependency proxy for admin route protection.
 * Avoids importing heavy modules (Prisma, bcrypt, auth bundle) on every request,
 * providing sub-millisecond edge/proxy response times.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow the admin login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Fast session cookie presence check
  const sessionToken =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!sessionToken) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};