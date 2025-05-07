"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface ButtonProps {
  onPress: () => void;
  title: string;
  icon: any;
  extraClasses?: string;
}
const AiButton = ({ onPress, title, icon, extraClasses }: ButtonProps) => {
  return (
    <button
      onClick={() => onPress()}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-bl from-gray-900 to-primary1/10 backdrop-blur-md text-white shadow-inner  border border-white/10 text-sm hover:bg-gradient-to-bl hover:from-dark/50 hover:to-primary1/50 transition duration-300 ease-in-out cursor-pointer ${extraClasses}`}
    >
      <span className="text-[13px] font-medium flex items-center gap-x-2">
        {title}

        {icon && <Icon icon={icon} className="ml-0 size-[20px]" />}
      </span>
    </button>
  );
};

export default AiButton;
