"use client";

import AiButton from "../AiButton";

const PositionInput = () => {
  return (
    <>
      <div className="card-wrapper w-full max-w-[800px] mx-auto mt-5 ">
        <div className="flex  gap-x items-center justify-around flex-1  rounded-4xl bg-slate-50 min-h-[300px]  backdrop-blur-md  px-4 py-2 shadow-xl border border-dark1/10 mx-auto relative w-[calc(100%-5px)] h-[90%] ">
          <AiButton
            title="Generate interview"
            icon=""
            onPress={() => {}}
            extraClasses="bg-primary1/70 hover:bg-primary1/70 absolute bottom-2 "
          />
        </div>
      </div>
    </>
  );
};

export default PositionInput;
