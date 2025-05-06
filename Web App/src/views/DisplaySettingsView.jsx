import React, { useState } from 'react';
import { Table, TextCursorInput, Palette, ChevronRight } from 'lucide-react';

const SettingsModule = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
      <Icon className="size-6 text-blue-500" />
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const LayoutCell = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="h-12 w-full flex items-center justify-center rounded border border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>
);

export default function DisplaySettingsView({
  pageLayouts = [[1,2,3,4], [5,6,7,8]],
  fontSize = 14,
  color = '#3b82f6',
  onSave,
  onUpdate
}) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <SettingsModule icon={Table} title="Page Layout">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {pageLayouts.length}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(pageLayouts.length - 1, p + 1))}
              disabled={currentPage === pageLayouts.length - 1}
              className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {pageLayouts[currentPage].map((cell, cellIndex) => (
              <LayoutCell
                key={cellIndex}
                value={cell}
                onChange={(newValue) => onUpdate(`page_layouts.${currentPage}.${cellIndex}`, newValue)}
              />
            ))}
          </div>

          <div className="relative w-80 h-48 mx-auto bg-gray-100 rounded-lg border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">
              Time
            </div>
            <div className="absolute top-3 left-3 w-14 h-14 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-gray-700">
              {pageLayouts[currentPage][0]}
            </div>
            <div className="absolute top-3 right-3 w-14 h-14 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-gray-700">
              {pageLayouts[currentPage][1]}
            </div>
            <div className="absolute bottom-3 left-3 w-14 h-14 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-gray-700">
              {pageLayouts[currentPage][2]}
            </div>
            <div className="absolute bottom-3 right-3 w-14 h-14 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-gray-700">
              {pageLayouts[currentPage][3]}
            </div>
          </div>
        </div>
      </SettingsModule>

      <SettingsModule icon={TextCursorInput} title="Font Size">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">{fontSize}px</span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => onUpdate('font_size', Number(e.target.value))}
              className="w-32 accent-blue-500"
            />
            <ChevronRight className="size-5 text-gray-400" />
          </div>
        </div>
      </SettingsModule>

      <SettingsModule icon={Palette} title="Theme Color">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => onUpdate('color', e.target.value)}
              className="sr-only"
              id="colorInput"
            />
            <label 
              htmlFor="colorInput"
              className="w-8 h-8 rounded border-2 border-gray-200 cursor-pointer shadow-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-gray-700 font-medium">{color}</span>
          </div>
          <ChevronRight className="size-5 text-gray-400" />
        </div>
      </SettingsModule>

      <button
        onClick={onSave}
        className="mt-2 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors shadow-sm"
      >
        Save Changes
      </button>
    </div>
  );
}