import { create } from "zustand";
import useUserStore from "./userStore";
import {
  getInterviewsByUser,
  getInterviewsNotByUser,
} from "@/lib/actions/interview.actions";
import { toast } from "sonner";

interface InterviewStore {
  userInterviews: any[] | null;
  notUserInterviews: any[] | null;
  setUserInterview: () => void;
  setNotUserInterview: () => void;
  clearInterview: () => void;
}
const useInterviewStore = create<InterviewStore>((set, get) => ({
  userInterviews: [],
  notUserInterviews: [],

  setUserInterview: async () => {
    try {
      const user = useUserStore.getState().user;
      if (!user) {
        return;
      }
      const response: any = await getInterviewsByUser(user.id, 0);
      if (response.status === 200) {
        if (response.data.length > 0) {
          set({ userInterviews: response.data });
        } else {
          toast.error("No interviews found");
          set({ userInterviews: [] });
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
      const response = await getInterviewsNotByUser(user.id, 0);
      if (response.status === 200) {
        set({ notUserInterviews: response.data });
      } else {
        set({ notUserInterviews: [] });
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
      set({ notUserInterviews: [] });
    }
  },
  clearInterview: () => set({ notUserInterviews: null, userInterviews: null }),
}));
export default useInterviewStore;
