import { prisma } from "@/lib/prisma";

const LIMIT = 5;
const WINDOW = 15 * 60 * 1000;

export async function checkRateLimit(
  key: string
) {
  const now = new Date();

  const existing = await prisma.rateLimit.findUnique({
    where: {
      key,
    },
  });

  // No previous requests from this IP
  if (!existing) {
    await prisma.rateLimit.create({
      data: {
        key,
        count: 1,
        resetAt: new Date(now.getTime() + WINDOW),
      },
    });

    return {
      allowed: true,
      remaining: LIMIT - 1,
    };
  }

  // Window expired → reset
  if (existing.resetAt <= now) {
    await prisma.rateLimit.update({
      where: {
        key,
      },
      data: {
        count: 1,
        resetAt: new Date(
          now.getTime() + WINDOW
        ),
      },
    });

    return {
      allowed: true,
      remaining: LIMIT - 1,
    };
  }

  // Limit reached
  if (existing.count >= LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil(
        (existing.resetAt.getTime() -
          now.getTime()) /
          1000
      ),
    };
  }

  // Increment request count
  const updated = await prisma.rateLimit.update({
    where: {
      key,
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });

  return {
    allowed: true,
    remaining: LIMIT - updated.count,
  };
}