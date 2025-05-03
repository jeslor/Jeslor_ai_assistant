"use client";
import { deleteInterview } from "@/lib/actions/interview.actions";
import { create } from "zustand";

interface InterViewStore {
  interviews: any[];
  setInterviews: (interviews: any[]) => void;
  createInterview: (interview: any) => void;
  deleteInterview: (id: string) => void;
  userInterviews: any[];
  notUserInterviews: any[];
  setUserInterviews: (interviews: any[]) => void;
  setNotUserInterviews: (interviews: any[]) => void;
}

const useInterViewStore = create<InterViewStore>((set) => ({
  interviews: [],
  setInterviews: (interviews) => set({ interviews }),
  createInterview: (interview) =>
    set((state) => ({ interviews: [...state.interviews, interview] })),
  deleteInterview: async (id) => {
    const response = await deleteInterview(id);
    if (response.status === 200) {
      set((state) => ({
        interviews: state.interviews.filter(
          (interview) => interview._id !== id
        ),
      }));
    }
  },
  userInterviews: [],
  notUserInterviews: [],
  setUserInterviews: (interviews) => set({ userInterviews: interviews }),
  setNotUserInterviews: (interviews) => set({ notUserInterviews: interviews }),
}));
