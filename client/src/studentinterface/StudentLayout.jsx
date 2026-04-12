import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopHeader from "./components/TopHeader";
import Sidebar from "./components/Sidebar";
import { X, Sparkles } from "lucide-react";

const StudentLayout = ({ children, activeTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAIOpen = location.pathname.startsWith("/ai");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex relative">
      <Sidebar
        activeTab={activeTab}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 lg:ml-[240px] min-h-screen flex flex-col relative">
        <TopHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 px-3 sm:px-5 md:px-8 py-4 sm:py-6 pb-24 relative">
          {children}
        </main>
      </div>

      {/* Floating AI Button */}
      <button
        onClick={() => (isAIOpen ? navigate("/dashboard") : navigate("/ai"))}
        className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center shadow-2xl z-50 transition-all duration-300 overflow-hidden ${
          isAIOpen
            ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30"
            : "bg-white hover:scale-105 shadow-purple-900/30 ring-4 ring-white"
        }`}
      >
        {isAIOpen ? (
          <X size={28} strokeWidth={2.5} className="sm:w-8 sm:h-8" />
        ) : (
          <img
            src="/ai-logo.avif"
            alt="AI Mentor Logo"
            className="w-full h-full object-cover"
          />
        )}
      </button>
    </div>
  );
};

export default StudentLayout;
