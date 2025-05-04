"use client";
import { create } from "zustand";
import { findUserByEmail } from "@/lib/actions/user.action";
import { toast } from "sonner";

interface UserStore {
  user: any;
  setUser: (email: string) => Promise<void>;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: async (email) => {
    const loggedInUser = await findUserByEmail(email);
    if (loggedInUser.status === 200) {
      set({ user: loggedInUser.data });
    } else {
      set({ user: null });
      toast.error("User not found");
    }
  },
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
