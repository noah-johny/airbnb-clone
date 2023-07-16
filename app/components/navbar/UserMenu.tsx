"use client";

import { useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-2">
        {/* 'Airbnb your home' (Button) */}
        <div className="hidden md:flex px-4 py-4 rounded-full text-sm font-semibold hover:bg-neutral-100 cursor-pointer transition">
          Airbnb your home
        </div>

        {/* USER MENU */}
        <div
          onClick={toggleOpen}
          className="flex flex-row gap-3 p-2 items-center border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:flex">
            <Avatar />
          </div>
        </div>
      </div>

      {/* USER MENU (Dropdown) */}
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"></div>
      )}
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 text-sm">
          <div className="flex flex-col">
            <MenuItem onClick={() => {}} label={"Login"} />
            <MenuItem onClick={() => {}} label={"Sign Up"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
