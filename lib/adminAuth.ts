import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Server-side verification for administrator session.
 * Ensures the authenticated user exists and matches ADMIN_EMAIL or exists in the admin User database.
 */
export async function verifyAdminSession() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const adminEmailEnv = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const sessionEmail = session.user.email.trim().toLowerCase();

  // If matches ADMIN_EMAIL or any email in a comma-separated list
  if (adminEmailEnv) {
    const allowed = adminEmailEnv.split(",").map((e) => e.trim().toLowerCase());
    if (allowed.includes(sessionEmail)) {
      return session;
    }
  }

  // Also verify against the registered admin users in the database
  try {
    const user = await prisma.user.findUnique({
      where: { email: sessionEmail },
    });
    if (user) {
      return session;
    }
  } catch (err) {
    console.error("Error verifying admin in database:", err);
  }

  return null;
}

