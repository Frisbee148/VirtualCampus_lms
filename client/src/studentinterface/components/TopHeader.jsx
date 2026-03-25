import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, UserCircle } from 'lucide-react';

const TopHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-end px-8 py-4 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/notifications')}
          className="relative p-2.5 text-gray-400 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
        >
          <Bell size={22} strokeWidth={1.8} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 ring-2 ring-[#f8f9fa]"></span>
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 text-gray-400 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
        >
          <UserCircle size={26} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
