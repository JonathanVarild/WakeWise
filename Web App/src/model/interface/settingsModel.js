
import React from 'react';
import { 
  AlarmClock,
  Settings,
  Cpu,
  CalendarCheck
} from "lucide-react";

const createIcon = (IconComponent) => {
  return React.createElement(IconComponent, { className: "size-6 text-blue-500" });
};

export const settingsData = [
  {
    id: 1,
    title: "Wakeup Settings",
    icon: createIcon(AlarmClock),
    items: [
      { id: 11, name: "Light Settings", path: "/light" },
      { id: 12, name: "Sound Settings", path: "/sound" }
    ]
  },
  {
    id: 2,
    title: "System Settings",
    icon: createIcon(Settings),
    items: [
      { id: 21, name: "Configuration Settings", path: "/config" },
      { id: 22, name: "Users Settings", path: "/users" },
      { id: 23, name: "Notifications Settings", path: "/notifications" }
    ]
  },
  {
    id: 3,
    title: "Hardware Settings",
    icon: createIcon(Cpu),
    items: [
      { id: 31, name: "Display Settings", path: "/display" },
      { id: 32, name: "Microphone Settings", path: "/mic" },
    ]
  },
  {
    id: 4,
    title: "Habits Settings",
    icon: createIcon(CalendarCheck),
    items: [
      { id: 41, name: "Screen Time Settings", path: "/screentime" },
      { id: 42, name: "Routines Settings", path: "/routines" }
    ]
  }
];