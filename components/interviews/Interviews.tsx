"use client";
import React, { memo, useEffect, useState } from "react";
import AiButton from "../AiButton";
import useUserStore from "../provider/userStore";

import InterviewSkeleton from "../skeletons/InterviewSkeleton";
import Link from "next/link";
import InterviewCard from "./InterviewCard";
import { useInView } from "react-intersection-observer";
import LottieAnimation from "../LottieAnimation";
import { useSearchParams } from "next/navigation";
import useInterviewStore from "../provider/interViewStore";
import { getInterviewsByUser } from "@/lib/actions/interview.actions";
import Loading from "../ui/loading";

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

  const [stickyInterviewMenu, setStickyInterviewMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const id = searchParams.get("id");
  const initialSection =
    sectionsData.find((section) => section.id === Number(id)) ||
    sectionsData[0];
  const [selectedSection, setSelectedSection] = useState<any>(initialSection);
  const [interviews, setInterviews] = useState<any>([]);

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
  const {
    otherInterviews,
    userInterviews,
    fetchUserInterviews,
    fetchNotUserInterviews,
    isAllInterviews,
    fetchMoreUserInterviews,
    fetchMoreNotUserInterviews,
  } = useInterviewStore();

  const fetchInterviews = async () => {
    setIsLoading(true);
    if (selectedSection.id === 1) {
      await fetchUserInterviews();
    } else {
      await fetchNotUserInterviews();
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (user) {
      fetchInterviews();
    }
  }, [user, selectedSection]);

  useEffect(() => {
    if (user) {
      if (selectedSection.id === 1) {
        setInterviews(
          isMain
            ? [...new Set(userInterviews)]
            : [...new Set(userInterviews.slice(0, 4))]
        );
      }
      if (selectedSection.id === 2) {
        setInterviews(
          isMain
            ? [...new Set(otherInterviews)]
            : [...new Set(otherInterviews.slice(0, 4))]
        );
      }
    }
  }, [user, selectedSection, userInterviews, otherInterviews]);

  useEffect(() => {
    if (isMain) {
      document.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
          setStickyInterviewMenu(true);
        } else {
          setStickyInterviewMenu(false);
        }
      });
    }
    return () => {
      document.removeEventListener("scroll", () => {
        if (window.scrollY > 60) {
          setStickyInterviewMenu(true);
        } else {
          setStickyInterviewMenu(false);
        }
      });
    };
  }, [isMain]);

  useEffect(() => {
    if (inView) {
      if (selectedSection.id === 1) {
        if (!isAllInterviews.user) {
          fetchMoreUserInterviews();
        }
      }
      if (selectedSection.id === 2) {
        if (!isAllInterviews.other) {
          fetchMoreNotUserInterviews();
        }
      }
    }
  }, [inView, selectedSection, isAllInterviews]);

  return (
    <div
      className={`py-10 bg-black  z-2 w-full rounded-t-[30px] pt-[100px] relative  ${
        isMain
          ? "min-h-[100vh] pt-[50px] interviewContainer sticky top-[60px] mx-auto"
          : ""
      } `}
    >
      <div
        className={`${
          isMain ? "   top-[60px] z-50" : "-mt-[40px]"
        } flex gap-x-4 mx-auto w-full overflow-x-scroll sm:w-fit bg-white/10 backdrop-blur-md rounded-3xl  py-2 shadow-xl border border-dark1/10 px-10  ${
          stickyInterviewMenu
            ? "top-0 left-[50%] translate-x-[-50%]  justify-center fixed"
            : "absolute left-[50%] translate-x-[-50%]"
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
                  section.id === selectedSection?.id
                    ? "from-orange-900 to-orange-900"
                    : ""
                }
              />
            )
          ) : (
            <AiButton
              key={section.id}
              onPress={() => handleSectionClick(section)}
              title={section.title}
              icon={section.icon}
              extraClasses={`
                whitespace-nowrap
               ${
                 section.id === selectedSection?.id
                   ? "from-orange-900 to-orange-900"
                   : ""
               }
                `}
            />
          )
        )}
      </div>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h3 className="text-white text-2xl font-semibold">
            {selectedSection?.title}
          </h3>
          {isLoading && interviews.length === 0 && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,_1fr))] gap-4 mt-4 w-full repeated-grids px-4 max-w-[1500px]">
              <InterviewSkeleton totalCards={4} />
            </div>
          )}
          {interviews?.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center w-full ">
              <LottieAnimation path="/media/animations/noInterviewFound.json" />
              <p className="text-slate-200/50 text-center text-[14px]">
                No interviews found. Please generate some by clicking the button
                below.
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
          )}{" "}
          {interviews?.length ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,_1fr))] gap-x-4 gap-y-8 mt-4 w-full repeated-grids px-4 max-w-[1500px]">
              {interviews?.map((interview: any) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  sectionId={selectedSection.id}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {!isMain && interviews?.length ? (
        <Link
          className="py-10 ml-[50%] -translate-x-[50%] inline-block text-center  font-semibold hover:text-primary1"
          href={`/interviews?id=${selectedSection.id}`}
        >
          View all interviews
        </Link>
      ) : null}
      {isMain &&
        ((selectedSection?.id === 1 && !isAllInterviews.user) ||
          (selectedSection?.id === 2 && !isAllInterviews.other)) && (
          <div className="pb-10 pt-[50px] flex items-center justify-center">
            <Loading ref={ref} />
          </div>
        )}
    </div>
  );
});

export default Interviews;
