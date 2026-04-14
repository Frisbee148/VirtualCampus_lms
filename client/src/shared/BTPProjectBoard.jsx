import React, { useEffect, useMemo, useState } from "react";
import {
  BTP_PROJECT_OPTIONS,
  BTP_PROGRESS_STEPS,
  BTP_STORAGE_KEY,
  calculateBtpProgress,
  formatDateLabel,
  getDefaultBtpState,
  normalizeBtpState,
} from "./btpProjectData";

const readStoredBtpState = () => {
  try {
    const storedValue = localStorage.getItem(BTP_STORAGE_KEY);
    return storedValue
      ? normalizeBtpState(JSON.parse(storedValue))
      : getDefaultBtpState();
  } catch {
    return getDefaultBtpState();
  }
};

const saveStoredBtpState = (value) => {
  localStorage.setItem(BTP_STORAGE_KEY, JSON.stringify(value));
};

const BTPProjectBoard = ({ editable = false, roleLabel = "Student View" }) => {
  const [btpState, setBtpState] = useState(() => readStoredBtpState());

  useEffect(() => {
    const syncFromStorage = () => {
      setBtpState(readStoredBtpState());
    };

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  useEffect(() => {
    saveStoredBtpState(btpState);
  }, [btpState]);

  const isApplicationLocked =
    btpState.status === "pending" || btpState.status === "approved";
  const progressPercent = useMemo(
    () => calculateBtpProgress(btpState.progressSteps),
    [btpState.progressSteps],
  );

  const requestProject = (project) => {
    if (isApplicationLocked) return;

    setBtpState({
      ...getDefaultBtpState(),
      status: "pending",
      requestedProjectId: project.id,
      requestedProjectTitle: project.title,
      requestedProjectDomain: project.domain,
      requestedProjectGuide: project.guide,
      requestedAt: new Date().toISOString(),
      facultyNote: "Awaiting faculty approval",
      progressSteps: BTP_PROGRESS_STEPS.map((step) => ({
        ...step,
        completed: false,
      })),
    });
  };

  const updateStep = (stepId) => {
    if (!editable) return;

    setBtpState((currentState) => {
      const progressSteps = currentState.progressSteps.map((step) =>
        step.id === stepId ? { ...step, completed: !step.completed } : step,
      );

      return {
        ...currentState,
        progressSteps,
      };
    });
  };

  const updateFacultyNote = (value) => {
    if (!editable) return;

    setBtpState((currentState) => ({
      ...currentState,
      facultyNote: value,
    }));
  };

  const approveRequest = () => {
    if (!editable || !btpState.requestedProjectId) return;

    setBtpState((currentState) => ({
      ...currentState,
      status: "approved",
      approvedAt: new Date().toISOString(),
      facultyNote:
        currentState.facultyNote ||
        "Approved by faculty and locked for further application.",
    }));
  };

  const rejectRequest = () => {
    if (!editable || !btpState.requestedProjectId) return;

    setBtpState({
      ...getDefaultBtpState(),
      status: "rejected",
      facultyNote:
        "Request rejected. Student may apply for a different project.",
    });
  };

  const stateBadge =
    btpState.status === "approved"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : btpState.status === "pending"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : btpState.status === "rejected"
          ? "bg-rose-50 text-rose-700 border-rose-200"
          : "bg-slate-100 text-slate-700 border-slate-200";

  const requestButtonLabel = isApplicationLocked ? "Locked" : "Request Project";

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Status
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 capitalize">
            {btpState.status}
          </p>

        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Progress
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {progressPercent}%
          </p>

        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Lock
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {isApplicationLocked ? "Locked" : "Open"}
          </p>

        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Guide
          </p>
          <p className="text-base sm:text-xl font-bold text-gray-900 mt-1">
            {btpState.requestedProjectGuide || "-"}
          </p>

        </div>
      </div>

      <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-4 sm:gap-5">
        <section className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Project Requests
              </h2>

            </div>
            <div
              className={`inline-flex items-center px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold border ${stateBadge}`}
            >
              {btpState.status === "idle" ? "Available" : btpState.status}
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-3">
            {BTP_PROJECT_OPTIONS.map((project) => {
              const activeProject = project.id === btpState.requestedProjectId;
              const disabled = isApplicationLocked;

              return (
                <div
                  key={project.id}
                  className={`border p-3 sm:p-4 transition-colors ${activeProject ? "border-[#4E545C] bg-[#f2fbfb]" : "border-gray-200 bg-white"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                        {project.title}
                      </h3>

                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {project.domain}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-50 border border-gray-200">
                      Guide: {project.guide}
                    </span>
                    <span className="px-2 py-1 bg-gray-50 border border-gray-200">
                      1 student project
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div
                      className={`inline-flex items-center px-2.5 py-1 text-[10px] sm:text-xs font-semibold border ${activeProject ? stateBadge : "bg-gray-50 text-gray-500 border-gray-200"}`}
                    >
                      {activeProject
                        ? btpState.status.toUpperCase()
                        : "AVAILABLE"}
                    </div>
                    <button
                      type="button"
                      onClick={() => requestProject(project)}
                      disabled={disabled}
                      className={`inline-flex items-center px-3 py-2 text-[11px] sm:text-xs font-semibold transition-colors ${
                        disabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                          : "bg-[#4E545C] text-white hover:bg-[#828a91]"
                      }`}
                    >
                      {activeProject && btpState.status === "pending"
                        ? "Requested"
                        : activeProject && btpState.status === "approved"
                          ? "Locked"
                          : requestButtonLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Current Request & Progress
              </h2>

            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-emerald-700">
              Live
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-4">
            {!btpState.requestedProjectId ? (
              <div className="border border-dashed border-gray-300 bg-gray-50 p-4 sm:p-6 text-center">
                <p className="text-sm font-semibold text-gray-900">
                  No BTP project requested yet
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Choose a project from the left to send a request.
                </p>
              </div>
            ) : (
              <>
                <div className="border border-gray-200 bg-gray-50 p-4 sm:p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {btpState.requestedProjectTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {btpState.requestedProjectDomain}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold border ${stateBadge}`}
                    >
                      {btpState.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="bg-white border border-gray-200 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400">
                        Requested At
                      </p>
                      <p className="font-semibold text-gray-900 mt-1">
                        {formatDateLabel(btpState.requestedAt) || "-"}
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400">
                        Approved At
                      </p>
                      <p className="font-semibold text-gray-900 mt-1">
                        {formatDateLabel(btpState.approvedAt) ||
                          "Awaiting approval"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-gray-700">
                        Progress
                      </span>
                      <span className="font-bold text-gray-900">
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-200 overflow-hidden">
                      <div
                        className="h-full bg-[#4E545C] transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Faculty Progress Notes
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {btpState.facultyNote ||
                        "Faculty progress note will appear here after the teacher updates the request."}
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200">
                  <div className="px-3 sm:px-4 py-3 bg-[#131518] text-white text-xs sm:text-sm font-semibold flex items-center gap-2">
                    Progress Checklist
                  </div>
                  <div className="divide-y divide-gray-200">
                    {btpState.progressSteps.map((step) => (
                      <label
                        key={step.id}
                        className={`flex items-start gap-3 px-3 sm:px-4 py-3 ${editable ? "cursor-pointer hover:bg-gray-50" : "cursor-default"}`}
                      >
                        <input
                          type="checkbox"
                          checked={step.completed}
                          onChange={() => updateStep(step.id)}
                          disabled={!editable}
                          className="mt-1 h-4 w-4 accent-[#4E545C] disabled:cursor-default"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {step.label}
                          </p>

                        </div>
                        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap mt-1">
                          {step.completed ? "Done" : "Open"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {editable && (
                  <div className="border border-gray-200 bg-white p-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Faculty progress comment
                      </p>
                      <textarea
                        value={btpState.facultyNote}
                        onChange={(event) =>
                          updateFacultyNote(event.target.value)
                        }
                        rows={4}
                        className="mt-2 w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black resize-none"
                        placeholder="Write progress details for the student"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={approveRequest}
                        className="px-4 py-2 bg-[#4E545C] text-white text-xs sm:text-sm font-semibold hover:bg-[#828a91] transition-colors"
                      >
                        Approve and Lock
                      </button>
                      <button
                        type="button"
                        onClick={rejectRequest}
                        className="px-4 py-2 bg-white border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Reject Request
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BTPProjectBoard;
