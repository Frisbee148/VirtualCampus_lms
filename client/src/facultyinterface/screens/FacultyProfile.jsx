import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultyLayout from '../FacultyLayout';
import { ArrowLeft, Camera, Check, X } from 'lucide-react';

const initialInfo = {
  name: 'Dr. Farah Khan',
  email: 'farah.khan@lnmiit.ac.in',
  phone: '+91 98765 12345',
  department: 'Computer Science & Engineering',
  designation: 'Associate Professor',
  employeeId: 'FAC2018032',
  joiningYear: '2018',
  cabin: 'Block A, Room 204',
  courses: 'CS301, CS405',
};

const fieldLabels = {
  name: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  department: 'Department',
  designation: 'Designation',
  employeeId: 'Employee ID',
  joiningYear: 'Joining Year',
  cabin: 'Cabin / Office',
  courses: 'Courses Assigned',
};

const readOnlyFields = ['employeeId', 'joiningYear', 'department'];

const FacultyProfile = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState(initialInfo);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialInfo);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPw: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');

  const startEdit = () => {
    setDraft({ ...info });
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft({ ...info });
    setEditing(false);
  };

  const saveEdit = () => {
    setInfo({ ...draft });
    setEditing(false);
  };

  const handlePasswordSubmit = () => {
    setPwError('');
    setPwSuccess('');
    if (!passwords.current || !passwords.newPw || !passwords.confirm) {
      setPwError('All fields are required.');
      return;
    }
    if (passwords.newPw.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }
    if (passwords.newPw !== passwords.confirm) {
      setPwError('Passwords do not match.');
      return;
    }
    setPwSuccess('Password changed successfully.');
    setPasswords({ current: '', newPw: '', confirm: '' });
    setTimeout(() => {
      setChangingPassword(false);
      setPwSuccess('');
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('rememberedUsername');
    sessionStorage.clear();
    navigate('/', { replace: true });
  };

  return (
    <FacultyLayout>
      <div className="max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-5 cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
          {/* Left column — avatar + actions */}
          <div className="w-full sm:w-56 flex-shrink-0 space-y-3">
            <div className="bg-white border border-gray-200 p-5 text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-[#1a7a7a] flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  FK
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                  <Camera size={13} className="text-gray-500" />
                </button>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mt-3">{info.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{info.designation}</p>
              <p className="text-xs text-gray-400">{info.department}</p>
            </div>

            <div className="space-y-2">
              {!editing ? (
                <button
                  onClick={startEdit}
                  className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer text-left"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#1a7a7a] hover:bg-[#15696a] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check size={14} /> Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2.5 text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <button
                onClick={() => { setChangingPassword(!changingPassword); setPwError(''); setPwSuccess(''); }}
                className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer text-left"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-sm font-medium text-red-500 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer text-left"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Right column — info / edit form */}
          <div className="flex-1 space-y-5">
            <div className="bg-white border border-gray-200 p-5">
              <h2 className="text-base font-bold text-gray-900 mb-5">Faculty Information</h2>
              <div className="space-y-4">
                {Object.keys(fieldLabels).map((key) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center border-b border-gray-50 pb-3 last:border-b-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider sm:w-40 mb-0.5 sm:mb-0">
                      {fieldLabels[key]}
                    </p>
                    {editing && !readOnlyFields.includes(key) ? (
                      <input
                        type="text"
                        value={draft[key]}
                        onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                        className="flex-1 text-sm font-medium text-gray-900 border border-gray-300 px-2.5 py-1.5 outline-none focus:border-[#1a7a7a] transition-colors"
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-900">{editing ? draft[key] : info[key]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Change password section */}
            {changingPassword && (
              <div className="bg-white border border-gray-200 p-5">
                <h2 className="text-base font-bold text-gray-900 mb-4">Change Password</h2>
                <div className="space-y-3 max-w-sm">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1a7a7a] transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={passwords.newPw}
                    onChange={(e) => setPasswords({ ...passwords, newPw: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1a7a7a] transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1a7a7a] transition-colors"
                  />
                  {pwError && <p className="text-xs text-red-500">{pwError}</p>}
                  {pwSuccess && <p className="text-xs text-green-600">{pwSuccess}</p>}
                  <button
                    onClick={handlePasswordSubmit}
                    className="bg-[#1a7a7a] text-white px-5 py-2 text-sm font-medium hover:bg-[#15696a] transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
};

export default FacultyProfile;
