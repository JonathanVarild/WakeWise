import React from 'react';
import { ChevronRight } from "lucide-react";

export default function SettingsView({ 
    modules, 
    currentSubTab, 
    subTabTitle, 
    subTabContent, 
    onItemClick, 
    onBack 
}) {
    if (currentSubTab !== null) {
        return (
            <div className="p-4">
                <button 
                    onClick={onBack}
                    className="mb-4 flex items-center gap-1 -ml-3 pl-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Settings
                </button>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{subTabTitle}</h1>
                {subTabContent && subTabContent[currentSubTab]} 
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {modules.map((module) => (
                <div 
                    key={module.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                        <module.icon className="size-6 text-blue-500" />
                        <h2 className="text-lg font-semibold text-gray-800">
                            {module.title}
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {module.items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onItemClick(item.id)}
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