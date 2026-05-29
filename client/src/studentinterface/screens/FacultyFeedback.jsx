import React, { useState, useEffect } from 'react';
import StudentLayout from '../StudentLayout';
import { ExternalLink } from 'lucide-react';
import { useSession } from '../../context/SessionContext';
import { fetchFeedback } from '../../auth/studentApi';

const FacultyFeedback = () => {
  const { selectedSessionId } = useSession();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchFeedback(selectedSessionId)
      .then((data) => { if (!cancelled) setFeedbacks(data.feedbacks || []); })
      .catch(() => { if (!cancelled) setFeedbacks([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [selectedSessionId]);

  // Derive unique subjects and professors from feedbacks
  const subjects = [...new Set(feedbacks.map(f => f.course_name).filter(Boolean))];
  const professors = [...new Set(feedbacks.map(f => f.faculty_name).filter(Boolean))];

  if (loading) {
    return (
      <StudentLayout activeTab="Feedback">
        <div className="max-w-5xl">
          <div className="h-8 w-48 bg-gray-100 mb-4 animate-pulse" />
          <div className="h-40 bg-gray-50 border border-gray-100 animate-pulse" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab="Feedback">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Faculty Feedback</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">Submit feedback forms for your courses</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-8">
          <select className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors">
            <option>Select Subject</option>
            {subjects.map((s, i) => <option key={i}>{s}</option>)}
          </select>
          <select className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors">
            <option>Select Professor</option>
            {professors.map((p, i) => <option key={i}>{p}</option>)}
          </select>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#4E545C] text-white">
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold">Feedback Name</th>
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold w-[80px] sm:w-auto">Link</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f, idx) => (
                <tr key={f.id || idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-medium text-gray-900">{f.name}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-5">
                    <button className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-black font-medium hover:underline cursor-pointer">
                      <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">Open Form</span><span className="sm:hidden">Open</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default FacultyFeedback;
