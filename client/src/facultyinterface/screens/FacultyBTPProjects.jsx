import React from "react";
import FacultyLayout from "../FacultyLayout";
import BTPProjectBoard from "../../shared/BTPProjectBoard";

const FacultyBTPProjects = () => {
  return (
    <FacultyLayout>
      <div className="max-w-6xl">
        <div className="mb-5 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              BTP Projects
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Review student requests, update progress milestones, and approve
              the project when ready.
            </p>
          </div>
          <div className="px-3 py-2 bg-[#4E545C] text-white text-xs sm:text-sm font-semibold shadow-sm self-start sm:self-auto">
            Faculty Editable View
          </div>
        </div>
        <BTPProjectBoard editable={true} roleLabel="Faculty View" />
      </div>
    </FacultyLayout>
  );
};

export default FacultyBTPProjects;
