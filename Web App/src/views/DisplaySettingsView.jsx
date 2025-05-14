import React, { useState, useMemo } from 'react';
import { LayoutTemplate, TextCursorInput, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wheel } from "@uiw/react-color";

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
  const positions = useMemo(() => [
    'top-3 left-3',
    'top-3 right-3',
    'bottom-3 left-3',
    'bottom-3 right-3'
  ][position], [position]);

  return (
    <div className={`absolute ${positions} w-14 h-14`}>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-full flex items-center justify-center rounded border-2 border-gray-300 bg-white 
                 text-center text-lg font-bold hover:border-blue-500 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 appearance-none cursor-pointer"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
    </div>
  );
});

export default function DisplaySettingsView({
  pageLayouts = [[1,2,3,4], [5,6,7,8]],
  fontSize = 14,
  color = '#3b82f6',
  onUpdate
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [localFontSize, setLocalFontSize] = useState(fontSize);

  const handleLayoutUpdate = (index, newValue) => {
    const newLayouts = pageLayouts.map((page, i) => 
      i === currentPage ? [...page.slice(0, index), newValue, ...page.slice(index + 1)] : page
    );
    onUpdate('page_layouts', newLayouts);
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingsModule icon={LayoutTemplate} title="Page Layout">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
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
              onClick={() => setCurrentPage(p => Math.min(pageLayouts.length - 1, p + 1))}
              disabled={currentPage === pageLayouts.length - 1}
            >
              Next
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>

          <div className="relative w-full h-48 bg-gray-50 rounded-xl border-2 border-gray-200">
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

      <SettingsModule icon={TextCursorInput} title="Font Size">
        <div className="px-4 pb-4">
          <div className="flex items-center gap-4">
            <Slider 
              value={[localFontSize]}
              min={18}
              max={30}
              step={6}
              onValueChange={value => setLocalFontSize(value[0])}
              onValueCommit={value => onUpdate('font_size', value[0])}
              className="flex-1"
            />
            <span className="w-12 h-5 text-right text-gray-700">{localFontSize}px</span>
          </div>
        </div>
      </SettingsModule>

      <SettingsModule icon={Palette} title="Theme Color">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
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
                    onChange={(color) => onUpdate('color', color.hex)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <span className="text-sm font-mono text-gray-700">{color}</span>
        </div>
      </SettingsModule>
    </div>
  );
}