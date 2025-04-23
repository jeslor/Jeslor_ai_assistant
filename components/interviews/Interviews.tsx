import React from "react";
import AiButton from "../AiButton";

const Interviews = () => {
  return (
    <div className="py-10 bg-black  relative z-2 w-full rounded-t-[30px] ">
      <div className="flex gap-x-4 mx-auto w-fit bg-white/10 backdrop-blur-md rounded-3xl  py-2 shadow-xl border border-dark1/10 px-10">
        <AiButton
          onPress={() => {}}
          title="My Interviews"
          icon=""
          extraClasses=""
        />
        <AiButton
          onPress={() => {}}
          title="Other Interviews"
          icon=""
          extraClasses=""
        />
        <AiButton
          onPress={() => {}}
          title="How to use"
          icon=""
          extraClasses=""
        />
      </div>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h3 className="text-white text-2xl font-semibold">Interviews</h3>
          <p className="text-gray-400 text-sm mt-2">
            Here you can find all your interviews
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h3 className="text-white text-2xl font-semibold">
            No Interviews Yet
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Start by creating an interview
          </p>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
