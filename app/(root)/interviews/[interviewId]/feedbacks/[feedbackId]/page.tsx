"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import useUserStore from "@/components/provider/userStore";
import { getFeedBackByInterviewId } from "@/lib/actions/feedback.actions";

const page = () => {
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const interviewId = searchParams.get("interviewId");
  const feedbackId = searchParams.get("feedbackId");
  const [feedback, setFeedback] = React.useState<any>(null);

  // optmise to get feedbackfrom user
  const fetchFeedback = async () => {
    const response = await getFeedBackByInterviewId(feedbackId as string);
  };

  useEffect(() => {}, [user]);
  const result = {
    status: "Passed",
    score: 85,
    total: 100,
    sections: [
      { name: "Technical Skills", score: 40 },
      { name: "Problem Solving", score: 30 },
      { name: "Communication", score: 15 },
      { name: "Teamwork", score: 10 },
    ],
    feedback:
      "Great job! You demonstrated excellent problem-solving skills and a strong understanding of technical concepts. Keep up the good work!",
  };
  return (
    <div className="pb-10 pt-[100px] mt-[-60px] w-full bg-gradient-to-b from-primary1/50 via-dark1/50  to-dark1 relative">
      <div className="min-h-[50vh] w-full flex ">
        <div className="max-w-[1300px] w-full flex flex-col items-center justify-center bg-dark1/90 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-dark1/10 mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-lg bg-[--color-secondary1]/30 shadow-2xl rounded-2xl w-full "
          >
            <h2 className="text-4xl font-bold text-center mb-6 text-[--color-primary1]">
              Interview Result
            </h2>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-semibold">Candidate:</p>
                <p className="text-2xl font-bold">{user?.username}</p>
              </div>
              <div>
                <p className="text-lg font-semibold">Status:</p>
                <p
                  className={`text-2xl font-bold ${
                    result.status === "Passed"
                      ? "text-[--color-primary1]"
                      : "text-red-400"
                  }`}
                >
                  {result.status}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">Score:</p>
                <p className="text-2xl font-bold">
                  {result.score} / {result.total}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold mb-2 text-[--color-primary1]">
                Section-wise Performance
              </h3>
              <ul className="space-y-3">
                {result.sections.map((section, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-xl shadow-md"
                  >
                    <span>{section.name}</span>
                    <span className="text-lg font-semibold">
                      {section.score}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-[--color-primary1]">
                Feedback
              </h3>
              <p className="bg-white/10 p-4 rounded-xl text-sm shadow-inner">
                {result.feedback}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;
