import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        console.log("Credentials:", credentials);

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`, // Cookie name
      options: {
        httpOnly: true, // Ensures the cookie can't be accessed via JavaScript
        sameSite: "lax", // Helps with cross-site request handling
        path: "/", // Cookie path
        secure: process.env.NODE_ENV === "production", // Ensures cookies are sent only over HTTPS in production
      },
    },
  },
});
