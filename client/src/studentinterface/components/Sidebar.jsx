import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  CalendarDays,
  Download,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";

const Sidebar = ({ mobileOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems1 = [
    {
      id: "Performance Review",
      icon: LayoutDashboard,
      label: "Performance Review",
      path: "/dashboard",
    },
    { id: "Calendar", icon: Calendar, label: "Calendar", path: "/calendar" },
    { id: "Grades", icon: FileText, label: "Grades", path: "/grades" },
    {
      id: "Timetable",
      icon: CalendarDays,
      label: "Timetable",
      path: "/timetable",
    },
    { id: "Downloads", icon: Download, label: "Downloads", path: "/downloads" },
  ];

  const menuItems2 = [
    { id: "Feedback", label: "Feedback", path: "/feedback" },
    { id: "Community", label: "Community", path: "/community" },
    { id: "Fee status", label: "Fee Status", path: "/fee-status" },
  ];

  const studentSectionItems = [
    { id: "BTP", label: "BTP", path: "/btp" },
    { id: "Mini Project", label: "Mini Project", path: "/mini-project" },
    {
      id: "Extra Curriculum",
      label: "Extra Curriculum",
      path: "/extra-curriculum",
    },
    {
      id: "Student History",
      label: "Student History",
      path: "/student-history",
    },
    { id: "Fee Receipt", label: "Fee Receipt", path: "/fee-receipt" },
    {
      id: "Attendance Date Wise",
      label: "Attendance Date Wise",
      path: "/attendance-date-wise",
    },
    { id: "Admit Card", label: "Admit Card", path: "/admit-card" },
    {
      id: "Disciplinary Action",
      label: "Disciplinary Action",
      path: "/disciplinary-action",
    },
  ];

  const grievanceItems = [
    { id: "Drop Course", label: "Drop Course", path: "/drop-course" },
    {
      id: "Bank Details Submission",
      label: "Bank Details Submission",
      path: "/bank-details-submission",
    },
    {
      id: "Student Charges",
      label: "Student Charges",
      path: "/student-charges",
    },
    {
      id: "Course Replacement",
      label: "Course Replacement",
      path: "/course-replacement",
    },
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
        className={`fixed left-0 top-0 bottom-0 w-[240px] bg-[#0f1117] text-white flex flex-col z-[60] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
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
          onClick={() => handleNavClick("/profile")}
        >
          <img
            src="/Picture1.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="overflow-hidden flex-1">
            <h3 className="font-semibold text-sm text-white/90 truncate group-hover:text-white">
              Kanye East
            </h3>
            <p className="text-[11px] text-white/40 truncate">
              k.east@student.io
            </p>
          </div>
          <ChevronRight
            size={14}
            className="text-white/20 group-hover:text-white/50 transition-colors"
          />
        </div>

        {/* Divider */}
        <div className="mx-5 mb-3 border-t border-white/[0.06]"></div>

        {/* Nav List 1 */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 px-3 mb-2">
            Main Menu
          </p>
          {menuItems1.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
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
              Other
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

          <div className="pt-5 pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 px-3 mb-2">
              Student Section
            </p>
            {studentSectionItems.map((item) => (
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

          <div className="pt-5 pb-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 px-3 mb-2">
              Grievance Redressal
            </p>
            {grievanceItems.map((item) => (
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

export default Sidebar;
