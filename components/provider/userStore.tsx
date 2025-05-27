"use client";
import { create } from "zustand";
import { findUserByEmail } from "@/lib/actions/user.action";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import prisma from "@/lib/prisma/prisma";

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
      const { data: session } = useSession();
      set({ user: null });
      toast.error("User not found");
    }
  },
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
