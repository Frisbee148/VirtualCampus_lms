import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LibrarianLayout from "../LibrarianLayout";
import { ArrowLeft } from 'lucide-react';

const initialProfile = {
  name: "Librarian",
  email: "library@lnmiit.ac.in",
  phone: "+91 98765 11111",
  department: "Central Library",
  designation: "Librarian",
  location: "Main Library Block",
  joined: "June 2020",
};

const initialSettings = {
  borrowDuration: "14",
  finePerDay: "5",
  maxBooksStudent: "5",
  maxBooksFaculty: "10",
};

const profileFields = [
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Department", key: "department" },
  { label: "Designation", key: "designation" },
  { label: "Location", key: "location" },
  { label: "Joined", key: "joined" },
];

const LibrarianProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const startEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft({ ...profile });
    setEditing(false);
  };

  const saveEdit = () => {
    setProfile({ ...draft });
    setEditing(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("rememberedUsername");
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <LibrarianLayout>
      <div className="max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-gray-600 mb-4 sm:mb-6 cursor-pointer transition-colors"
        >
  <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
</button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 sm:mb-8">
          Profile
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div className="w-full sm:w-56 flex-shrink-0 space-y-3 sm:space-y-4">
            <div className="bg-white border border-gray-200 p-4 sm:p-6 text-center">
              <img
                src="/Picture1.png"
                alt="Profile"
                className="profile-avatar w-20 h-20 sm:w-28 sm:h-28 border border-gray-300 object-cover mx-auto mb-3 sm:mb-4"
              />
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                {profile.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                {profile.designation}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {profile.department}
              </p>
            </div>

            <div className="space-y-2">
              {!editing ? (
                <button
                  onClick={startEdit}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-red-500 bg-white border border-gray-200 hover:bg-red-50 transition-colors text-left"
              >
                Sign Out All Devices
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="bg-white border border-gray-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                Librarian Information
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {profileFields.map((field) => (
                  <div
                    key={field.key}
                    className="flex flex-col sm:flex-row sm:items-center border-b border-gray-50 pb-2.5 sm:pb-3 last:border-b-0"
                  >
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider sm:w-40 mb-0.5 sm:mb-0">
                      {field.label}
                    </p>
                    {editing && field.key !== "joined" ? (
                      <input
                        type="text"
                        value={draft[field.key]}
                        onChange={(e) =>
                          setDraft({ ...draft, [field.key]: e.target.value })
                        }
                        className="flex-1 border border-gray-300 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-600"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm font-medium text-gray-900">
                        {editing ? draft[field.key] : profile[field.key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Library Rules
                </h2>
                <button className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
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
                    onChange={(e) =>
                      updateSetting("borrowDuration", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors"
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
                    onChange={(e) =>
                      updateSetting("finePerDay", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors"
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
                    onChange={(e) =>
                      updateSetting("maxBooksStudent", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors"
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
                    onChange={(e) =>
                      updateSetting("maxBooksFaculty", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LibrarianLayout>
  );
};

export default LibrarianProfile;
