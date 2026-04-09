import React, { useState } from "react";
import DirectorTopHeader from "./components/DirectorTopHeader";
import DirectorSidebar from "./components/DirectorSidebar";

const DirectorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="non-student-ui role-monochrome min-h-screen bg-[#f8f9fa] flex relative">
      <DirectorSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 lg:ml-[260px] min-h-screen flex flex-col relative">
        <DirectorTopHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 px-3 sm:px-5 md:px-8 py-4 sm:py-6 pb-24 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DirectorLayout;
