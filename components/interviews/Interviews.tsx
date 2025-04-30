"use client";
import React, { memo, useEffect, useState } from "react";
import AiButton from "../AiButton";
import useUserStore from "../provider/userStore";
import {
  getInterviewsByUser,
  getInterviewsNotByUser,
} from "@/lib/actions/interviews";
import { toast } from "sonner";
import InterviewSkeleton from "../skeletons/InterviewSkeleton";
import Link from "next/link";
import InterviewCard from "./InterviewCard";
import Loading from "../ui/loading";
import { useInView } from "react-intersection-observer";
import LottieAnimation from "../LottieAnimation";

const Interviews = memo(({ isMain }: { isMain?: boolean }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const { user } = useUserStore();
  const [userInterviews, setUserInterviews] = useState<any[]>([]);
  const [notUserInterviews, setNotUserInterviews] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>(userInterviews);
  const [isLoading, setIsLoading] = useState(true);
  const [stickyInterviewMenu, setStickyInterviewMenu] = useState(false);
  const [isAllInterviews, setIsAllInterviews] = useState(false);
  const [limit, setLimit] = useState({
    userLimit: 4,
    notUserLimit: 4,
  });
  const [sections, setSections] = useState<any[]>([
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
  ]);

  const [selectedSection, setSelectedSection] = useState<any>(sections[0]);

  const fetchInterviews = async () => {
    try {
      setIsLoading(true);
      if (selectedSection.id === 1) {
        const userInterviewsResponse = await getInterviewsByUser(
          user?.id,
          limit.userLimit
        );
        if (userInterviewsResponse.status === 200) {
          if (userInterviewsResponse.data) {
            setUserInterviews(
              userInterviewsResponse.data ? userInterviewsResponse.data : []
            );
            if (isMain) {
              setLimit({
                ...limit,
                userLimit: limit.userLimit + 4,
              });
            }
          } else {
            setIsAllInterviews(true);
          }
        } else {
          toast.error(userInterviewsResponse.message);
        }
      } else {
        const notUserInterviewsResponse = await getInterviewsNotByUser(
          user?.id,
          limit.notUserLimit
        );

        if (notUserInterviewsResponse.status === 200) {
          setNotUserInterviews(
            notUserInterviewsResponse.data ? notUserInterviewsResponse.data : []
          );
        } else {
          toast.error(notUserInterviewsResponse.message);
        }
      }
    } catch (error) {
      toast.error(`Error fetching interviews. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchInterviews();
    }
  }, [user]);

  useEffect(() => {
    if (selectedSection.id === 1) {
      setInterviews(userInterviews);
    }
    if (selectedSection.id === 2) {
      setInterviews(notUserInterviews);
    }
    if (selectedSection.id === 3) {
      setInterviews([]);
    }
  }, [selectedSection.id, userInterviews, notUserInterviews]);

  useEffect(() => {
    if (interviews.length > 0) {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === 1
            ? { ...section, title: `My Interviews (${interviews.length})` }
            : section
        )
      );
    }
  }, [interviews]);

  useEffect(() => {
    const handleScroll = () => {
      const aiLogo = document.querySelector(".stickyInterViewMenu");
      if (aiLogo) {
        if (window.scrollY > 70) {
          setStickyInterviewMenu(true);
        } else {
          setStickyInterviewMenu(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSectionClick = (section: any) => {
    const interviewContainer = document.querySelector(".interviewContainer");
    sections.find((s) => s.id === section.id)
      ? setSelectedSection(section)
      : setSelectedSection(sections[0]);
    if (interviewContainer) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  console.log("inside interview", inView);

  return (
    <div
      className={`pt-10 bg-black  relative z-2 w-full rounded-t-[30px]  ${
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
        {sections.map((section) => (
          <AiButton
            key={section.id}
            onPress={() => handleSectionClick(section)}
            title={section.title}
            icon={section.icon}
            extraClasses={
              section.id === selectedSection.id ? "bg-primary1" : ""
            }
          />
        ))}
      </div>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <h3 className="text-white text-2xl font-semibold">
            {selectedSection.title}
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
            <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,_1fr))] gap-4 mt-4 w-full repeated-grids px-4 max-w-[1500px]">
              {interviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          )}
        </div>
      </div>
      {!isMain && interviews.length && (
        <Link
          className="py-10 ml-[50%] -translate-x-[50%] inline-block text-center  font-semibold hover:text-primary1"
          href="/interviews"
        >
          View all interviews
        </Link>
      )}
      {isMain && (
        <div className="py-10 flex items-center justify-center">
          <Loading ref={ref} />
        </div>
      )}
    </div>
  );
});

export default Interviews;
