"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setSent(true);
        toast.success("Check your email for the reset link");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-wide">
        Forgot Password
      </h2>
      <p className="text-small text-slate-200/55 text-center mb-10">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {sent ? (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Icon
              icon="lets-icons:check-fill"
              className="text-green-400 text-5xl"
            />
          </div>
          <p className="text-slate-200/70 text-sm">
            If an account exists for{" "}
            <strong className="text-primary1">{email}</strong>, you&apos;ll
            receive a password reset email shortly.
          </p>
          <Link
            href="/sign_in"
            className="text-primary1/70 hover:text-primary1 font-semibold text-sm"
          >
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-sm text-slate-200/70 mb-1 block">
              Email
            </label>
            <Input
              className="w-full px-4 py-2 rounded-lg bg-white/10 !text-primary1/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500 text-small"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <Button
            type="submit"
            className="btn_primary px-10"
            disabled={loading}
          >
            <span className="flex items-center gap-2">
              Send Reset Link
              {loading ? (
                <Loading size={20} />
              ) : (
                <Icon icon="mdi:email-fast-outline" />
              )}
            </span>
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-400/70">
          Remember your password?{" "}
          <Link
            href="/sign_in"
            className="text-primary1/70 hover:text-primary1 font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
