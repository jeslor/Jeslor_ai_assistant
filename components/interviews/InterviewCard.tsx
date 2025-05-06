"use client";
import { refactorCompany } from "@/lib/helpers/general";
import React, { useEffect, useState } from "react";
import AiButton from "../AiButton";
import { useRouter } from "next/navigation";
import useUserStore from "../provider/userStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import useModalStore from "../provider/modalStore";
import { toast } from "sonner";
import { deleteInterview } from "@/lib/actions/interview.actions";
const InterviewCard = ({ interview, sectionId }: any) => {
  const { user } = useUserStore();
  const { openModal, closeModal } = useModalStore();
  const [feedback, setFeedback] = useState<any>(null);
  const [totalScore, setTotalScore] = useState(0);
  const Router = useRouter();

  useEffect(() => {
    if (user?.feedbacks) {
      const interviewFeedback = user.feedbacks.find(
        (feedback: any) => feedback.interviewId === interview.id
      );
      if (interviewFeedback) {
        setFeedback(interviewFeedback);
        setTotalScore(interviewFeedback.totalScore);
      } else {
        setTotalScore(0);
      }
    }
  }, [user, interview.id]);

  const retakeInterview = user?.feedbacks?.some(
    (feedback: any) => feedback.interviewId === interview.id
  );

  const handleDeleteInterview = async () => {
    try {
      const deleteInterView = await deleteInterview(interview.id);
      if (deleteInterView.status === 200) {
      } else {
        toast.error("Error deleting interview. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Error deleting interview. Please try again later.");
    }
  };

  const handleOpenDeleteModal = () => {
    openModal(
      <div className="flex flex-col items-center justify-center p-4 ">
        <h2 className="text-lg font-bold mb-4 text-slate-900">
          Are you sure you want to delete this interview?
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This action cannot be undone.
        </p>
        <div className="flex gap-x-4">
          <AiButton
            onPress={handleDeleteInterview}
            title="Delete"
            icon="ion:trash"
            extraClasses="bg-red-500 text-white"
          />
          <AiButton
            onPress={() => closeModal()}
            title="Cancel"
            icon="ion:close"
            extraClasses=" bg-dark1/70 text-white"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-dark1/10 w-full flex flex-col 
    "
    >
      {interview.userId === user?.id && (
        <button
          onClick={handleOpenDeleteModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
        >
          <Icon icon="ion:close" />
        </button>
      )}
      <div>
        <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md mb-4">
          <img
            src={`https://logo.clearbit.com/${refactorCompany(
              interview.company
            )}`}
            alt={refactorCompany(interview.company)}
            className="w-full h-full rounded-full  object-fit"
          />
        </div>
        <h2 className="text-primary1/90 font-bold mb-2 text-[22px] capitalize">
          {interview.role.toLowerCase().includes("front end")
            ? interview.role.replace("front end", "Frontend")
            : interview.role.toLowerCase().includes("back end")
            ? interview.role.replace("back end", "Backend")
            : interview.role}
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
            Your score:{" "}
            {retakeInterview ? (
              <span className="text-primary1/70">{totalScore}</span>
            ) : (
              "__"
            )}
            /100%
          </span>
        </p>
        <h4 className="text-center font-extrabold opacity-15 text-[28px] my-5">
          {interview.type}
        </h4>
      </div>
      <div className="flex-1 justify-between flex flex-col">
        <p className="text-slate-400 text-[15px] mb-2 opacity-50">
          You have not completed this interview yet. To take the test, please
          click the button below.{" "}
        </p>
        <div className="flex items-center justify-center mt-4 gap-x-3">
          {feedback && (
            <AiButton
              onPress={() =>
                Router.push(
                  `/interviews/${interview.id}/feedbacks/${feedback.id}`
                )
              }
              title="Feedback"
              icon="si:arrow-right-fill"
              extraClasses="bg-primary1/20 text-white"
            />
          )}
          <AiButton
            onPress={() => Router.push(`/interviews/${interview.id}`)}
            title={retakeInterview ? "Retake interview" : "Take interview"}
            icon="ion:call"
            extraClasses="bg-primary1/20 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
