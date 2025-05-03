"use client";
import React, { memo, use, useCallback, useEffect, useState } from "react";
import AiButton from "../AiButton";
import useUserStore from "../provider/userStore";

import { toast } from "sonner";
import InterviewSkeleton from "../skeletons/InterviewSkeleton";
import Link from "next/link";
import InterviewCard from "./InterviewCard";
import Loading from "../ui/loading";
import { useInView } from "react-intersection-observer";
import LottieAnimation from "../LottieAnimation";
import { useSearchParams } from "next/navigation";
import {
  getInterviewsByUser,
  getInterviewsNotByUser,
} from "@/lib/actions/interview.actions";

const Interviews = memo(({ isMain }: { isMain?: boolean }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const [userInterviews, setUserInterviews] = useState<any[]>([]);
  const [notUserInterviews, setNotUserInterviews] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>(userInterviews);
  const [isLoading, setIsLoading] = useState(true);
  const [stickyInterviewMenu, setStickyInterviewMenu] = useState(false);
  const [isAllInterviews, setIsAllInterviews] = useState({
    user: false,
    notUser: false,
  });
  const [page, setPage] = useState({
    userPage: 0,
    notUserPage: 0,
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

  const id = searchParams.get("id");
  const initialSection =
    sections.find((section) => section.id === Number(id)) || sections[0];
  const [selectedSection, setSelectedSection] = useState<any>(initialSection);

  const fetchInterviews = useCallback(async () => {
    try {
      setIsLoading(true);
      if (selectedSection.id === 1) {
        const userInterviewsResponse = await getInterviewsByUser(
          user?.id,
          page.userPage
        );
        if (userInterviewsResponse.status === 200) {
          if (userInterviewsResponse.data) {
            setUserInterviews(
              userInterviewsResponse.data
                ? [...userInterviews, ...userInterviewsResponse.data]
                : []
            );
            if (isMain) {
              setPage({
                ...page,
                userPage: page.userPage + 1,
              });
            }
          } else {
            setIsAllInterviews({
              ...isAllInterviews,
              user: true,
            });
          }
        } else {
          toast.warning(userInterviewsResponse.message);
          setIsAllInterviews({
            ...isAllInterviews,
            user: true,
          });
        }
      } else {
        const notUserInterviewsResponse = await getInterviewsNotByUser(
          user?.id,
          page.notUserPage
        );

        if (notUserInterviewsResponse.status === 200) {
          if (notUserInterviewsResponse.data) {
            setNotUserInterviews(
              notUserInterviewsResponse.data
                ? [...notUserInterviews, ...notUserInterviewsResponse.data]
                : []
            );
            if (isMain) {
              setPage({
                ...page,
                notUserPage: page.notUserPage + 1,
              });
            }
          } else {
            setIsAllInterviews({
              ...isAllInterviews,
              notUser: true,
            });
          }
        } else {
          toast.warning(notUserInterviewsResponse.message);
          setIsAllInterviews({
            ...isAllInterviews,
            notUser: true,
          });
        }
      }
    } catch (error) {
      toast.error(`Error fetching interviews. ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedSection.id,
    user?.id,
    page.userPage,
    page.notUserPage,
    isMain,
    userInterviews,
    notUserInterviews,
    isAllInterviews,
  ]);

  useEffect(() => {
    if (user?.id) {
      if (!isMain) {
        if (
          selectedSection.id === 1 &&
          userInterviews.length === 0 &&
          !isAllInterviews.user
        ) {
          fetchInterviews();
        } else if (
          selectedSection.id === 2 &&
          notUserInterviews.length === 0 &&
          !isAllInterviews.notUser
        ) {
          fetchInterviews();
        }
      }
    }
  }, [
    selectedSection.id,
    userInterviews.length,
    notUserInterviews.length,
    isAllInterviews,
    user?.id,
    isMain,
  ]);

  useEffect(() => {
    if (user) {
      if (isMain) {
        if (inView && userInterviews.length > 0) {
          if (selectedSection.id === 1 && !isAllInterviews.user) {
            fetchInterviews();
          } else if (
            selectedSection.id === 2 &&
            notUserInterviews.length > 0 &&
            !isAllInterviews.notUser
          ) {
            fetchInterviews();
          }
        }
      }
    }
  }, [
    userInterviews.length,
    notUserInterviews.length,
    inView,
    selectedSection,
  ]);

  useEffect(() => {
    if (selectedSection?.id === 1) {
      setInterviews(userInterviews);
    }
    if (selectedSection?.id === 2) {
      setInterviews(notUserInterviews);
    }
    if (selectedSection?.id === 3) {
      setInterviews([]);
    }
  }, [userInterviews.length, notUserInterviews.length, selectedSection.id]);

  useEffect(() => {
    if (userInterviews.length > 0 || notUserInterviews.length > 0) {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === 1
            ? { ...section, title: `My Interviews (${userInterviews.length})` }
            : section.id === 2
            ? {
                ...section,
                title: `Other Interviews (${notUserInterviews.length})`,
              }
            : section
        )
      );
    }
  }, [userInterviews.length, notUserInterviews.length]);

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

  console.log(user?.feedbacks);
  console.log(interviews);

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
        {sections.map((section) =>
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
          href={`/interviews?id=${selectedSection.id}`}
        >
          View all interviews
        </Link>
      )}
      {isMain &&
        ((selectedSection?.id === 1 && !isAllInterviews.user) ||
          (selectedSection?.id === 2 && !isAllInterviews.notUser)) && (
          <div className="py-10 flex items-center justify-center">
            <Loading ref={ref} />
          </div>
        )}
    </div>
  );
});

export default Interviews;
