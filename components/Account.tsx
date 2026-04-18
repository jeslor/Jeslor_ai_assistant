"use client";
import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { Icon } from "@iconify/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { accountValidator } from "@/lib/validators/account.validator";
import FormInput from "@/components/FormInput";
import { Button } from "./ui/button";
import Loading from "./ui/loading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AccountFormData = z.infer<typeof accountValidator>;

const Account = ({ type }: { type: string }) => {
  const router = useRouter();
  const [signingIn, setSigningIn] = useState({
    credentials: false,
    github: false,
    google: false,
  });

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountValidator),
    defaultValues: { username: "", email: "", password: "" },
  });

  const setLoading = (provider: string, value: boolean) =>
    setSigningIn((prev) => ({ ...prev, [provider]: value }));

  const onSubmit = async (data: AccountFormData) => {
    setLoading("credentials", true);

    try {
      if (type === "sign_in") {
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (res?.error) {
          toast.error("Invalid email or password");
        } else {
          toast.success("Sign-in successful");
          router.push("/");
        }
      }

      if (type === "sign_up") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (result.status === 200) {
          await signIn("credentials", {
            email: result.user.email,
            password: data.password,
            redirect: false,
          });
          toast.success("Account created successfully");
          router.push("/");
        } else {
          toast.error(result.error);
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading("credentials", false);
    }
  };

  const signInWithProvider = async (provider: "google" | "github") => {
    setLoading(provider, true);
    try {
      await signIn(provider);
    } catch {
      toast.error(`Failed to sign in with ${provider}`);
    } finally {
      setLoading(provider, false);
    }
  };

  return (
    <div className="relative z-10 w-full mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-wide">
        {type === "sign_in" ? "Welcome" : "Create an Account"}
      </h2>
      <p className="text-small text-slate-200/55 text-center mb-10">
        {type === "sign_in"
          ? "Login to generate, practice or attend and interviews."
          : "Create an account to generate, practice or attend interviews."}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "sign_up" && (
            <FormInput
              control={form.control}
              label="username"
              placeholder="Username"
              name="username"
            />
          )}
          <FormInput
            control={form.control}
            label="email"
            placeholder="Email"
            name="email"
            type="email"
          />
          <FormInput
            control={form.control}
            label="password"
            placeholder="Password"
            name="password"
            type="password"
          />

          {type === "sign_in" && (
            <div className="text-right -mt-4">
              <Link
                href="/forgot-password"
                className="text-xs text-primary1/60 hover:text-primary1 font-medium"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <Button type="submit" className="btn_primary px-10">
            {type === "sign_in" ? (
              <span className="flex items-center gap-2">
                Sign In
                {signingIn.credentials ? (
                  <Loading size={20} />
                ) : (
                  <Icon icon="hugeicons:login-method" />
                )}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign Up
                {signingIn.credentials ? (
                  <Loading size={20} />
                ) : (
                  <Icon icon="ph:user-duotone" />
                )}
              </span>
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-5">
        <p className="text-xm font-bold">Sign in with:</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Button
            variant="outline"
            className="btn_secondary flex items-center gap-2 bg-primary1/20 flex-1 cursor-pointer"
            onClick={() => signInWithProvider("google")}
          >
            {signingIn.google ? (
              <Loading size={20} />
            ) : (
              <Icon icon="logos:google-icon" />
            )}
            Google
          </Button>
          <Button
            variant="outline"
            className="btn_secondary flex items-center gap-2 bg-primary1/20 flex-1 cursor-pointer"
            onClick={() => signInWithProvider("github")}
          >
            {signingIn.github ? (
              <Loading size={20} />
            ) : (
              <Icon icon="logos:github-icon" />
            )}
            GitHub
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-400/70">
          {type === "sign_in"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={type === "sign_in" ? "/sign_up" : "/sign_in"}
            className="text-primary1/70 hover:text-primary1 font-semibold"
          >
            {type === "sign_in" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Account;
