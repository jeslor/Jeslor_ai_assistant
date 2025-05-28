import { auth } from "@/auth";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session && session.user) {
    redirect("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark1/95 via-black-900 to-dark1 w-full fixed">
      <div className="relative bg-slate-200/5 backdrop-blur-md px-4 py-10 md:py-10 md:px-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200/10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/35/20 via-primary1/5 to-transparent rounded-2xl z-0 animate-pulse"></div>
        {children}
        <div className="absolute -top-40 -right-10 w-32 h-32 bg-primary1/45 rounded-full filter blur-3xl opacity-40 animate-spin-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary1 rounded-full filter blur-2xl opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
