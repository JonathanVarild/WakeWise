import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from "lucide-react";

export default function SettingsView({ modules }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      {modules.map((module) => (
        <div 
          key={module.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            {module.icon}
            <h2 className="text-lg font-semibold text-gray-800">
              {module.title}
            </h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {module.items.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700">{item.name}</span>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}