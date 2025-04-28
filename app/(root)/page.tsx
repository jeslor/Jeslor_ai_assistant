"use client";
import Agent from "@/components/Agent/Agent";
import DottedCanvas from "@/components/DottedCanvas";
import Interviews from "@/components/interviews/Interviews";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className=" w-full pt-4">
      <div>
        <DottedCanvas />
        <div className=" flex flex-col items-center pb-10 ">
          <div className=" px-4 text-4xl rounded-3xl  flex items-center justify-center w-fit  bg-gradient-to-bl from-dark/30 via-white/5 to-primary1/10  backdrop-blur-md text-white shadow-inner  border border-white/5 text-center ">
            <Image
              src="/media/images/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full  object-cover"
            />
            <span className=" text-white rounded-2xl  cursor-pointer font-light text-[15px]">
              Interview <span className="font-bold text-[18px]">AI</span>{" "}
              Assistant
            </span>
          </div>
          <h3 className=" px-4 text-center  font-normal mt-10 bg-gradient-to-b from-dark1/10 via-white/70 to-white  text-transparent bg-clip-text clampTitle">
            Your Personal friend <br />
            at all times
          </h3>
        </div>
        <div>
          <Agent agentType="newInterview" />
        </div>
      </div>
      <div className="pt-[100px]">
        <Interviews />
      </div>
    </main>
  );
};

export default page;
