import React from "react";
import FacultyLayout from "../FacultyLayout";
import CIFCompletionBoard from "../../shared/CIFCompletionBoard";
import {
  getStoredFacultyCourseKey,
  getCifCourse,
} from "../../shared/cifCompletionData";

const FacultyCIFCompletion = () => {
  const assignedCourseKey = getStoredFacultyCourseKey();
  const assignedCourse = getCifCourse(assignedCourseKey);

  return (
    <FacultyLayout>
      <div className="max-w-6xl">
        <div className="mb-5 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              CIF Completion
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              {assignedCourse.code} - {assignedCourse.title} is assigned to your
              login, so you can only edit this course CIF.
            </p>
          </div>
          <div className="px-3 py-2 bg-[#242424] text-white text-xs sm:text-sm font-semibold shadow-sm self-start sm:self-auto">
            Faculty Editable View
          </div>
        </div>
        <CIFCompletionBoard
          editable={true}
          roleLabel="Faculty View"
          courseKey={assignedCourseKey}
          showCourseSelector={false}
        />
      </div>
    </FacultyLayout>
  );
};

export default FacultyCIFCompletion;
