import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/app/libs/prismadb";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    Credentials({
      name: "credentials",

      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // Credential Authentication
      async authorize(credentials) {
        // User with credentials without email and password
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials!");

        // Finding the user with email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // User doesn't exist or without a hashed password
        if (!user || !user?.hashedPassword)
          throw new Error("Invalid credentials!");

        // Comparing credential password with user password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // Incorrect password
        if (!isCorrectPassword) throw new Error("Incorrect password!");

        // Returning user
        return Promise.resolve(user);
      },
    }),
  ],

  pages: {
    signIn: "/",
  },

  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
