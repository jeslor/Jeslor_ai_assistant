"use client";
import { refactorCompany } from "@/lib/helpers/general";
import React, { useEffect, useState } from "react";
import AiButton from "../AiButton";
import { useRouter } from "next/navigation";
import useUserStore from "../provider/userStore";

const InterviewCard = ({ interview }: any) => {
  const { user } = useUserStore();
  const [totalScore, setTotalScore] = useState(0);
  const Router = useRouter();

  useEffect(() => {
    if (user?.feedbacks) {
      const interviewFeedback = user.feedbacks.find(
        (feedback: any) => feedback.interviewId === interview.id
      );
      if (interviewFeedback) {
        setTotalScore(interviewFeedback.totalScore);
      } else {
        setTotalScore(0);
      }
    }
  }, [user, interview.id]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-dark1/10 w-full">
      <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md mb-4">
        <img
          src={`https://logo.clearbit.com/${refactorCompany(
            interview.company
          )}`}
          alt={refactorCompany(interview.company)}
          className="w-full h-full rounded-full  object-fit"
        />
      </div>
      <h2 className="text-primary1/90 font-bold mb-2 text-[22px]">
        {interview.role}
      </h2>
      <p className="text-primary1/50 font-semibold uppercase text-[12px] mb-2">
        {interview.level}
      </p>
      <p className="text-slate-400 text-[12px] mb-2 opacity-60">
        {interview.techstack.join(", ")}
      </p>
      <p className="flex flex-col justify-between  font-bold flex-wrap gap-2 opacity-80 py-3">
        <span className="">Total questions: {interview.questions}</span>
        <span className="font-bold">
          Your score: {totalScore > 0 ? totalScore : "__"}/100%
        </span>
      </p>
      <h4 className="text-center font-extrabold opacity-15 text-[28px] my-5">
        {interview.type}
      </h4>
      <div>
        <p className="text-slate-400 text-[15px] mb-2 opacity-50">
          You have not completed this interview yet. To take the test, please
          click the button below.{" "}
        </p>
        <div className="flex items-center justify-center mt-4">
          <AiButton
            onPress={() => Router.push(`/interviews/${interview.id}`)}
            title={totalScore > 0 ? "Retake interview" : "Take interview"}
            icon="ion:call"
            extraClasses="bg-primary1/20 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
