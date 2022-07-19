import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("my-modals") as HTMLElement;

interface IModal {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ children, onClose }) => {
  const hendleCloseModal = (e: { preventDefault: () => void; key: string }) => {
    e.preventDefault();

    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hendleCloseModal);

    return () => {
      document.removeEventListener("keydown", hendleCloseModal);
    };
  });

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} p-10`}>
        <button className={styles.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
