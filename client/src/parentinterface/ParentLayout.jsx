import React, { useState } from 'react';
import ParentTopHeader from './components/ParentTopHeader';
import ParentSidebar from './components/ParentSidebar';

const ParentLayout = ({ children, activeTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex relative">
      <ParentSidebar activeTab={activeTab} mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-[260px] min-h-screen flex flex-col relative">
        <ParentTopHeader onMenuToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 px-3 sm:px-5 md:px-8 py-4 sm:py-6 pb-24 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
