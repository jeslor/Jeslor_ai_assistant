"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect, useCallback } from "react";
import useUserStore from "../provider/userStore";
import { vapi } from "@/lib/vapi.sdk";
import { motion } from "framer-motion";

enum AgentStatus {
  disconnected = "disconnected",
  connecting = "connecting",
  active = "active",
  inactive = "inactive",
}

const rings = Array.from({ length: 5 }, (_, i) => i + 1);
const Agent = () => {
  const { user } = useUserStore();
  const [status, setStatus] = useState<AgentStatus>(AgentStatus.inactive);
  const [isTalking, setIsTalking] = useState(false);
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const onCallStart = () => {
      setStatus(AgentStatus.active);
      setChats([]);
    };
    const onCallEnd = () => setStatus(AgentStatus.disconnected);
    const onTalkingStart = () => setIsTalking(true);
    const onTalkingEnd = () => setIsTalking(false);
    const onError = (error: any) => {
      console.error("Error:", error);
      setStatus(AgentStatus.disconnected);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onTalkingStart);
    vapi.on("speech-end", onTalkingEnd);
    vapi.on("error", onError);
    vapi.on("message", (message: any) => {
      if (message.type === "transcript") {
        setChats((prev) => [
          ...prev,
          { role: message.role, content: message.transcript },
        ]);
      }
    });
  }, []);
  console.log(chats);

  const handleStartCall = useCallback(async () => {
    console.log("Starting call...");
    try {
      if (status === "inactive" || status === "disconnected") {
        setStatus(AgentStatus.connecting);
        console.log("Starting call...");

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            username: user?.username,
            userid: user?.id,
          },
        });
      }
    } catch (error) {
      console.log("Error starting call:", error);
    }
  }, [status, user]);
  const handleEndCall = async () => {
    console.log("Ending call...");
    if (status === "active" || status === "connecting") {
      setStatus(AgentStatus.disconnected);
      setIsTalking(false);
      await vapi.stop();
    }
  };

  return (
    <>
      <div className="card-wrapper w-full max-w-[800px] mx-auto mt-5 ">
        <div className="flex justify-around gap-x items-center overflow-hidden  rounded-4xl bg-black  backdrop-blur-md  px-4 py-2 shadow-xl border border-dark1/10 mx-auto relative w-[calc(100%-5px)] h-[90%] ">
          <div className="flex flex-col items-center justify-center h-[300px] relative group">
            {(status === "active" || status === "connecting") && (
              <button
                onClick={handleEndCall}
                className={`h-[70px] w-[70px] absolute flex justify-center items-center  transition-all rounded-full cursor-pointer z-[20] hover:scale-105 text-[18px] ${
                  status === "connecting" ? "bg-green-700" : "hover:bg-red-700"
                }
              ${
                isTalking || status === "active"
                  ? "bg-primary1/40 hover:bg-primary1/70"
                  : "hover:bg-red-700"
              }
            `}
              >
                <Icon
                  icon={
                    status === "active"
                      ? "fluent-color:mic-24"
                      : "solar:phone-calling-bold-duotone"
                  }
                  className="text-2xl text-white group-hover:scale-0 transition-all duration-300 absolute"
                />
                <Icon
                  icon="fluent:call-end-24-filled"
                  className="text-2xl text-white scale-0 group-hover:scale-100 transition-all duration-300 absolute"
                />
              </button>
            )}
            {(status === "disconnected" || status === "inactive") && (
              <button
                onClick={handleStartCall}
                className={`h-[70px] w-[70px] absolute flex justify-center items-center  transition-all rounded-full cursor-pointer z-[10] hover:scale-105 bg-green-700
            `}
              >
                <Icon icon="ion:call" className="text-2xl text-white" />
              </button>
            )}

            {(isTalking || status === "connecting") && (
              <div className=" flex items-center justify-center w-full h-full animate-slowping ">
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
            )}
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
                <div className="w-full h-full bg-primary1/20  rounded-md flex items-center justify-center">
                  <Icon icon="bi:person-fill" />
                </div>
              )}
            </div>
            <p className="capitalize font-semibold">{user?.username}</p>
          </div>
        </div>
      </div>
      {chats.length > 0 && (
        <motion.p
          className="max-w-[800px] mx-auto text-center text-[15px] font-light text-white/70 mt-2 mb-[100px] bg-primary1/20 rounded-3xl px-4 py-2 shadow-xl border border-dark1/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.42, 0, 0.58, 1], // custom ease for a smooth feel
          }}
        >
          {chats[chats.length - 1].content}
        </motion.p>
      )}
    </>
  );
};

export default Agent;
