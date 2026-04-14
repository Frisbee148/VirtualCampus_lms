import React from "react";
import { useNavigate } from "react-router-dom";
import StaffLayout from "../StaffLayout";
import { ArrowLeft } from 'lucide-react';

const profileData = {
  name: "Anita Sharma",
  role: "Administrative Staff",
  department: "Academic Office",
  email: "anita.sharma@lnmiit.ac.in",
  phone: "+91 98765 43210",
  joinDate: "August 2019",
  permissions: [
    "User Management",
    "Course Management",
    "Enrollment Management",
    "Announcements",
  ],
};

const infoItems = [
  { label: "Email", value: profileData.email },
  { label: "Phone", value: profileData.phone },
  { label: "Department", value: profileData.department },
  { label: "Joined", value: profileData.joinDate },
];

const StaffProfile = () => {
  const navigate = useNavigate();

  return (
    <StaffLayout>
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
                {profileData.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                {profileData.role}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {profileData.department}
              </p>
            </div>

            <div className="space-y-2">
              <button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                Edit Profile
              </button>
              <button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                Change Password
              </button>
              <button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-red-500 bg-white border border-gray-200 hover:bg-red-50 transition-colors text-left">
                Sign Out All Devices
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="bg-white border border-gray-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                Staff Information
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col sm:flex-row sm:items-center border-b border-gray-50 pb-2.5 sm:pb-3 last:border-b-0"
                  >
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider sm:w-40 mb-0.5 sm:mb-0">
                      {item.label}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                Permissions
              </h2>
              <div className="flex flex-wrap gap-2">
                {profileData.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-3 py-1.5 text-[10px] font-medium bg-gray-100 text-gray-700"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffProfile;
