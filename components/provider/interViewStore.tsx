"use client";
import {
  getInterviewsByUser,
  getInterviewsNotByUser,
} from "@/lib/actions/interview.actions";
import { create } from "zustand";
import useUserStore from "./userStore";
import { toast } from "sonner";

interface InterviewStore {
  interviews: any;
  setInterviews: (interview: any) => void;
  fetchUserInterviews: () => Promise<void>;
  fetchNotUserInterviews: () => Promise<void>;
  pages: {
    user: number;
    other: number;
  };
}

const useInterviewStore = create<InterviewStore>((set, get) => ({
  interviews: null,
  pages: {
    user: 0,
    other: 0,
  },
  setInterviews: (interviews) => set({ interviews }),
  fetchUserInterviews: async () => {
    try {
      const user = useUserStore.getState().user;
      const currentPage = get().pages.user;
      const interviews = await getInterviewsByUser(user.id, currentPage);
      set({ interviews: interviews.data });
    } catch (error) {
      toast.error("Error fetching user interviews. Please try again later.");
      console.log("Error fetching user interviews:", error);
    }
  },
  fetchNotUserInterviews: async () => {
    try {
      const user = useUserStore.getState().user;
      const currentPage = get().pages.other;
      const interviews = await getInterviewsNotByUser(user.id, currentPage);
      set({ interviews: interviews.data });
    } catch (error) {
      toast.error("Error fetching interviews. Please try again later.");
      console.log("Error fetching interviews:", error);
    }
  },
}));

export default useInterviewStore;
