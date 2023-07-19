"use client";

import { IconType } from "react-icons";

interface MyButtonProps {
  label: String;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
}
const MyButton: React.FC<MyButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
}) => {
  return (
    <button
      className={`relative rounded-lg w-full transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed ${
        small
          ? "py-1 text-sm font-normal border-[1px]"
          : "py-3 text-md font-semibold border-[2px]"
      } ${
        outline
          ? "bg-white text-black border-black"
          : "bg-rose-500 text-white border-rose-500"
      }`}
    >
      {LeftIcon && <LeftIcon size={24} className="absolute left-4 top-3" />}
      {label}
      {RightIcon && <RightIcon size={24} className="absolute right-4 top-3" />}
    </button>
  );
};

export default MyButton;
