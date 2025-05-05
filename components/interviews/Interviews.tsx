"use client";
import React, { memo, use, useCallback, useEffect, useState } from "react";
import AiButton from "../AiButton";
import useUserStore from "../provider/userStore";
import useInterviewStore from "@/components/provider/interviewStore";
import InterviewSkeleton from "../skeletons/InterviewSkeleton";
import Link from "next/link";
import InterviewCard from "./InterviewCard";
import Loading from "../ui/loading";
import { useInView } from "react-intersection-observer";
import LottieAnimation from "../LottieAnimation";
import { useSearchParams } from "next/navigation";

const sectionsData = [
  {
    id: 1,
    title: "My Interviews",
    icon: "",
    extraClasses: "",
  },
  {
    id: 2,
    title: "Other Interviews",
    icon: "",
    extraClasses: "",
  },
  {
    id: 3,
    title: "How to use",
    icon: "",
    extraClasses: "",
  },
];

const Interviews = memo(({ isMain = false }: { isMain?: boolean }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const { interviews, setInterviews, isLoading, setIsMain, isAllInterviews } =
    useInterviewStore();
  const [stickyInterviewMenu, setStickyInterviewMenu] = useState(false);

  const id = searchParams.get("id");
  const initialSection =
    sectionsData.find((section) => section.id === Number(id)) ||
    sectionsData[0];
  const [selectedSection, setSelectedSection] = useState<any>(initialSection);

  useEffect(() => {
    setIsMain(isMain);
  }, []);

  useEffect(() => {
    if (user) {
      setInterviews(selectedSection);
    }
  }, [user, selectedSection.id, inView]);

  const handleSectionClick = (section: any) => {
    const interviewContainer = document.querySelector(".interviewContainer");
    sectionsData.find((s) => s.id === section.id)
      ? setSelectedSection(section)
      : setSelectedSection(sectionsData[0]);
    if (interviewContainer) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isMain) {
      setStickyInterviewMenu(true);
    } else {
      setStickyInterviewMenu(false);
    }
  }, [isMain]);

  return (
    <div
      className={`py-10 bg-black  relative z-2 w-full rounded-t-[30px]  ${
        isMain
          ? "min-h-[100vh] pt-[50px] interviewContainer sticky top-[60px] mx-auto"
          : ""
      } `}
    >
      <div
        className={`${
          isMain ? "  sticky top-[60px] z-50" : ""
        } flex gap-x-4 mx-auto w-fit bg-white/10 backdrop-blur-md rounded-3xl  py-2 shadow-xl border border-dark1/10 px-10  ${
          stickyInterviewMenu
            ? "top-0 left-[50%] translate-x-[-50%]  justify-center"
            : ""
        }`}
      >
        {sectionsData.map((section) =>
          isMain ? (
            section.id !== 3 && (
              <AiButton
                key={section.id}
                onPress={() => handleSectionClick(section)}
                title={section.title}
                icon={section.icon}
                extraClasses={
                  section.id === selectedSection?.id ? "bg-primary1" : ""
                }
              />
            )
          ) : (
            <AiButton
              key={section.id}
              onPress={() => handleSectionClick(section)}
              title={section.title}
              icon={section.icon}
              extraClasses={
                section.id === selectedSection?.id ? "bg-primary1" : ""
              }
            />
          )
        )}
      </div>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h3 className="text-white text-2xl font-semibold">
            {selectedSection?.title}
          </h3>
          {isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,_1fr))] gap-4 mt-4 w-full repeated-grids px-4 max-w-[1500px]">
              <InterviewSkeleton totalCards={4} />
            </div>
          ) : interviews.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center w-full ">
              <LottieAnimation path="/media/animations/noInterviewFound.json" />
              <p className="text-slate-200/50 text-center text-[14px]">
                No interviews found. Please check back later.
              </p>
              <AiButton
                onPress={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                title="generate an interview"
                icon=""
                extraClasses="mt-4"
              />
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,_1fr))] gap-x-4 gap-y-8 mt-4 w-full repeated-grids px-4 max-w-[1500px]">
              {interviews.map((interview: any) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          )}
        </div>
      </div>
      {!isMain && interviews.length && (
        <Link
          className="py-10 ml-[50%] -translate-x-[50%] inline-block text-center  font-semibold hover:text-primary1"
          href={`/interviews?id=${selectedSection.id}`}
        >
          View all interviews
        </Link>
      )}
      {isMain &&
        ((selectedSection?.id === 1 && !isAllInterviews.isAllUser) ||
          (selectedSection?.id === 2 && !isAllInterviews.isAllNotUser)) && (
          <div className="py-10 flex items-center justify-center">
            <Loading ref={ref} />
          </div>
        )}
    </div>
  );
});

export default Interviews;
