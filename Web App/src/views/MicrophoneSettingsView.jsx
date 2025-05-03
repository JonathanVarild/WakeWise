import React from 'react';
import { Clock, Mic, Battery, ChevronRight } from 'lucide-react';

export default function MicrophoneSettingsView({ 
  settings, 
  onSave, 
  onUpdate,
  isLoading 
}) {
  const handleInputChange = (field, value) => {
    let parsedValue = Number(value);
    switch(field) {
      case 'before_sleep_delay_minutes':
        parsedValue = Math.max(0, Math.min(100, parsedValue));
        break;
      case 'activation_threshold_db':
        parsedValue = Math.max(0, Math.min(100, parsedValue));
        break;
      case 'recording_lifespan_days':
        parsedValue = Math.max(1, Math.min(60, parsedValue));
        break;
    }
    onUpdate(field, parsedValue);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Before Sleep Delay Module */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Clock className="size-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Before Sleep Delay</h2>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              value={settings.before_sleep_delay_minutes}
              onChange={(e) => handleInputChange('before_sleep_delay_minutes', e.target.value)}
              className="w-20 px-2 py-1 border rounded"
            />
            <span className="text-gray-700">minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={settings.before_sleep_delay_minutes}
              onChange={(e) => handleInputChange('before_sleep_delay_minutes', e.target.value)}
              className="w-32 accent-blue-500"
            />
            <ChevronRight className="size-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Activation Threshold Module */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Mic className="size-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Activation Threshold</h2>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              value={settings.activation_threshold_db}
              onChange={(e) => handleInputChange('activation_threshold_db', e.target.value)}
              className="w-20 px-2 py-1 border rounded"
            />
            <span className="text-gray-700">dB</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={settings.activation_threshold_db}
              onChange={(e) => handleInputChange('activation_threshold_db', e.target.value)}
              className="w-32 accent-blue-500"
            />
            <ChevronRight className="size-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Recording Lifespan Module */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Battery className="size-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Recording Lifespan</h2>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="60"
              value={settings.recording_lifespan_days}
              onChange={(e) => handleInputChange('recording_lifespan_days', e.target.value)}
              className="w-20 px-2 py-1 border rounded"
            />
            <span className="text-gray-700">days</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="60"
              value={settings.recording_lifespan_days}
              onChange={(e) => handleInputChange('recording_lifespan_days', e.target.value)}
              className="w-32 accent-blue-500"
            />
            <ChevronRight className="size-5 text-gray-400" />
          </div>
        </div>
      </div>

      <button
        onClick={onSave}
        disabled={isLoading}
        className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors shadow-sm"
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}