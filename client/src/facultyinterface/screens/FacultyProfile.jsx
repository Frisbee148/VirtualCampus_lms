import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FacultyLayout from "../FacultyLayout";

const initialInfo = {
  name: "Dr. Farah Khan",
  email: "farah.khan@lnmiit.ac.in",
  phone: "+91 98765 12345",
  department: "Computer Science & Engineering",
  designation: "Associate Professor",
  employeeId: "FAC2018032",
  joiningYear: "2018",
  cabin: "Block A, Room 204",
  courses: "CS301, CS405",
};

const fieldLabels = {
  name: "Full Name",
  email: "Email",
  phone: "Phone",
  department: "Department",
  designation: "Designation",
  employeeId: "Employee ID",
  joiningYear: "Joining Year",
  cabin: "Cabin / Office",
  courses: "Courses Assigned",
};

const readOnlyFields = ["employeeId", "joiningYear", "department"];

const FacultyProfile = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState(initialInfo);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialInfo);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPw: "",
    confirm: "",
  });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");

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
    setPwError("");
    setPwSuccess("");
    if (!passwords.current || !passwords.newPw || !passwords.confirm) {
      setPwError("All fields are required.");
      return;
    }
    if (passwords.newPw.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (passwords.newPw !== passwords.confirm) {
      setPwError("Passwords do not match.");
      return;
    }
    setPwSuccess("Password changed successfully.");
    setPasswords({ current: "", newPw: "", confirm: "" });
    setTimeout(() => {
      setChangingPassword(false);
      setPwSuccess("");
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("rememberedUsername");
    localStorage.removeItem("vc_token");
    localStorage.removeItem("vc_user");
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <FacultyLayout>
      <div className="max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-gray-600 mb-4 sm:mb-6 cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> Back
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
                {info.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                {info.designation}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {info.department}
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
                onClick={() => {
                  setChangingPassword(!changingPassword);
                  setPwError("");
                  setPwSuccess("");
                }}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-left"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-red-500 bg-white border border-gray-200 hover:bg-red-50 transition-colors text-left"
              >
                Sign Out All Devices
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="bg-white border border-gray-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                Faculty Information
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {Object.keys(fieldLabels).map((key) => (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:items-center border-b border-gray-50 pb-2.5 sm:pb-3 last:border-b-0"
                  >
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider sm:w-40 mb-0.5 sm:mb-0">
                      {fieldLabels[key]}
                    </p>
                    {editing && !readOnlyFields.includes(key) ? (
                      <input
                        type="text"
                        value={draft[key]}
                        onChange={(e) =>
                          setDraft({ ...draft, [key]: e.target.value })
                        }
                        className="flex-1 border border-gray-300 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-gray-900 bg-white focus:outline-none focus:border-gray-600"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm font-medium text-gray-900">
                        {editing ? draft[key] : info[key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {changingPassword && (
              <div className="bg-white border border-gray-200 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                  Change Password
                </h2>
                <div className="space-y-3 max-w-sm">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    className="w-full border border-gray-300 px-3 py-2 text-xs sm:text-sm bg-white focus:outline-none focus:border-gray-600"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={passwords.newPw}
                    onChange={(e) =>
                      setPasswords({ ...passwords, newPw: e.target.value })
                    }
                    className="w-full border border-gray-300 px-3 py-2 text-xs sm:text-sm bg-white focus:outline-none focus:border-gray-600"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    className="w-full border border-gray-300 px-3 py-2 text-xs sm:text-sm bg-white focus:outline-none focus:border-gray-600"
                  />
                  {pwError && <p className="text-xs text-red-500">{pwError}</p>}
                  {pwSuccess && (
                    <p className="text-xs text-green-600">{pwSuccess}</p>
                  )}
                  <button
                    onClick={handlePasswordSubmit}
                    className="bg-gray-900 text-white px-5 py-2 text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
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
