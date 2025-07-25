import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import ModalWrapper from "@/components/modal/ModalWrapper";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/sign_in");
  }

  return (
    <div className="flex flex-col items-center pt-[60px]  bg-gradient-to-br from-dark1/95 via-black-900 to-dark1 relative overflow-hidden">
      <Navbar />
      <ModalWrapper />
      {children}
      <div className="absolute  -right-10 w-32 h-32 bg-primary1/45 rounded-full filter blur-3xl opacity-40 animate-spin-slow"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary1 rounded-full filter blur-2xl opacity-30 animate-pulse"></div>
    </div>
  );
};

export default RootLayout;
