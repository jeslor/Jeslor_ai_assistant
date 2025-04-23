"use client";
import Account from "@/components/Account";
import Agent from "@/components/Agent/Agent";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col justify-start">
      <div className=" flex flex-col items-center pb-10 pt-[10vh]">
        <div className=" px-4 text-4xl rounded-3xl  flex items-center justify-center w-fit  bg-gradient-to-bl from-dark/30 via-white/5 to-primary1/10  backdrop-blur-md text-white shadow-inner  border border-white/5 text-center ">
          <Image
            src="/media/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full  object-cover"
          />
          <span className=" text-white rounded-2xl text-[18px] cursor-pointer">
            AI Mood Assistant
          </span>
        </div>
        <h3 className=" px-4 text-center  font-normal mt-10 bg-gradient-to-b from-dark1/10 via-white/70 to-white  text-transparent bg-clip-text clampTitle">
          Your Personal friend <br />
          at all times
        </h3>
      </div>
      <div>
        <Agent />
      </div>
    </main>
  );
};

export default page;
