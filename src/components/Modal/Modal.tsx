import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { classNames } from "../../utils/classNames";
import cls from "./Modal.module.scss";
import { createPortal } from "react-dom";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = (props: ModalProps) => {
  const { children, isOpen, onClose } = props;

  const prevIsOpen = useRef<boolean>();

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div
      onAnimationEnd={() => setIsClosing(false)}
      className={classNames(cls.Modal, { [cls.closing]: isClosing })}
    >
      <div className={cls.overlay} onClick={onClose}></div>
      <div className={cls.modalBody}>{children}</div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  );
};

export default Modal;
