import React from "react";
import { useNavigate } from "react-router-dom";

const AdminTopHeader = ({ onMenuToggle }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-gray-100">
      <button
        onClick={onMenuToggle}
        className="lg:hidden px-2 py-1 text-sm text-gray-500 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
      >
        Menu
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => navigate("/admin/notifications")}
          className="px-2 py-1 text-xs sm:text-sm text-gray-500 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
        >
          Notifications
        </button>

        <button
          onClick={() => navigate("/admin/profile")}
          className="px-2 py-1 text-xs sm:text-sm text-gray-500 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
        >
          Profile
        </button>
      </div>
    </header>
  );
};

export default AdminTopHeader;
