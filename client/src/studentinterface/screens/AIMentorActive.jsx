import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { X, Copy, RefreshCw, Send } from 'lucide-react';

const AIMentorActive = () => {
  const navigate = useNavigate();
  const responses = [
    { title: 'Quiz 1 Review', content: 'Focus on Chapter 3: Trees & Graphs. Practice problems 5.1-5.8 from the textbook. Review lecture slides from Week 6. Key topics: BFS, DFS, Dijkstra\'s algorithm.' },
    { title: 'Study Plan for Today', content: '9:00 AM - Review DSA linked lists (1 hr)\n11:00 AM - Practice OS scheduling problems (1.5 hrs)\n2:00 PM - Complete Networks assignment (2 hrs)\n5:00 PM - Revise midsem topics (1 hr)' },
  ];

  return (
    <StudentLayout activeTab="">
      <div className="max-w-4xl relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Assistant</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-5 sm:mb-8 border-b border-gray-200">
          <button
            onClick={() => navigate('/ai')}
            className="px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 -mb-px cursor-pointer transition-all duration-200 border-transparent text-gray-400 hover:text-gray-600"
          >
            Ask AI
          </button>
          <button className="px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 -mb-px cursor-pointer transition-all duration-200 border-black text-black">
            MentorBot
          </button>
        </div>

        {/* Responses */}
        <div className="space-y-3 sm:space-y-5 mb-5 sm:mb-8">
          {responses.map((r, idx) => (
            <div key={idx} className="bg-white border border-gray-200 overflow-hidden">
              <div className="bg-[#242424] px-3 sm:px-5 py-2.5 sm:py-3">
                <h3 className="text-white font-semibold text-xs sm:text-sm">{r.title}</h3>
              </div>
              <div className="p-3 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line">{r.content}</p>
              </div>
              <div className="px-3 sm:px-5 pb-3 sm:pb-4 flex flex-wrap items-center gap-1.5 sm:gap-2 border-t border-gray-100 pt-2.5 sm:pt-3">
                <button className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                  Copy
                </button>
                <button className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                  Regenerate
                </button>
                <button 
                  onClick={() => navigate('/calendar')}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-black border border-black/30 hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Add to Calendar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Prompt Input */}
        <div className="sticky bottom-6">
          <div className="flex gap-2 sm:gap-3 bg-white border border-gray-200 shadow-lg p-1.5 sm:p-2">
            <input
              type="text"
              placeholder="Ask a follow-up question..."
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent min-w-0"
            />
            <button className="flex-shrink-0 px-3 sm:px-5 py-2.5 sm:py-3 bg-[#242424] text-white text-xs sm:text-sm font-semibold hover:bg-[#434343] transition-colors cursor-pointer">
              Send
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AIMentorActive;
