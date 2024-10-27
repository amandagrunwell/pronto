import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal?: () => void;
  clickOutside?: boolean;
}

function Modal({
  children,
  closeModal,
  isOpen,
  clickOutside,
}: ModalProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!clickOutside) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        closeModal?.();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  const handleClose = () => {
    closeModal?.();
  };

  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 p-10 transition-opacity duration-1000 
      `}
    >
      <div ref={ref} className="">
        {children}
      </div>
    </div>
  );
}

export default Modal;
