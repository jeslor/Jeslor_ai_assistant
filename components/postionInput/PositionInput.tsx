"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import AiButton from "../AiButton";
import { useEffect, useState } from "react";

interface PositionInputProps {
  positionInput: string;
  setPositionInput: (input: string) => void;
}

const PositionInput = ({
  positionInput,
  setPositionInput,
}: PositionInputProps) => {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (positionInput) {
      setCurrentText(positionInput);
    }
  }, []);
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCurrentText(text);
      setPositionInput(text);
    } catch (err) {
      setPositionInput("Could not read clipboard!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrentText(value);
    setPositionInput(value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-2 ">
      <div className="card-wrapper w-full max-w-[800px] mx-auto mt-3 ">
        <div className="flex  gap-x items-center justify-around flex-1  rounded-4xl bg-black min-h-[322px]  backdrop-blur-md  px-4 py-2 shadow-xl border border-dark1/10 mx-auto relative w-[calc(100%-5px)] h-[90%] p-4">
          <div
            className={`absolute ${
              currentText.length > 0 ? "z-[2]" : "z-[1]"
            } h-full w-full p-4 text-[14px] opacity-80`}
          >
            <textarea
              value={currentText}
              onChange={handleChange}
              placeholder="Paste job position here..."
              className="h-full w-full outline-0"
            />
          </div>
          <button
            onClick={handlePaste}
            className={`${
              currentText.length === 0 ? "z-[2] opacity-75" : "z-[1] opacity-0"
            } flex items-center justify-center gap-1  absolute top-2 left-2 h-full w-full cursor-pointer`}
          >
            <Icon icon="mingcute:paste-line" className="size-10" />
            Paste
          </button>
        </div>
      </div>
      <AiButton
        title="Generate interview"
        icon=""
        onPress={() => {}}
        extraClasses="bg-primary1/70 hover:bg-primary1/70  bottom-2 w-full  max-w-[800px] mx-auto  text-white rounded-3xl  cursor-pointer  text-[15px] px-4 py-2 flex justify-center items-center mb-[100px]"
      />
    </div>
  );
};

export default PositionInput;
