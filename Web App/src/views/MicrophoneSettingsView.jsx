import React from 'react';
import { Clock, Mic, Battery, ChevronRight } from 'lucide-react';

export default function MicrophoneSettingsView({ settings, onUpdate, onSave }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Delay module */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Clock className="size-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Delay</h2>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              value={settings.delay}
              onChange={(e) => onUpdate('delay', e.target.value)}
              className="w-20 px-2 py-1 border rounded"
            />
            <span className="text-gray-700">minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={settings.delay}
              onChange={(e) => onUpdate('delay', e.target.value)}
              className="w-32 accent-blue-500"
            />
            <ChevronRight className="size-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Threshold module */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Mic className="size-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Sound Threshold</h2>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="-100"
              max="100"
              value={settings.threshold}
              onChange={(e) => onUpdate('threshold', e.target.value)}
              className="w-20 px-2 py-1 border rounded"
            />
            <span className="text-gray-700">dB</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="-100"
              max="100"
              value={settings.threshold}
              onChange={(e) => onUpdate('threshold', e.target.value)}
              className="w-32 accent-blue-500"
            />
            <ChevronRight className="size-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Lifespan module */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Battery className="size-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800"> Lifespan</h2>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="60"
              value={settings.lifespan}
              onChange={(e) => onUpdate('lifespan', e.target.value)}
              className="w-20 px-2 py-1 border rounded"
            />
            <span className="text-gray-700">days</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="60"
              value={settings.lifespan}
              onChange={(e) => onUpdate('lifespan', e.target.value)}
              className="w-32 accent-blue-500"
            />
            <ChevronRight className="size-5 text-gray-400" />
          </div>
        </div>
      </div>

 
      <button
        onClick={onSave}
        className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white 
                 rounded-lg font-semibold transition-colors shadow-sm"
      >
        Save Changes
      </button>
    </div>
  );
}