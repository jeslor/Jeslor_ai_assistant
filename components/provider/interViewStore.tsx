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
  fetchMoreUserInterviews: () => Promise<void>;
  fetchMoreNotUserInterviews: () => Promise<void>;
  isAllInterviews: {
    user: boolean;
    other: boolean;
  };
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
  isAllInterviews: {
    user: false,
    other: false,
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
    }
  },
  fetchMoreUserInterviews: async () => {
    try {
      const user = useUserStore.getState().user;
      const currentPage = get().pages.user + 1;
      const interviews: any = await getInterviewsByUser(user.id, currentPage);
      if (interviews.data.length) {
        set((state) => ({
          userInterviews: [
            ...new Set([...state.userInterviews, ...interviews.data]),
          ],
          pages: { ...state.pages, user: currentPage },
        }));
      } else {
        set((state) => ({
          isAllInterviews: { ...state.isAllInterviews, user: true },
        }));
      }
    } catch (error) {
      toast.error(
        "Error fetching more user interviews. Please try again later."
      );
    }
  },
  fetchMoreNotUserInterviews: async () => {
    try {
      const user = useUserStore.getState().user;
      const currentPage = get().pages.other + 1;
      const interviews: any = await getInterviewsNotByUser(
        user.id,
        currentPage
      );
      if (interviews.data.length) {
        set((state) => ({
          otherInterviews: [
            ...new Set([...state.otherInterviews, ...interviews.data]),
          ],
          pages: { ...state.pages, other: currentPage },
        }));
      } else {
        set((state) => ({
          isAllInterviews: { ...state.isAllInterviews, other: true },
        }));
      }
    } catch (error) {
      toast.error("Error fetching more interviews. Please try again later.");
    }
  },
}));

export default useInterviewStore;
