import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { comparePassword } from "./lib/helpers/user";

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

        if (!email || !password) {
          console.error("Missing email or password");
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/findUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            }
          );

          if (!res.ok) {
            console.error("Failed to fetch user");
            return null;
          }

          const user = await res.json();

          const passwordValid = await comparePassword(
            password,
            user.hashedPassword
          );
          console.log("Password valid:", passwordValid);

          if (!passwordValid) {
            console.error("Invalid password");
            return null;
          }

          // Omit sensitive fields before returning
          const { hashedPassword, ...safeUser } = user;
          return safeUser;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
