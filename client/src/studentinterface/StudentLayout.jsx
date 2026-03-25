import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Sidebar from './components/Sidebar';
import { X, Sparkles } from 'lucide-react';

const StudentLayout = ({ children, activeTab }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAIOpen = location.pathname.startsWith('/ai');

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex relative">
      <Sidebar activeTab={activeTab} />
      <div className="flex-1 ml-[260px] min-h-screen flex flex-col relative">
        <TopHeader />
        <main className="flex-1 px-8 py-6 pb-24 relative">
          {children}
        </main>
      </div>

      {/* Floating AI Button */}
      <button 
        onClick={() => isAIOpen ? navigate('/') : navigate('/ai')}
        className={`fixed bottom-8 right-8 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-2xl z-50 transition-all duration-300 overflow-hidden ${
          isAIOpen 
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30' 
            : 'bg-white hover:scale-105 shadow-purple-900/30 ring-4 ring-white'
        }`}
      >
        {isAIOpen ? <X size={32} strokeWidth={2.5} /> : <img src="/Picture1.png" alt="AI Mentor Logo" className="w-full h-full object-cover" />}
      </button>
    </div>
  );
};

export default StudentLayout;
