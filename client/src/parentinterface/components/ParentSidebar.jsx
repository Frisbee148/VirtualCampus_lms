import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  CalendarDays,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";

const ParentSidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems1 = [
    {
      id: "Dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/parent/dashboard",
    },
    {
      id: "Performance",
      icon: FileText,
      label: "Performance",
      path: "/parent/performance",
    },
    { id: "Grades", icon: FileText, label: "Grades", path: "/parent/grades" },
    {
      id: "Attendance",
      icon: Calendar,
      label: "Attendance",
      path: "/parent/attendance",
    },
    {
      id: "Timetable",
      icon: CalendarDays,
      label: "Timetable",
      path: "/parent/timetable",
    },
  ];

  const menuItems2 = [
    { id: "Fee Status", label: "Fee Status", path: "/parent/fee-status" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
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
        {/* Close button - mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-1 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Profile Section */}
        <div
          className="flex items-center gap-3 mx-4 mt-5 mb-6 p-3 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200 group"
          onClick={() => handleNavClick("/parent/profile")}
        >
          <img
            src="/Picture1.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="overflow-hidden flex-1">
            <h3 className="font-semibold text-sm text-white/90 truncate group-hover:text-white">
              Parent User
            </h3>
            <p className="text-[11px] text-white/40 truncate">
              parent@guardian.io
            </p>
          </div>
          <ChevronRight
            size={14}
            className="text-white/20 group-hover:text-white/50 transition-colors"
          />
        </div>

        {/* Role badge */}
        <div className="mx-5 mb-3">
          <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-400 rounded-sm">
            Guardian / Parent
          </span>
        </div>

        {/* Divider */}
        <div className="mx-5 mb-3 border-t border-white/[0.06]"></div>

        {/* Nav List 1 */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 px-3 mb-2">
            Ward's Academics
          </p>
          {menuItems1.map((item) => {
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
                <Icon size={17} strokeWidth={1.8} />
                {item.label}
              </NavLink>
            );
          })}

          <div className="pt-5 pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 px-3 mb-2">
              Financial
            </p>
            {menuItems2.map((item) => (
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
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer Nav */}
        <div className="p-3 space-y-0.5 border-t border-white/[0.06]">
          <NavLink
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-white/40 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200 no-underline"
          >
            <LogOut size={16} strokeWidth={1.8} /> Log out
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default ParentSidebar;
