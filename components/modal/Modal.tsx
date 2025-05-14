"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useModalStore from "../provider/modalStore";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);
  const { closeModal } = useModalStore();

  useEffect(() => setMounted(true), []);
  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      onClick={() => closeModal()}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-primary1/40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-300 rounded-xl p-6 max-w-md w-full relative"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
