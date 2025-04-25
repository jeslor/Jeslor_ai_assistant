import Agent from "@/components/Agent/Agent";
import { getInterViewById } from "@/lib/actions/interviews";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    interviewId: string;
  };
}) => {
  const { interviewId } = params;
  const { data: interview } = await getInterViewById(interviewId);

  return (
    <div className="py-10 w-full">
      <div className="flex flex-col w-full">
        <div className=""></div>
        <div className="absolute">
          <img className="opacity-[0.11]" src="/media/images/logo.png" />
        </div>
        <Agent />
        <div className="w-full min-h-[50vh] rounded-full bg-radial-[at_50%_75%] from-primary1/20 to-black to-90%">
          <h2 className="font-semibold text-2xl text-center text-white pt-10">
            You are now attending{" "}
            <span className="text-primary1">{interview?.role}</span> interview
          </h2>
        </div>
      </div>
    </div>
  );
};

export default page;
