import React from "react";

const InterviewSkeleton = ({ totalCards }: any) => {
  return Array.from({ length: totalCards }, (_, index) => (
    <div
      key={index}
      className="animate-pulse bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-dark1/10 w-full"
    >
      <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md mb-4">
        <div className="h-full w-full bg-gray-300/30 rounded-full" />
      </div>
      <div className="h-5 bg-gray-300/30 rounded mb-2 w-2/3" />
      <div className="h-4 bg-gray-300/20 rounded mb-1 w-1/3" />
      <div className="h-3 bg-gray-300/20 rounded mb-4 w-3/4" />
      <div className="h-4 bg-gray-300/30 rounded mb-4 w-1/2" />
      <div className="h-7 bg-gray-300/10 rounded mb-6 w-full text-center" />
      <div className="h-4 bg-gray-300/20 rounded mb-2 w-full" />
      <div className="h-4 bg-gray-300/20 rounded mb-2 w-11/12" />
      <div className="h-4 bg-gray-300/20 rounded mb-6 w-2/3" />
      <div className="h-10 w-40 bg-gray-300/30 rounded-full mx-auto" />
    </div>
  ));
};

export default InterviewSkeleton;
