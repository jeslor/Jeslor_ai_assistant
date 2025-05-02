"use client";
import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  content: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => {
    document.body.style.overflow = "hidden";
    return set({ isOpen: true, content });
  },
  closeModal: () => {
    document.body.style.overflow = "auto";
    return set({ isOpen: false, content: null });
  },
}));

export default useModalStore;
