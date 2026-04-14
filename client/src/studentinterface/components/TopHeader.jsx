import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Menu, ChevronDown } from "lucide-react";
import { useSession } from "../../context/SessionContext";

const TopHeader = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { SESSION_OPTIONS, selectedSessionId, setSelectedSessionId, selectedSession } = useSession();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Only show session picker on student routes (not faculty, admin, etc.)
  const isStudentRoute = !location.pathname.startsWith("/faculty") &&
    !location.pathname.startsWith("/parent") &&
    !location.pathname.startsWith("/director") &&
    !location.pathname.startsWith("/registrar") &&
    !location.pathname.startsWith("/admin") &&
    !location.pathname.startsWith("/librarian") &&
    !location.pathname.startsWith("/library-operator") &&
    !location.pathname.startsWith("/ao") &&
    !location.pathname.startsWith("/staff") &&
    !location.pathname.startsWith("/hod") &&
    location.pathname !== "/";

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Global Session Selector */}
        {isStudentRoute && (
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#4E545C] text-white text-[11px] sm:text-xs font-semibold shadow-sm hover:bg-[#62686f] transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">{selectedSession.label}</span>
              <span className="sm:hidden">
                {selectedSession.label.replace("Session ", "")}
              </span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl z-30 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 border-b border-gray-100">
                  Academic Session
                </p>
                <div className="py-1">
                  {SESSION_OPTIONS.map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => {
                        setSelectedSessionId(session.id);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 cursor-pointer ${
                        selectedSessionId === session.id
                          ? "bg-gray-50 font-semibold text-black"
                          : "text-gray-600"
                      }`}
                    >
                      {session.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

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
