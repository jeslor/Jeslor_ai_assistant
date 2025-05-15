"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import AiButton from "../AiButton";
import { useEffect, useState } from "react";
import useModalStore from "../provider/modalStore";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface PositionInputProps {
  positionInput: string;
  setPositionInput: (input: string) => void;
}

const PositionInput = ({
  positionInput,
  setPositionInput,
}: PositionInputProps) => {
  const [currentText, setCurrentText] = useState("");
  const [extraDetails, setExtraDetails] = useState({
    companyWebsite: "",
    totalQuestions: 0,
  });
  const [showGenerateInterviewModal, setShowGenerateInterviewModal] =
    useState(false);

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

  const handleOpenGenerateModal = () => {
    if (currentText.length === 0) {
      toast.warning("Please add a job description to generate an interview");
      return;
    }
    setShowGenerateInterviewModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseGenerateModal = () => {
    setShowGenerateInterviewModal(false);
    document.body.style.overflow = "auto";
  };

  const handleGenerateInterview = () => {
    console.log("Generating interview with details: ", {
      positionInput: currentText,
      companyWebsite: extraDetails.companyWebsite,
      totalQuestions: extraDetails.totalQuestions,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-2 ">
      {showGenerateInterviewModal && (
        <div
          onClick={handleCloseGenerateModal}
          className="fixed inset-0 z-[199] flex items-center justify-center bg-black/90"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-300 rounded-xl p-6 max-w-md w-full relative"
          >
            <div className="flex flex-col items-center justify-center p-4 ">
              <h2 className="text-lg font-bold mb-4 text-slate-900">
                You are almost there!
              </h2>
              <div className="w-full py-8">
                <div className="flex flex-col mb-4 gap-y-1 w-full ">
                  <label
                    htmlFor="companyWebsite"
                    className="text-dark1/60 text-[14px] font-bold"
                  >
                    Enter Company website
                  </label>
                  <Input
                    id="companyWebsite"
                    type="text"
                    placeholder="Company website"
                    value={extraDetails.companyWebsite}
                    onChange={(e) =>
                      setExtraDetails({
                        ...extraDetails,
                        companyWebsite: e.target.value,
                      })
                    }
                    className="border-2 border-dark1/50 rounded-md p-2 pv-0 w-full text-[14px] text-dark1/70 focus:outline-none focus:border-primary1/70 focus:ring-1 focus:ring-primary1/70"
                  />
                </div>
                <label
                  htmlFor="companyWebsite"
                  className="text-dark1/60 text-[14px] font-bold"
                >
                  Total Questions
                </label>
                <Input
                  id="totalQuestions"
                  type="number"
                  min={1}
                  max={10}
                  value={extraDetails.totalQuestions}
                  placeholder="Total Questions"
                  onChange={(e) =>
                    setExtraDetails({
                      ...extraDetails,
                      totalQuestions: parseInt(e.target.value),
                    })
                  }
                  className="border-2 border-dark1/50 rounded-md p-2 pv-0 w-full text-[14px] text-dark1/70 focus:outline-none focus:border-primary1/70 focus:ring-1 focus:ring-primary1/70"
                />
              </div>
              <div className="flex gap-x-4">
                <AiButton
                  onPress={handleGenerateInterview}
                  title="Generate interview"
                  icon=""
                  extraClasses="bg-red-500 text-white"
                />
                <AiButton
                  onPress={handleCloseGenerateModal}
                  title="Cancel"
                  icon="ion:close"
                  extraClasses=" bg-dark1/70 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
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
              placeholder="Paste job description here..."
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
        isDisabled={currentText.length === 0}
        onPress={() => handleOpenGenerateModal()}
        extraClasses="bg-primary1/70 hover:bg-primary1/70  bottom-2 w-full  max-w-[800px] mx-auto  text-white rounded-3xl  cursor-pointer  text-[15px] px-4 py-2 flex justify-center items-center mb-[100px]"
      />
    </div>
  );
};

export default PositionInput;
