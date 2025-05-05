"use client";
import { create } from "zustand";
import useUserStore from "./userStore";
import {
  getInterviewsByUser,
  getInterviewsNotByUser,
} from "@/lib/actions/interview.actions";
import { toast } from "sonner";

interface InterviewStore {
  currentPage: {
    userPage: number;
    notUserPage: number;
  };
  isInView: boolean;
  setIsInview: (isInView: boolean) => void;
  isAllInterviews: {
    isAllUser: boolean;
    isAllNotUser: boolean;
  };
  isMainPage: boolean;
  isLoading: boolean;
  interviews: any;
  userInterviews: any;
  isMainInterviews: boolean;
  setIsMain: (isMain: boolean) => void;
  setUserInterviews: () => void;
  notUserInterviews: any;
  setNotUserInterviews: () => void;
  setInterviews: (section: any) => void;
}

const useInterviewStore = create<InterviewStore>((set, get) => ({
  currentPage: {
    userPage: 0,
    notUserPage: 0,
  },
  isMainPage: false,
  isLoading: true,
  isInView: false,
  setIsInview: (inView: boolean) => {
    set({ isInView: inView });
  },
  isAllInterviews: {
    isAllUser: false,
    isAllNotUser: false,
  },
  interviews: [],
  userInterviews: [],
  notUserInterviews: [],
  isMainInterviews: false,
  setIsMain: (isMain: boolean) => {
    set({ isMainInterviews: isMain });
  },
  setUserInterviews: async () => {
    try {
      const { currentPage, userInterviews, isInView, isAllInterviews } = get();
      const user = useUserStore.getState().user;
      console.log("is in view", isInView);

      if (
        (userInterviews.length < 4 && !isAllInterviews.isAllUser) ||
        (userInterviews.length > 4 && isInView)
      ) {
        const response: any = await getInterviewsByUser(
          user.id,
          currentPage.userPage
        );
        if (response.status === 200) {
          if (response.data.length === 0) {
            set({
              isAllInterviews: { ...get().isAllInterviews, isAllUser: true },
            });
          } else {
            set({
              userInterviews: [...userInterviews, ...response.data],
            });
            set({
              currentPage: {
                ...currentPage,
                userPage: currentPage.userPage + 1,
              },
            });
          }
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      console.error("Error fetching user interviews:", error);
      toast.error("Error fetching user interviews");
    }
  },
  setNotUserInterviews: async () => {
    try {
      const user = useUserStore.getState().user;
      const { currentPage, notUserInterviews, isInView, isAllInterviews } =
        get();
      console.log("is in view", isInView);
      console.log("not user interviews", currentPage.notUserPage);
      console.log(
        notUserInterviews.length < 4 && !isAllInterviews.isAllNotUser,
        notUserInterviews.length > 4 && isInView
      );

      if (
        (notUserInterviews.length < 4 && !isAllInterviews.isAllNotUser) ||
        isInView
      ) {
        console.log("fetching not user interviews");

        const response: any = await getInterviewsNotByUser(
          user.id,
          currentPage.notUserPage
        );
        if (response.status === 200) {
          if (response.data.length === 0) {
            set({
              isAllInterviews: { ...get().isAllInterviews, isAllNotUser: true },
            });
          } else {
            set({
              notUserInterviews: [...notUserInterviews, ...response.data],
            });
            set({
              currentPage: {
                ...currentPage,
                notUserPage: currentPage.notUserPage + 1,
              },
            });
          }
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      console.error("Error fetching not user interviews:", error);
      toast.error("Error fetching not user interviews");
    }
  },

  setInterviews: async (section: any) => {
    const user = useUserStore.getState().user;
    if (user) {
      if (section.id === 1) {
        set({ interviews: [] });
        set({ isLoading: true });
        await get().setUserInterviews();
        const { userInterviews } = get();
        set({ interviews: userInterviews });
        set({ isLoading: false });
      }
      if (section.id === 2) {
        set({ interviews: [] });
        set({ isLoading: true });
        await get().setNotUserInterviews();
        const { notUserInterviews } = get();
        set({ interviews: notUserInterviews });
        set({ isLoading: false });
      }
    }
  },
}));

export default useInterviewStore;
