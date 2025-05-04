"use client";
import { create } from "zustand";
import useUserStore from "./userStore";
import {
  getInterviewsByUser,
  getInterviewsNotByUser,
} from "@/lib/actions/interview.actions";
import { toast } from "sonner";
import page from "@/app/(root)/page";

interface InterviewStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  interviews: any;
  userInterviews: any;
  isMainInterviews: boolean;
  setIsMain: (isMain: boolean) => void;
  setUserInterviews: (userInterviews: any) => void;
  notUserInterviews: any;
  setNotUserInterviews: (notUserInterviews: any) => void;
  setInterviews: (interview: any) => void;
}

const useInterviewStore = create<InterviewStore>((set, get) => ({
  currentPage: 0,
  interviews: [],
  userInterviews: [],
  notUserInterviews: [],
  isMainInterviews: false,
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },
  setIsMain: (isMain: boolean) => {
    set({ isMainInterviews: isMain });
  },
  setUserInterviews: async () => {
    const user = useUserStore.getState().user;
    const currentPage = get().currentPage;
    const response = await getInterviewsByUser(user.id, currentPage);
    if (response.status === 200) {
      set({ userInterviews: response.data });
    } else {
      toast.error("Error fetching user interviews");
    }
  },
  setNotUserInterviews: async () => {
    const user = useUserStore.getState().user;
    const currentPage = get().currentPage;
    const response = await getInterviewsNotByUser(user.id, currentPage);
    console.log("response", response);

    if (response.status === 200) {
      set({ notUserInterviews: response.data });
    } else {
      toast.error("Error fetching not user interviews");
    }
  },
  setInterviews: (section: any) => {
    const userInterviews = get().userInterviews;
    const notUserInterviews = get().notUserInterviews;
    const setUserInterviews = get().setUserInterviews;
    const setNotUserInterviews = get().setNotUserInterviews;
    const currentPage = get().currentPage;
    if (section.id === 1) {
      setUserInterviews(currentPage);
      set({ interviews: { ...userInterviews } });
    } else if (section.id === 2) {
      setNotUserInterviews(currentPage);
      set({ interviews: { ...notUserInterviews } });
    } else {
      set({ interviews: null });
    }
  },
}));

export default useInterviewStore;
