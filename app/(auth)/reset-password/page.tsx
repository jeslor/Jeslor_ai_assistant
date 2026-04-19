"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!token) {
    return (
      <div className="relative z-10 w-full mx-auto text-center space-y-4">
        <Icon
          icon="mdi:alert-circle-outline"
          className="text-red-400 text-5xl mx-auto"
        />
        <h2 className="text-2xl font-bold text-white">Invalid Link</h2>
        <p className="text-slate-200/55 text-sm">
          This reset link is invalid or has expired.
        </p>
        <Link
          href="/forgot-password"
          className="text-primary1/70 hover:text-primary1 font-semibold text-sm"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast.success("Password reset successfully");
        setTimeout(() => router.push("/sign_in"), 2000);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative z-10 w-full mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <Icon
            icon="lets-icons:check-fill"
            className="text-green-400 text-5xl"
          />
        </div>
        <h2 className="text-2xl font-bold text-white">Password Updated</h2>
        <p className="text-slate-200/55 text-sm">
          Redirecting you to sign in...
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-wide">
        Reset Password
      </h2>
      <p className="text-small text-slate-200/55 text-center mb-10">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="text-sm text-slate-200/70 mb-1 block">
            New Password
          </label>
          <div className="relative">
            <Input
              className="w-full px-4 py-2 rounded-lg bg-white/10 !text-primary1/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500 text-small"
              placeholder="New password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400"
            >
              <Icon icon={showPassword ? "mdi:eye-off-outline" : "mi:eye"} />
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm text-slate-200/70 mb-1 block">
            Confirm Password
          </label>
          <Input
            className="w-full px-4 py-2 rounded-lg bg-white/10 !text-primary1/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500 text-small"
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="btn_primary px-10" disabled={loading}>
          <span className="flex items-center gap-2">
            Reset Password
            {loading ? <Loading size={20} /> : <Icon icon="mdi:lock-reset" />}
          </span>
        </Button>
      </form>

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

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="relative z-10 w-full mx-auto text-center">
          <Loading size={32} />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
