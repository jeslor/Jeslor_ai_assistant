"use client";

import AiButton from "../AiButton";

const PositionInput = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 ">
      <div className="card-wrapper w-full max-w-[800px] mx-auto mt-5 ">
        <div className="flex  gap-x items-center justify-around flex-1  rounded-4xl bg-dark1 min-h-[322px]  backdrop-blur-md  px-4 py-2 shadow-xl border border-dark1/10 mx-auto relative w-[calc(100%-5px)] h-[90%] "></div>
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
