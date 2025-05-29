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
  const Router = useRouter();
  const [signingIn, setSigningIn] = useState({
    signingInCredentials: false,
    signingInGitHub: false,
    signingInGoogle: false,
  });
  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountValidator),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AccountFormData) => {
    setSigningIn({
      signingInCredentials: true,
      signingInGitHub: false,
      signingInGoogle: false,
    });

    try {
      if (type === "sign_in") {
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (res?.error) {
          toast.error(res.error);
          console.error("Sign-in error:", res.error);
        } else {
          toast.success("Sign-in successful");
          Router.push("/");
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
          const registeredUser = result.user;
          await signIn("credentials", {
            email: registeredUser.email,
            password: data.password,
          }).then((res: any) => {
            if (res?.error) {
              toast.error(res.error);
              console.error("Sign-in error:", res.error);
            } else {
              toast.success("Account created successfully");
              Router.push("/");
            }
          });
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      console.error("Error during sign-in/sign-up:", error);
    } finally {
      setSigningIn({
        signingInCredentials: false,
        signingInGitHub: false,
        signingInGoogle: false,
      });
    }
  };

  const signInWithProvider = async (provider: string) => {
    try {
      if (provider === "google") {
        setSigningIn({
          signingInCredentials: false,
          signingInGitHub: false,
          signingInGoogle: true,
        });
        const res = await signIn("google");
      }
      if (provider === "github") {
        setSigningIn({
          signingInCredentials: false,
          signingInGitHub: true,
          signingInGoogle: false,
        });
        const res = await signIn("github");
        console.log("GitHub sign-in response:", res);
      }
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      toast.error(`Failed to sign in with ${provider}`);
    } finally {
      setSigningIn({
        signingInCredentials: false,
        signingInGitHub: false,
        signingInGoogle: false,
      });
    }
  };

  return (
    <div className="relative z-10 w-full mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-wide">
        {type === "sign_in" ? "Welcome Back" : "Create an Account"}
      </h2>
      <p className="text-small text-slate-200/55 text-center mb-10">
        {type === "sign_in"
          ? "Manage your account,create new projects and more."
          : "Join us to unlock the full potential of our platform."}
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
            placeholder="password"
            name="password"
            type="password"
          />

          <Button type="submit" className="btn_primary px-10">
            {type === "sign_in" ? (
              <span className="flex items-center gap-2">
                Sign In{" "}
                {signingIn.signingInCredentials ? (
                  <Loading size={20} />
                ) : (
                  <Icon icon="hugeicons:login-method" />
                )}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign Up
                {signingIn.signingInCredentials ? (
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
            {signingIn.signingInGoogle ? (
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
            {signingIn.signingInGitHub ? (
              <Loading size={20} />
            ) : (
              <Icon icon="logos:github-icon" className="" />
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

// z.infer<typeof accountValidator>;
// z.infer<typeof accountValidator>
