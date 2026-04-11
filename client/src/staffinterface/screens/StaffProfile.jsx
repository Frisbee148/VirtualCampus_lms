import React from "react";
import StaffLayout from "../StaffLayout";
import { Mail, Phone, Building2, Shield, Calendar } from "lucide-react";

const profileData = {
  name: "Anita Sharma",
  role: "Administrative Staff",
  department: "Academic Office",
  email: "anita.sharma@lnmiit.ac.in",
  phone: "+91 98765 43210",
  joinDate: "August 2019",
  permissions: ["User Management", "Course Management", "Enrollment Management", "Announcements"],
};

const StaffProfile = () => {
  return (
    <StaffLayout>
      <div className="max-w-3xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5">Profile</h2>

        {/* Profile Card */}
        <div className="bg-white border border-gray-100 shadow-sm mb-6">
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/Picture1.png"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="text-base font-semibold text-gray-800">{profileData.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{profileData.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <Mail size={15} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Email</p>
                  <p className="text-xs text-gray-700">{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <Phone size={15} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Phone</p>
                  <p className="text-xs text-gray-700">{profileData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <Building2 size={15} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Department</p>
                  <p className="text-xs text-gray-700">{profileData.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-50">
                  <Calendar size={15} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Joined</p>
                  <p className="text-xs text-gray-700">{profileData.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white border border-gray-100 shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
            <Shield size={15} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700">Permissions</h3>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {profileData.permissions.map((p) => (
                <span key={p} className="px-3 py-1.5 text-[10px] font-medium bg-blue-50 text-blue-700 rounded-full">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffProfile;
