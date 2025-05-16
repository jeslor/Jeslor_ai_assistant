import React, { useEffect } from "react";

const LoadingContent = ({ title }: { title: string }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed z-[400] left-0 top-0 h-screen w-screen bg-black/80 flex items-center justify-center">
      <div className="h-[150px] w-[150px] relative flex justify-center items-center">
        <div className=" z-[1] absolute h-full w-full rounded-full border-amber-50 border-t-primary1 border-3 animate-spin m-1"></div>
        <div className="flex justify-center items-center absolute h-full w-full rounded-full text-center bg-slate-100/90 p-5 text-dark1 font-semibold">
          {title}
        </div>
      </div>
    </div>
  );
};

export default LoadingContent;
