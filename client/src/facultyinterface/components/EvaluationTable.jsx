import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const EvaluationTable = ({ sections, onSectionsChange }) => {
  const [editing, setEditing] = useState(false);

  const totalWeightage = sections.reduce((sum, s) => sum + s.weightage, 0);

  const toggleCompleted = (id) => {
    onSectionsChange(sections.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const addSection = () => {
    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    onSectionsChange([...sections, { id: newId, name: `Section ${newId}`, weightage: 0, classAverage: 0, completed: false }]);
  };

  const updateSection = (id, field, value) => {
    onSectionsChange(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div>
      {/* Weightage banner and edit button */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="bg-[#e8a435] text-white px-6 py-2 text-sm font-semibold rounded-sm">
          Total weightage = {totalWeightage}
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className={`px-6 py-2 text-sm font-medium border-2 transition-all duration-200 ${
            editing
              ? 'border-red-400 text-red-600 hover:bg-red-50'
              : 'border-[#2d8a4e] text-[#2d8a4e] hover:bg-green-50'
          }`}
        >
          {editing ? 'done' : 'edit'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#1a7a7a] text-white">
              <th className="text-left px-4 py-3 font-semibold">Evaluation criteria</th>
              <th className="text-left px-4 py-3 font-semibold">Weightage</th>
              <th className="text-left px-4 py-3 font-semibold">Class average</th>
              <th className="text-left px-4 py-3 font-semibold">Feedform creation</th>
              <th className="text-left px-4 py-3 font-semibold">Completed</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, idx) => (
              <tr key={section.id} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200/60'}>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) => updateSection(section.id, 'name', e.target.value)}
                      className="bg-white border border-gray-300 px-2 py-1 text-sm w-full max-w-[150px]"
                    />
                  ) : (
                    section.name
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="number"
                      value={section.weightage}
                      onChange={(e) => updateSection(section.id, 'weightage', Number(e.target.value))}
                      className="bg-white border border-gray-300 px-2 py-1 text-sm w-20"
                    />
                  ) : (
                    section.weightage
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="number"
                      value={section.classAverage}
                      onChange={(e) => updateSection(section.id, 'classAverage', Number(e.target.value))}
                      className="bg-white border border-gray-300 px-2 py-1 text-sm w-20"
                    />
                  ) : (
                    section.classAverage
                  )}
                </td>
                <td className="px-4 py-3">
                  <button className="text-[#1a7a7a] underline hover:text-[#145e5e] text-sm transition-colors">
                    Create hyperlink
                  </button>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={section.completed}
                    onChange={() => toggleCompleted(section.id)}
                    className="w-4 h-4 accent-[#1a7a7a] cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add section */}
      <button
        onClick={addSection}
        className="flex items-center gap-1 mt-4 text-sm text-gray-700 hover:text-[#1a7a7a] transition-colors"
      >
        Add section <Plus size={16} className="text-[#1a7a7a]" />
      </button>
    </div>
  );
};

export default EvaluationTable;
