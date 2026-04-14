import React, { useState } from "react";
import AdminLayout from "../AdminLayout";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    instituteName: "The LNM Institute of Information Technology",
    shortName: "LNMIIT",
    website: "https://www.lnmiit.ac.in",
    contactEmail: "info@lnmiit.ac.in",
    contactPhone: "+91 141 2688090",
    address:
      "Rupa ki Nangal, Post-Sumel, Via Jamdoli, Jaipur, Rajasthan 302031",
    academicYear: "2025-26",
    currentSemester: "Even (Spring)",
    semesterStart: "2026-01-15",
    semesterEnd: "2026-05-30",
    examStart: "2026-04-14",
    resultDate: "2026-06-15",
    primaryColor: "#4E545C",
    accentColor: "#131518",
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    sessionTimeout: "30",
    maxLoginAttempts: "5",
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              System Settings
            </h2>
            <p className="text-sm text-gray-400">
              Configure institution and system preferences
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium bg-[#4E545C] text-white rounded-lg hover:bg-[#828a91] transition-colors w-full sm:w-auto">
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          {/* Institution Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Institution Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Institute Name
                </label>
                <input
                  type="text"
                  value={settings.instituteName}
                  onChange={(e) =>
                    updateSetting("instituteName", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Short Name
                </label>
                <input
                  type="text"
                  value={settings.shortName}
                  onChange={(e) => updateSetting("shortName", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Website
                </label>
                <input
                  type="text"
                  value={settings.website}
                  onChange={(e) => updateSetting("website", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Contact Email
                </label>
                <input
                  type="text"
                  value={settings.contactEmail}
                  onChange={(e) =>
                    updateSetting("contactEmail", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => updateSetting("address", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Academic Calendar */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Academic Calendar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={settings.academicYear}
                  onChange={(e) =>
                    updateSetting("academicYear", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Current Semester
                </label>
                <input
                  type="text"
                  value={settings.currentSemester}
                  onChange={(e) =>
                    updateSetting("currentSemester", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Semester Start
                </label>
                <input
                  type="date"
                  value={settings.semesterStart}
                  onChange={(e) =>
                    updateSetting("semesterStart", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                  Semester End
                </label>
                <input
                  type="date"
                  value={settings.semesterEnd}
                  onChange={(e) => updateSetting("semesterEnd", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Notifications & Security */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Notifications & Security
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </p>
                  <p className="text-xs text-gray-400">
                    Send email alerts for important events
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "emailNotifications",
                      !settings.emailNotifications,
                    )
                  }
                  className={`w-11 h-6 rounded-full transition-colors self-start sm:self-auto ${settings.emailNotifications ? "bg-[#4E545C]" : "bg-gray-300"}`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.emailNotifications ? "translate-x-5" : "translate-x-0.5"}`}
                  ></span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    SMS Notifications
                  </p>
                  <p className="text-xs text-gray-400">
                    Send SMS alerts to users
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "smsNotifications",
                      !settings.smsNotifications,
                    )
                  }
                  className={`w-11 h-6 rounded-full transition-colors self-start sm:self-auto ${settings.smsNotifications ? "bg-[#4E545C]" : "bg-gray-300"}`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.smsNotifications ? "translate-x-5" : "translate-x-0.5"}`}
                  ></span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Maintenance Mode
                  </p>
                  <p className="text-xs text-gray-400">
                    Take the system offline for maintenance
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting("maintenanceMode", !settings.maintenanceMode)
                  }
                  className={`w-11 h-6 rounded-full transition-colors self-start sm:self-auto ${settings.maintenanceMode ? "bg-red-500" : "bg-gray-300"}`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.maintenanceMode ? "translate-x-5" : "translate-x-0.5"}`}
                  ></span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Auto Backup
                  </p>
                  <p className="text-xs text-gray-400">
                    Automatic database backups
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting("autoBackup", !settings.autoBackup)
                  }
                  className={`w-11 h-6 rounded-full transition-colors self-start sm:self-auto ${settings.autoBackup ? "bg-[#4E545C]" : "bg-gray-300"}`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.autoBackup ? "translate-x-5" : "translate-x-0.5"}`}
                  ></span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      updateSetting("sessionTimeout", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) =>
                      updateSetting("maxLoginAttempts", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#d97706] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SystemSettings;
