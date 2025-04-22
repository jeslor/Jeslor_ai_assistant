"use server";

import { signIn } from "@/auth";

export const loginUser = async (email: string, password: string) => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    return { error: res.error };
  }

  if (res?.ok) {
    return { ok: true };
  }

  return { error: "Unknown error" };
};
