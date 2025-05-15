import React, { useState, useMemo } from 'react';
import { LayoutTemplate, TextCursorInput, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wheel } from "@uiw/react-color";


const MODULES = [
  { id: 1, label: "Indoor Temp" },
  { id: 2, label: "Humidity" },
  { id: 3, label: "Date" },
  { id: 4, label: "Alarm time" },
  { id: 5, label: "Weekday"},
  { id: 6, label: "Week number"},
  { id: 7, label: "Sleep scores"},
  { id: 8, label: "empty" },
];


const SettingsModule = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
      <Icon className="size-6 text-black" />
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="p-4">{children}</div>
  </div>
);


const ModulePosition = React.memo(({ value, onChange, position }) => {
  const positions = useMemo(
    () => [
        "top-3 left-3",
        "top-3 right-3",
        "bottom-3 left-3",
        "bottom-3 right-3",
      ][position],
    [position]
  );


  return (
    <div className={`absolute ${positions} w-24 h-16`}>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        title={MODULES.find((m) => m.id === value)?.label}
        className="w-full h-full flex items-center justify-center rounded border-2 border-gray-300 bg-white text-center text-xs font-medium hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer whitespace-normal"
      >
        {MODULES.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default function DisplaySettingsView({
  pageLayouts = [[1,2,3,4], [5,6,7,8]],
  fontSize = 18,
  color = '#3b82f6',
  onUpdate
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const sizeOptions = [
    { value: 18, label: 'Small' },
    { value: 24, label: 'Medium' },
    { value: 30, label: 'Large' }
  ];

  const handleLayoutUpdate = (index, newValue) => {
    const newLayouts = pageLayouts.map((page, i) =>
      i === currentPage
        ? [...page.slice(0, index), newValue, ...page.slice(index + 1)]
        : page
    );
    onUpdate("page_layouts", newLayouts);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* -------------------------------------- PAGE LAYOUT -------------------------------------- */}
      <SettingsModule icon={LayoutTemplate} title="Page Layout">
        <div className="space-y-4">
          {/* Pagination controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="size-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {pageLayouts.length}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((p) => Math.min(pageLayouts.length - 1, p + 1))
              }
              disabled={currentPage === pageLayouts.length - 1}
            >
              Next
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>

          {/* 4‑position selector */}
          <div className="relative w-full h-56 bg-gray-50 rounded-xl border-2 border-gray-200">
            {pageLayouts[currentPage].map((value, index) => (
              <ModulePosition
                key={index}
                value={value}
                position={index}
                onChange={(newValue) => handleLayoutUpdate(index, newValue)}
              />
            ))}
          </div>
        </div>
      </SettingsModule>

      {/* -------------------------------------- FONT SIZE -------------------------------------- */}
      <SettingsModule icon={TextCursorInput} title="Font Size">

        <div className="p-4">
          <div className="flex gap-3">
            {sizeOptions.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className={`w-24 transition-all ${
                  fontSize === option.value 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => onUpdate('font_size', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </SettingsModule>

      {/* -------------------------------------- THEME COLOR -------------------------------------- */}
      <SettingsModule icon={Palette} title="Theme Color">
        <div className="flex items-center justify-between p-4">
          <Dialog>
            <DialogTrigger>
              <div
                className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer shadow-sm"
                style={{ backgroundColor: color }}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Theme Color</DialogTitle>
              </DialogHeader>
              <div className="py-8 flex justify-center">
                <Wheel
                  color={color}
                  onChange={(c) => onUpdate("color", c.hex)}
                />
              </div>
            </DialogContent>
          </Dialog>
          <span className="text-sm font-mono text-gray-700">{color}</span>
        </div>
      </SettingsModule>

    </div>
  );
}
