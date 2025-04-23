import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

          const passwordValid = await bcrypt.compareSync(
            password,
            user.hashedPassword
          );

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
