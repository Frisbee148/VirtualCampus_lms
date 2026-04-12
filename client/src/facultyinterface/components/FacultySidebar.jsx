import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BookOpen,
  AlertTriangle,
  BarChart3,
  Calendar,
  CalendarDays,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";

const FacultySidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "my-courses",
      icon: BookOpen,
      label: "My Courses",
      path: "/faculty/my-courses",
    },
    {
      id: "at-risk",
      icon: AlertTriangle,
      label: "At Risk Students",
      path: "/faculty/at-risk",
    },
    {
      id: "batch-insights",
      icon: BarChart3,
      label: "Batch Insights",
      path: "/faculty/batch-insights",
    },
    {
      id: "cif-completion",
      label: "CIF Completion",
      path: "/faculty/cif-completion",
    },
    {
      id: "btp-projects",
      label: "BTP Projects",
      path: "/faculty/btp",
    },
    {
      id: "calendar",
      icon: Calendar,
      label: "Calendar",
      path: "/faculty/calendar",
    },
    {
      id: "timetable",
      icon: CalendarDays,
      label: "Timetable",
      path: "/faculty/timetable",
    },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-[260px] bg-[#0f1117] text-white flex flex-col z-[60] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-1 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Profile Section */}
        <div
          className="flex items-center gap-3 mx-4 mt-5 mb-6 p-3 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200 group"
          onClick={() => handleNavClick("/faculty/profile")}
        >
          <img
            src="/Picture1.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="overflow-hidden flex-1">
            <h3 className="font-semibold text-sm text-white/90 truncate group-hover:text-white">
              Faculty Name
            </h3>
            <p className="text-[11px] text-white/40 truncate">
              faculty@lnmiit.ac.in
            </p>
          </div>
          <ChevronRight
            size={14}
            className="text-white/20 group-hover:text-white/50 transition-colors"
          />
        </div>

        <div className="mx-5 mb-3 border-t border-white/[0.06]"></div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 px-3 mb-2">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium no-underline transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white shadow-md shadow-black/20"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                  }`
                }
              >
                {Icon ? <Icon size={17} strokeWidth={1.8} /> : null}
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-0.5 border-t border-white/[0.06]">
          <button
            onClick={() => {
              localStorage.removeItem("rememberedUsername");
              sessionStorage.clear();
              navigate("/", { replace: true });
              if (onClose) onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-white/40 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200"
          >
            <LogOut size={16} strokeWidth={1.8} /> Log out
          </button>
        </div>
      </aside>
    </>
  );
};

export default FacultySidebar;
