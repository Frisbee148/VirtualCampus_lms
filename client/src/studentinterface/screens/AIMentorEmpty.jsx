import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { X, Send } from 'lucide-react';

const AIMentorEmpty = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ask');
  const [prompt, setPrompt] = useState('');

  return (
    <StudentLayout activeTab="">
      <div className="max-w-4xl relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('ask')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 -mb-px cursor-pointer transition-all duration-200 ${
              activeTab === 'ask' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Ask AI
          </button>
          <button
            onClick={() => { setActiveTab('mentor'); navigate('/ai/active'); }}
            className={`px-6 py-3 text-sm font-semibold border-b-2 -mb-px cursor-pointer transition-all duration-200 ${
              activeTab === 'mentor' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            MentorBot
          </button>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Smart Context</h3>
            <p className="text-xs text-gray-400 leading-relaxed">AI has access to your attendance, current courses, and courses you can repeat for personalized advice.</p>
          </div>
          <div className="bg-white border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-1">MentorBot</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Switch to MentorBot for study plans, quiz reviews, and content you can add directly to your calendar.</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-gray-400">Ask anything about your courses, schedule, or performance</p>
        </div>

        {/* Prompt Input */}
        <div className="sticky bottom-6 mt-8">
          <div className="flex gap-3 bg-white border border-gray-200 shadow-lg p-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
            />
            <button className="px-5 py-3 bg-black text-white text-sm font-semibold hover:bg-[#0e445b] transition-colors cursor-pointer flex items-center gap-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default AIMentorEmpty;
