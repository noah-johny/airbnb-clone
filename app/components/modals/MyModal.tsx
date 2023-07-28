"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import MyButton from "../buttons/MyButton";

interface MyModalProps {
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  isOpen?: boolean;
  disabled?: boolean;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  onClose: () => void;
}

const MyModal: React.FC<MyModalProps> = ({
  title,
  body,
  footer,
  primaryActionLabel,
  secondaryActionLabel,
  isOpen,
  disabled,
  onPrimaryAction,
  onSecondaryAction,
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

  const handlePrimaryAction = useCallback(() => {
    if (disabled) return;
    else {
      onPrimaryAction();
    }
  }, [disabled, onPrimaryAction]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !onSecondaryAction) return;
    else onSecondaryAction();
  }, [disabled, onSecondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      {/* BACKGROUND */}
      <div className="fixed flex inset-0 z-50 bg-neutral-800/70 justify-center items-center overflow-x-hidden overflow-y-auto scrollbar-none">
        {/* MODAL */}
        <div className="relative h-full md:h-auto lg:h-auto w-full md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 mx-auto border-none">
          <div
            className={`translate duration-300 h-full bg-white rounded-lg shadow-lg ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            {/* CONTENT */}
            <div className="relative flex flex-col h-full md:h-auto lg:h-auto w-full">
              {/* HEADER */}
              <div className="relative flex items-center justify-center rounded-t p-6 border-b-[1px]">
                {/* CLOSE BUTTON */}
                <button className="absolute left-9 p-1 border-0 hover:opacity-70 transition">
                  <IoMdClose size={18} onClick={handleClose} />
                </button>
                {/* TITLE */}
                <div className="text-lg font-semibold">{title}</div>
              </div>

              {/* BODY */}
              <div className="relative flex-auto p-6">{body}</div>

              {/* FOOTER */}
              <div className="relative flex-auto p-6">{footer}</div>

              {/* ACTION BUTTONS */}
              <div className="relative flex flex-col gap-2 p-6 pt-3">
                <div className="flex flex-row items-center gap-4 w-full">
                  {/* SECONDARY BUTTON */}
                  {secondaryActionLabel && onSecondaryAction && (
                    <MyButton
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}

                  {/* PRIMARY BUTTON */}
                  <MyButton
                    disabled={disabled}
                    label={primaryActionLabel}
                    onClick={handlePrimaryAction}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyModal;
