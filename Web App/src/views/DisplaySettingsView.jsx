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

const LayoutCell = ({ value, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`h-12 flex items-center justify-center rounded border transition-colors duration-200 ${
      isSelected 
        ? 'bg-blue-500 border-blue-600 text-white'
        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-100'
    }`}
  >
    {value}
  </button>
);

export default function DisplaySettingsView({
  pageLayouts = [[1,2,3,4], [5,6,7,8]],
  fontSize = 14,
  color = '#3b82f6',
  onSave,
  onUpdate
}) {
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (rowIndex, cellIndex) => {
    setSelectedCell({ row: rowIndex, col: cellIndex });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <SettingsModule icon={Table} title="Page Layout">
        <div className="space-y-2">
          {pageLayouts.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-2">
              {row.map((cell, cellIndex) => (
                <LayoutCell
                  key={cellIndex}
                  value={cell}
                  isSelected={selectedCell?.row === rowIndex && selectedCell?.col === cellIndex}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                />
              ))}
            </div>
          ))}
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
              onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
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
              onChange={(e) => onUpdate({ color: e.target.value })}
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
        className="mt-2 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white 
                 rounded-lg font-semibold transition-colors shadow-sm"
      >
        Save Changes
      </button>
    </div>
  );
}