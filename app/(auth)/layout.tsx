import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black-900 to-black">
      <div className="relative bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black-700/20 via-pink-500/10 to-transparent rounded-2xl z-0 animate-pulse"></div>
        {children}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-black-500 rounded-full filter blur-3xl opacity-40 animate-spin-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500 rounded-full filter blur-2xl opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
