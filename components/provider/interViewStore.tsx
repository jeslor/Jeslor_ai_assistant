import { create } from "zustand";
import useUserStore from "./userStore";
import {
  getInterviewsByUser,
  getInterviewsNotByUser,
} from "@/lib/actions/interview.actions";
import { toast } from "sonner";

interface InterviewStore {
  userInterviews: any[];
  notUserInterviews: any[];
  isAllInterviews: {
    user: boolean;
    notUser: boolean;
  };
  pages: {
    user: number;
    notUser: number;
  };
  setUserInterview: () => void;
  setNotUserInterview: () => void;
  setUpdatedInterviews: (interview: any, sectionId: number) => void;
  clearInterview: () => void;
}
const useInterviewStore = create<InterviewStore>((set, get) => ({
  userInterviews: [],
  notUserInterviews: [],
  isAllInterviews: {
    user: false,
    notUser: false,
  },
  pages: {
    user: 0,
    notUser: 0,
  },

  setUserInterview: async () => {
    try {
      const user = useUserStore.getState().user;
      if (!user) {
        return;
      }
      const { pages } = get();
      const response: any = await getInterviewsByUser(user.id, pages.user);
      if (response.status === 200) {
        const { userInterviews } = get();
        if (response.data.length > 0) {
          set({
            userInterviews: [...userInterviews, ...response.data],
            pages: { ...pages, user: pages.user + 1 },
          });
        } else {
          toast.error("No interviews found");
          set({
            userInterviews,
            isAllInterviews: { ...get().isAllInterviews, user: true },
          });
        }
      } else {
        set({ userInterviews: [] });
      }
    } catch (error: any) {
      console.error("Error fetching interviews:", error);
      toast.error(error.message);
      set({ userInterviews: [] });
    }
  },

  setNotUserInterview: async () => {
    try {
      const user = useUserStore.getState().user;
      if (!user) {
        return;
      }
      const { pages } = get();
      const response: any = await getInterviewsNotByUser(
        user.id,
        pages.notUser
      );
      if (response.status === 200) {
        const { notUserInterviews } = get();
        if (response.data.length > 0) {
          set({
            notUserInterviews: [...notUserInterviews, ...response.data],
            pages: { ...pages, notUser: pages.notUser + 1 },
          });
        } else {
          const { isAllInterviews } = get();
          toast.error("No interviews found");
          set({
            notUserInterviews,
            isAllInterviews: { ...isAllInterviews, notUser: true },
          });
        }
      } else {
        set({ notUserInterviews: [] });
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
      set({ notUserInterviews: [] });
    }
  },
  setUpdatedInterviews: (interview, sectionId) => {
    const { userInterviews, notUserInterviews } = get();
    console.log("reached the interview store");

    if (sectionId === 1) {
      set({
        userInterviews: userInterviews.filter(
          (item) => item.id !== interview[0].id
        ),
      });
    } else {
      set({
        notUserInterviews: notUserInterviews.filter(
          (item) => item.id !== interview[0].id
        ),
      });
    }
  },
  clearInterview: () => set({ notUserInterviews: [], userInterviews: [] }),
}));
export default useInterviewStore;
