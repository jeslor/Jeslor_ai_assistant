"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import useUserStore from "@/components/provider/userStore";
import { getFeedBackByInterviewId } from "@/lib/actions/feedback.actions";
import { toast } from "sonner";

const page = () => {
  const { user } = useUserStore();
  const searchParams = useParams();
  const [feedback, setFeedback] = React.useState<any>(null);
  const { feedbackId } = searchParams;

  // optmise to get feedbackfrom user
  const fetchFeedback = async () => {
    const response = await getFeedBackByInterviewId(feedbackId as string);
    if (response.status === 200) {
      setFeedback(response.data);
    } else {
      setFeedback(null);
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFeedback();
    }
  }, [user]);

  const status = feedback?.totalScore > 60 ? "Passed" : "Failed";

  return (
    <div className="pb-10 pt-[100px] mt-[-60px] w-full bg-gradient-to-b from-primary1/50 via-dark1/50  to-dark1 relative">
      <div className="min-h-[50vh] w-full flex ">
        {feedback && (
          <div className="max-w-[1300px] w-full flex flex-col items-center justify-center bg-dark1/90 backdrop-blur-md rounded-3xl px-2 shadow-xl border border-dark1/10 mx-auto sm:px-8 py-[30px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className=" "
            >
              <h2 className="text-4xl font-bold text-center mb-6 text-[--color-primary1]">
                Interview Result
              </h2>

              <div className="flex flex-col md:flex-row justify-between items-center mb-8 opacity-60">
                <div className="mb-2 flex gap-x-1 md:mb-0 ">
                  <p className="text-lg font-semibold">Candidate:</p>
                  <p className="text-2xl font-bold capitalize">
                    {user?.username}
                  </p>
                </div>
                <div className="mb-2 flex gap-x-1 md:mb-0">
                  <p className="text-lg font-semibold">Status:</p>
                  <p className={`text-2xl font-bold text-primary1/80`}>
                    {status}
                  </p>
                </div>
                <div className="mb-2 flex gap-x-1 md:mb-0">
                  <p className="text-lg font-semibold">Score:</p>
                  <p className="text-2xl font-bold">
                    {feedback.totalScore} / 100
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6"
              >
                <h3 className="text-xl font-semibold mb-2 text-primary1">
                  Section-wise Performance
                </h3>
                <ul className="space-y-3">
                  {feedback.categoryScores.map(
                    (section: any, index: number) => (
                      <li
                        key={index}
                        className="flex flex-col  bg-white/10 px-4 py-2 rounded-xl shadow-md"
                      >
                        <p className="font-semibold flex justify-between items-center">
                          <span>{section.name}</span>
                          <span className="text-lg font-semibold">
                            {section.score}
                          </span>
                        </p>
                        <p>
                          <span className="text-lg font-regular text-[14px] opacity-60">
                            {section.comment}
                          </span>
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
              {feedback.strengths.length > 0 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-primary1">
                    Your personal strengths
                  </h3>
                  <ul className="flex flex-col gap-y-4 bg-white/10 py-7 list-disc pl-9 pr-4  rounded-2xl">
                    {feedback.strengths.map((strength: any, index: number) => (
                      <li key={index} className="">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {feedback.areasForImprovement.length > 0 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-primary1 pt-5">
                    Areas of improvement
                  </h3>
                  <ul className="flex flex-col gap-y-4 bg-white/10 py-7 list-disc pl-9 pr-4  rounded-2xl">
                    {feedback.areasForImprovement.map(
                      (area: any, index: number) => (
                        <li key={index} className="">
                          {area}
                        </li>
                      )
                    )}
                  </ul>
                </motion.div>
              )}
              {feedback.finalAssessment && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-primary1 pt-5">
                    Final assessment
                  </h3>
                  <p className="font-semibold text-primary1/60">
                    {feedback.finalAssessment}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
