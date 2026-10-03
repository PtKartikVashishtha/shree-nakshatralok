import { auth } from "@/auth";

/**
 * Server-side verification for administrator session.
 * Ensures the authenticated user exists and strictly matches ADMIN_EMAIL.
 */
export async function verifyAdminSession() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const sessionEmail = session.user.email.trim().toLowerCase();

  if (adminEmail && sessionEmail !== adminEmail) {
    return null;
  }

  return session;
}
