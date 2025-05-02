"use client";

import useModalStore from "../provider/modalStore";
import Modal from "./Modal";

const ModalWrapper = () => {
  const { isOpen, content, closeModal } = useModalStore();
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {content}
    </Modal>
  );
};

export default ModalWrapper;
