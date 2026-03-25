import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ArrowLeft } from 'lucide-react';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const infoItems = [
    { label: 'Email', value: 'k.east@student.io' },
    { label: 'Phone', value: '+91 98765 43210' },
    { label: 'Department', value: 'Computer Science & Engineering' },
    { label: 'Enrollment Year', value: '2022' },
    { label: 'Roll Number', value: 'CSE2022045' },
    { label: 'Semester', value: '3' },
  ];

  return (
    <StudentLayout activeTab="">
      <div className="max-w-4xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 mb-6 cursor-pointer transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        <div className="flex gap-8">
          <div className="w-56 flex-shrink-0 space-y-4">
            <div className="bg-white border border-gray-200 p-6 text-center">
              <img src="/Picture1.png" alt="Profile" className="w-28 h-28 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-sm font-bold text-gray-900">Kanye East</h3>
              <p className="text-xs text-gray-400 mt-0.5">B.Tech CSE - Semester 3</p>
            </div>

            <div className="space-y-2">
              <button className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer text-left">
                Edit Profile
              </button>
              <button className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer text-left">
                Change Password
              </button>
              <button className="w-full px-4 py-3 text-sm font-medium text-red-500 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer text-left">
                Sign Out All Devices
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Student Information</h2>
            <div className="space-y-4">
              {infoItems.map((item, idx) => (
                <div key={idx} className="flex items-center border-b border-gray-50 pb-3 last:border-b-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-40">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ProfileScreen;
