import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import { comparePassword } from "./lib/helpers/user";

const baseUrl =
  process.env.NEXTAUTH_URL || process.env.AUTH_URL || "http://localhost:3000";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          console.error("Missing email or password");
          return null;
        }

        try {
          const res = await fetch(`${baseUrl}/api/auth/findUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

          if (!res.ok) {
            console.error("Failed to fetch user");
            return null;
          }

          const data = await res.json();

          if (data.error) return null;

          if (!data.hashedPassword) return null;

          const passwordValid = await comparePassword(
            password,
            data.hashedPassword,
          );

          if (!passwordValid) {
            console.error("Invalid password");
            return null;
          }

          const { hashedPassword, ...safeUser } = data;
          return {
            id: safeUser.id,
            name: safeUser.username,
            email: safeUser.email,
            image: safeUser.profileImage,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;

      // OAuth: auto-register new users
      if (
        (account?.provider === "google" || account?.provider === "github") &&
        user?.email
      ) {
        try {
          const findRes = await fetch(`${baseUrl}/api/auth/findUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });

          const findData = await findRes.json();

          if (findData.error === "User not found") {
            const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                username: user.name,
                profileImage: user.image,
                isGoogle: account.provider === "google",
                isGitHub: account.provider === "github",
              }),
            });

            const registerData = await registerRes.json();
            if (registerData.status !== 200) {
              console.error(
                "Failed to register OAuth user:",
                registerData.error,
              );
              return false;
            }
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign_in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});
