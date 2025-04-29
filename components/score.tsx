"use client";
import React, { useEffect, useState, memo } from "react";
import useUserStore from "./provider/userStore";

type ScoreCircleProps = {
  size?: number;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  interviewId: string;
};

const ScoreCircle: React.FC<ScoreCircleProps> = memo(
  ({ size = 120, strokeWidth = 10, duration = 1000, interviewId }) => {
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const { user } = useUserStore();

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
      let userScore = 0;
      if (user) {
        if (user.feedbacks) {
          const interviewFeedback = user.feedbacks.find(
            (feedback: any) => feedback.interviewId === interviewId
          );
          if (interviewFeedback) {
            userScore = interviewFeedback.totalScore;
          } else {
            userScore = 0;
          }
        }
        setScore(userScore);
        setProgress(userScore);
      }
    }, [user, interviewId]);

    useEffect(() => {
      let start: number | null = null;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progressRatio = Math.min(elapsed / duration, 1);
        setProgress(score * progressRatio);
        if (elapsed < duration) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, [score, duration]);

    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            className="stroke-primary1/20"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="stroke-primary1"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{ transition: "stroke-dashoffset 0.3s" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-gray-700">
          {Math.round(progress)}%
        </div>
      </div>
    );
  }
);

export default ScoreCircle;
