import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu } from "lucide-react";

const TopHeader = ({ onMenuToggle }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-gray-100">
      {/* Hamburger - mobile only */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 text-gray-500 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
      >
        <Menu size={22} strokeWidth={1.8} />
      </button>

      {/* Spacer on desktop where hamburger would be */}
      <div className="hidden lg:block" />

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => navigate("/notifications")}
          className="relative p-2 sm:p-2.5 text-gray-400 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
        >
          <Bell
            size={20}
            strokeWidth={1.8}
            className="sm:w-[22px] sm:h-[22px]"
          />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#f8f9fa]"></span>
        </button>
        <img
          src="/LNMIIT-Logo-Transperant-Background.png"
          alt="LNMIIT-Logo-Transparent-Background"
          className="h-7 sm:h-8 w-auto object-contain"
        />
      </div>
    </header>
  );
};

export default TopHeader;
