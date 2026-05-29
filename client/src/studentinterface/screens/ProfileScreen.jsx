import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ArrowLeft } from 'lucide-react';
import { fetchProfile } from '../../auth/studentApi';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProfile()
      .then((data) => { if (!cancelled) setProfile(data); })
      .catch(() => { if (!cancelled) setProfile(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <StudentLayout activeTab="">
        <div className="max-w-4xl">
          <div className="h-8 w-32 bg-gray-100 mb-6 animate-pulse" />
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="w-full sm:w-56 h-48 bg-gray-50 border border-gray-100 animate-pulse" />
            <div className="flex-1 h-64 bg-gray-50 border border-gray-100 animate-pulse" />
          </div>
        </div>
      </StudentLayout>
    );
  }

  const infoItems = profile ? [
    { label: 'Email', value: profile.email || '' },
    { label: 'Phone', value: profile.phone || '' },
    { label: 'Department', value: profile.department || '' },
    { label: 'Enrollment Year', value: profile.enrollment_year || '' },
    { label: 'Roll Number', value: profile.roll_number || '' },
    { label: 'Semester', value: profile.semester || '' },
  ] : [];

  const displayName = profile?.full_name || profile?.username || 'User';
  const avatarUrl = profile?.avatar_url || '/Picture1.png';
  const program = profile?.program || 'B.Tech';
  const department = profile?.department || 'CSE';
  const semester = profile?.semester || '';

  return (
    <StudentLayout activeTab="">
      <div className="max-w-4xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-gray-600 mb-4 sm:mb-6 cursor-pointer transition-colors">
          <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 sm:mb-8">Profile</h1>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div className="w-full sm:w-56 flex-shrink-0 space-y-3 sm:space-y-4">
            <div className="bg-white border border-gray-200 p-4 sm:p-6 text-center">
              <img src={avatarUrl} alt="Profile" className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">{displayName}</h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{program} {department} - Semester {semester}</p>
            </div>

            <div className="space-y-2">
              <button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer text-left">
                Edit Profile
              </button>
              <button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer text-left">
                Change Password
              </button>
              <button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-red-500 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer text-left">
                Sign Out All Devices
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white border border-gray-200 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">Student Information</h2>
            <div className="space-y-3 sm:space-y-4">
              {infoItems.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center border-b border-gray-50 pb-2.5 sm:pb-3 last:border-b-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider sm:w-40 mb-0.5 sm:mb-0">{item.label}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{item.value}</p>
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
