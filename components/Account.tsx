import Link from "next/link";
import React from "react";

const Account = ({ type }: { type: string }) => {
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

      <form className="space-y-5 text-slate-200">
        <div>
          <label className="block text-sm text-slate-200/70  mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500 text-small"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-200/70  mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500 text-small"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-secondary1 to-primary1 hover:from-dark1/75 hover:to-primary1/70 text-white font-semibold rounded-xl shadow-lg transition duration-300 cursor-pointer"
        >
          Sign In
        </button>
      </form>

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
