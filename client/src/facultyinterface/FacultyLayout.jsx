import React, { useState } from "react";
import FacultyTopHeader from "./components/FacultyTopHeader";
import FacultySidebar from "./components/FacultySidebar";

const FacultyLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex relative">
      <FacultySidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 lg:ml-[240px] min-h-screen flex flex-col relative">
        <FacultyTopHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 px-3 sm:px-5 md:px-8 py-4 sm:py-6 pb-24 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
