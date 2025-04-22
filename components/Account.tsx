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
import { loginUser } from "@/lib/actions/user.action";

type AccountFormData = z.infer<typeof accountValidator>;

const Account = ({ type }: { type: string }) => {
  const [signingIn, setSigningIn] = useState(false);
  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountValidator),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AccountFormData) => {
    setSigningIn(true);
    console.log("Form data:", data);

    try {
      if (type === "sign_in") {
        await loginUser(data.email, data.password).then((res) => {
          if (res.error) {
            console.error("Login error:", res.error);
          } else {
            console.log("Login successful:", res);
          }
        });
      }

      if (type === "sign_up") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        if (res.ok) {
          console.log(result);
        } else {
          // Handle sign-up error
        }
      }
    } catch (error) {
      console.error("Error during sign-in/sign-up:", error);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="relative z-10">
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
                {signingIn ? (
                  <Loading size={20} />
                ) : (
                  <Icon icon="hugeicons:login-method" />
                )}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign Up
                {signingIn ? (
                  <Loading size={20} />
                ) : (
                  <Icon icon="ph:user-duotone" />
                )}
              </span>
            )}
          </Button>
        </form>
      </Form>

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
