import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/admin/login",
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const email = String(credentials.email)
          .trim()
          .toLowerCase();

        const password = String(credentials.password);

        // --------------------------------
        // ADMIN EMAIL CHECK
        // --------------------------------

        const adminEmail =
          process.env.ADMIN_EMAIL
            ?.trim()
            .toLowerCase();

        if (!adminEmail || email !== adminEmail) {
          return null;
        }

        // --------------------------------
        // FIND USER
        // --------------------------------

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        // --------------------------------
        // PASSWORD CHECK
        // --------------------------------

        const valid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!valid) {
          return null;
        }

        // --------------------------------
        // AUTHENTICATED ADMIN
        // --------------------------------

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});