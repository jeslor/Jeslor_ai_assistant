"use client";
import Account from "@/components/Account";
import { signOut } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Account</h1>
      <button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default page;
