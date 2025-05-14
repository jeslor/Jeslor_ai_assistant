"use client";
import Agent from "@/components/Agent/Agent";
import DottedCanvas from "@/components/DottedCanvas";
import Interviews from "@/components/interviews/Interviews";
import PositionInput from "@/components/postionInput/PositionInput";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [isAgent, setIsAgent] = useState(true);
  const [positionInput, setPositionInput] = useState("");

  return (
    <main className=" w-full pt-4">
      <div className="overflow-hidden relative ">
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
          <h3 className=" px-4 text-center  font-normal mt-10 bg-gradient-to-b from-dark1/10 via-white/70 to-white  text-transparent bg-clip-text clampTitle w-full max-w-[1100px] ">
            Prepare for your next job interview.
          </h3>
        </div>
        <div>
          <div className="flex gap-x-1 justify-center items-center mt-5">
            <button
              onClick={() => setIsAgent(true)}
              className={`py-2 px-4 hover:bg-slate-100 rounded-s-2xl hover:text-dark1 font-semibold  border-[1px] border-slate-200/15  cursor-pointer relative group border-b ${
                isAgent
                  ? "bg-slate-100 text-dark1"
                  : "bg-black/80 text-slate-200/80"
              }`}
            >
              Use audio assistant
              <span
                className={`absolute border-[10px] border-transparent   left-1/2 -translate-x-1/2 top-full group-hover:border-t-slate-100 ${
                  isAgent ? "border-t-slate-100" : ""
                }`}
              ></span>
            </button>
            <button
              onClick={() => setIsAgent(false)}
              className={`py-2 px-4 hover:bg-slate-100 rounded-e-2xl hover:text-dark1 font-semibold  border-[1px] border-slate-200/15  cursor-pointer relative group border-b ${
                !isAgent
                  ? "bg-slate-100 text-dark1"
                  : "bg-black/80 text-slate-200/80"
              }`}
            >
              Paste job position
              <span
                className={`absolute border-[10px] border-transparent   left-1/2 -translate-x-1/2 top-full group-hover:border-t-slate-100 ${
                  !isAgent ? "border-t-slate-100" : ""
                }`}
              ></span>
            </button>
          </div>
          {isAgent ? (
            <Agent agentType="newInterview" />
          ) : (
            <PositionInput
              positionInput={positionInput}
              setPositionInput={setPositionInput}
            />
          )}
        </div>
      </div>
      <Interviews />
    </main>
  );
};

export default page;
