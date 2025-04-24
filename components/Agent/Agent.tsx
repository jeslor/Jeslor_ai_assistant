"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import useUserStore from "../provider/userStore";

const rings = Array.from({ length: 5 }, (_, i) => i + 1);
const Agent = () => {
  const { user } = useUserStore();

  return (
    <div className="card-wrapper w-full max-w-[800px] mx-auto mt-5 mb-[10vh]">
      <div className="flex justify-around gap-x items-center overflow-hidden  rounded-4xl bg-black  backdrop-blur-md  px-4 py-2 shadow-xl border border-dark1/10 mx-auto relative w-[calc(100%-5px)] h-[90%] ">
        <div className="flex flex-col items-center justify-center h-[300px] relative">
          <button className="h-[70px] w-[70px] absolute flex justify-center items-center bg-primary1/10 hover:bg-primary1/50 transition-all rounded-full cursor-pointer z-[10]">
            <Icon icon="bi:mic-fill" width="16" height="16" />
          </button>
          <div className=" flex items-center justify-center w-full h-full animate-slowping">
            {rings.map((ring) => {
              const width = ring * 20 + 40;
              return (
                <div
                  key={ring}
                  style={{ width, height: width }}
                  className={`w-[${ring * 10}px] h-[${
                    ring * 10
                  }px] bg-gradient-to-bl from-secondary1/30 via-white/10 to-primary1/20 rounded-full absolute`}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="  flex flex-col items-center gap-y-1">
          <div className="h-[60px] w-[60px] overflow-hidden">
            {user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt="profile"
                className="rounded-full object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-primary1/10  rounded-md flex items-center justify-center">
                <Icon icon="bi:person-fill" />
              </div>
            )}
          </div>
          <p className="capitalize font-semibold">{user?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Agent;
