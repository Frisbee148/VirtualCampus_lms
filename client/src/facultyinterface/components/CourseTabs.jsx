import React from 'react';

const tabs = ['overview', 'marks', 'attendance', 'assignments'];

const CourseTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-5 sm:px-8 py-2.5 text-sm font-medium capitalize transition-all duration-200 ${
            activeTab === tab
              ? 'bg-[#4E545C] text-white border-2 border-[#e8a435] shadow-md'
              : 'bg-[#4E545C] text-white border-2 border-transparent hover:border-[#e8a435]/50'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default CourseTabs;
