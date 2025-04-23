"use client";
import Account from "@/components/Account";
import { signOut } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button
        onClick={() => {
          signOut({
            callbackUrl: "/sign_in",
          });
        }}
        className="btn_primary"
      >
        sign out
      </button>
    </div>
  );
};

export default page;
