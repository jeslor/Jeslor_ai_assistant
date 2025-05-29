import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

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
    Google({
      clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
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
    async signIn({ user, account, profile }) {
      if (user) {
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/findUser`,
            {
              method: "POST",
              body: JSON.stringify({
                email: user.email,
              }),
            }
          );

          const { error, status } = await res.json();

          if (status > 200 && error === "User not found") {
            await fetch(`${process.env.NEXTAUTH_URL}/api/auth/register`, {
              method: "POST",
              body: JSON.stringify({
                email: user.email,
                username: user.name,
                profileImage: user.image,
                isGitHub: true,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);

                if (data.status === 200) {
                  console.log(data);
                } else {
                  throw new Error(data.error);
                }
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/sign_in", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
