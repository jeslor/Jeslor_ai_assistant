"use client";
import {
  getInterviewsByUser,
  getInterviewsNotByUser,
} from "@/lib/actions/interview.actions";
import { create } from "zustand";
import useUserStore from "./userStore";
import { toast } from "sonner";

interface InterviewStore {
  userInterviews: any[];
  otherInterviews: any[];
  fetchUserInterviews: () => Promise<void>;
  fetchNotUserInterviews: () => Promise<void>;
  pages: {
    user: number;
    other: number;
  };
}

const useInterviewStore = create<InterviewStore>((set, get) => ({
  userInterviews: [],
  otherInterviews: [],
  pages: {
    user: 0,
    other: 0,
  },

  fetchUserInterviews: async () => {
    try {
      const userInterviews = get().userInterviews;
      if (!userInterviews.length) {
        const user = useUserStore.getState().user;
        const currentPage = get().pages.user;
        const interviews: any = await getInterviewsByUser(user.id, currentPage);
        set({ userInterviews: interviews.data });
      }
    } catch (error) {
      toast.error("Error fetching user interviews. Please try again later.");
      console.log("Error fetching user interviews:", error);
    }
  },
  fetchNotUserInterviews: async () => {
    try {
      const otherInterviews = get().otherInterviews;
      if (!otherInterviews.length) {
        const user = useUserStore.getState().user;
        const currentPage = get().pages.other;
        const interviews: any = await getInterviewsNotByUser(
          user.id,
          currentPage
        );
        set({ otherInterviews: interviews.data });
      }
    } catch (error) {
      toast.error("Error fetching interviews. Please try again later.");
      console.log("Error fetching interviews:", error);
    }
  },
}));

export default useInterviewStore;
