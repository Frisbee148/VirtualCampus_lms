import React, { useState } from "react";
import StaffTopHeader from "./components/StaffTopHeader";
import StaffSidebar from "./components/StaffSidebar";

const StaffLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="non-student-ui role-monochrome min-h-screen bg-[#f8f9fa] flex relative">
      <StaffSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 lg:ml-[240px] min-h-screen flex flex-col relative">
        <StaffTopHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 px-3 sm:px-5 md:px-8 py-4 sm:py-6 pb-24 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
