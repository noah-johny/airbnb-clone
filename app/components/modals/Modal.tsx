"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  title?: String;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: String;
  secondaryLabel?: String;
  isOpen?: boolean;
  disabled?: boolean;
  secondaryAction?: () => void;
  onSubmit: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  body,
  footer,
  actionLabel,
  secondaryLabel,
  isOpen,
  disabled,
  secondaryAction,
  onSubmit,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    else
      setTimeout(() => {
        onClose();
      }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    else onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    else secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      {/* BACKGROUND */}
      <div className="fixed flex inset-0 z-50 bg-neutral-800/70 justify-center items-center overflow-x-hidden overflow-y-auto scrollbar-none">
        {/* MODAL */}
        <div className="relative h-full md:h-auto lg:h-auto w-full md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 mx-auto rounded-lg shadow-lg border-none bg-white">
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            {/* CONTENT */}
            <div className="relative flex flex-col h-full md:h-auto lg:h-auto w-full">
              {/* HEADER */}
              <div className="relative flex items-center justify-center rounded-t p-6 border-b-[1px]">
                {/* Close (Button) */}
                <button className="absolute left-9 p-1 border-0 hover:opacity-70 transition">
                  <IoMdClose size={18} onClick={handleClose} />
                </button>
                {/* Title */}
                <div className="text-lg font-semibold">{title}</div>
              </div>

              {/* BODY */}
              <div className="relative flex-auto p-6">{body}</div>

              {/* FOOTER */}
              <div className="relative flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
