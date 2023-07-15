"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";

function UserMenu() {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-2">
        {/* 'Airbnb your home' button */}
        <div className="hidden md:flex px-4 py-4 rounded-full text-sm font-semibold hover:bg-neutral-100 cursor-pointer transition">
          Airbnb your home
        </div>

        {/* User Menu */}
        <div className="flex flex-row gap-3 p-2 items-center border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:flex">
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
