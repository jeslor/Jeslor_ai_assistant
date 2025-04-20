import React from "react";

const Account = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black-900 to-black">
      <div className="relative bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black-700/20 via-pink-500/10 to-transparent rounded-2xl z-0 animate-pulse"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
            Welcome Back
          </h2>
          <p className="text-sm text-black-200 text-center mb-8">
            Sign in to access your dashboard
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm text-black-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            <div>
              <label className="block text-sm text-black-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-gray-600 to-pink-500 hover:from-gray-700 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transition duration-300 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-black-300">
              Don’t have an account?{" "}
              <a href="#" className="underline hover:text-black-100">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-black-500 rounded-full filter blur-3xl opacity-40 animate-spin-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-500 rounded-full filter blur-2xl opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Account;
