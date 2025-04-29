"use client";
import React, { useEffect, useState } from "react";
import AiButton from "../AiButton";
import useUserStore from "../provider/userStore";
import { getInterViews } from "@/lib/actions/interviews";
import Image from "next/image";
import { refactorCompany } from "@/lib/helpers/general";
import { toast } from "sonner";
import InterviewSkeleton from "../skeletons/InterviewSkeleton";
import Link from "next/link";
import InterviewCard from "./InterviewCard";

const Interviews = ({ isMain }: { isMain?: boolean }) => {
  const { user } = useUserStore();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stickyInterviewMenu, setStickyInterviewMenu] = useState(false);
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
      const interviews = await getInterViews(user?.id);
      if (interviews.status === 200) {
        if (interviews.data) {
          setInterviews(interviews.data);
        }
      } else {
        throw new Error(interviews.message);
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(310px,_1fr))] gap-4 mt-4 w-full repeated-grids px-4 max-w-[1500px]">
            {isLoading ? (
              <InterviewSkeleton totalCards={4} />
            ) : interviews.length > 0 ? (
              interviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))
            ) : (
              <p className="text-gray-400">No interviews found</p>
            )}
          </div>
        </div>
      </div>
      {!isMain && (
        <Link
          className="py-10 ml-[50%] -translate-x-[50%] inline-block text-center  font-semibold hover:text-primary1"
          href="/interviews"
        >
          View all interviews
        </Link>
      )}
    </div>
  );
};

export default Interviews;
