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
        <div className="mt-5 w-full min-h-[50vh] rounded-full bg-radial-[at_50%_75%] from-primary1/20 via-dark1 to-dark1 to-90%">
          <h2 className="font-semibold text-2xl text-center text-white pt-10">
            You are now attending{" "}
            <span className="text-primary1">{interview?.role}</span> interview
          </h2>
          <ul className="max-w-[800px] mx-auto text-[15px]  text-white/70 mt-2 py-7 font-semibold list-disc flex flex-col gap-y-4">
            <li>
              This interview is for the{" "}
              <span className="">{interview?.role}</span> role.
            </li>
            <li>
              You will be asked a total of {interview?.questions.length} and
              your score will be out of 100%
            </li>
            <li>
              This is a {interview?.level} interview and s is a{" "}
              {interview?.type} type of interview{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
