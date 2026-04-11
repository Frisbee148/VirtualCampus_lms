import React, { useState } from "react";
import LibrarianLayout from "../LibrarianLayout";

const LibrarianProfile = () => {
  const [settings, setSettings] = useState({
    borrowDuration: "14",
    finePerDay: "5",
    maxBooksStudent: "5",
    maxBooksFaculty: "10",
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <LibrarianLayout>
      <div className="max-w-4xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Profile & Settings</h2>
        <p className="text-sm text-gray-400 mb-6">Manage your profile and library configuration</p>

        <div className="space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Profile Information</h3>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/Picture1.png"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">Librarian</p>
                <p className="text-sm text-gray-400">library@lnmiit.ac.in</p>
                <p className="text-xs text-gray-400 mt-0.5">Central Library, LNMIIT</p>
              </div>
            </div>
          </div>

          {/* Library Rules */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Library Rules</h3>
              <button className="px-4 py-2 text-sm font-medium bg-[#d97706] text-white rounded-lg hover:bg-[#b45309] transition-colors">
                Save Changes
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Borrow Duration (days)
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.borrowDuration}
                  onChange={(e) => updateSetting("borrowDuration", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#d97706] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Fine Per Day (Rs.)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.finePerDay}
                  onChange={(e) => updateSetting("finePerDay", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#d97706] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Max Books per Student
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.maxBooksStudent}
                  onChange={(e) => updateSetting("maxBooksStudent", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#d97706] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Max Books per Faculty
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.maxBooksFaculty}
                  onChange={(e) => updateSetting("maxBooksFaculty", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#d97706] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LibrarianLayout>
  );
};

export default LibrarianProfile;
