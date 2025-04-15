import { Button } from "../components/ui/button";
import { 
  House, 
  LayoutPanelLeft, 
  Smartphone, 
  AlarmClockCheck, 
  Volume1, 
  Sun,
  ChevronRight
} from "lucide-react";

function SettingsView() {
  const settingsGroups = [
    {
      title: "System Settings",
      items: [
        { 
          id: 1, 
          name: "System", 
          icon: <House className="size-6" />
        },
        { 
          id: 2, 
          name: "App preferences", 
          icon: <LayoutPanelLeft className="size-6" />
        }
      ]
    },
    {
      title: "Display & Time",
      items: [
        { 
          id: 3, 
          name: "Screen time settings", 
          icon: <Smartphone className="size-6" />
        },
        { 
          id: 4, 
          name: "Customize clock", 
          icon: <AlarmClockCheck className="size-6" />
        }
      ]
    },
    {
      title: "Environment",
      items: [
        { 
          id: 5, 
          name: "Sound and light settings",
          icon: (
            <div className="flex gap-0.5">
              <Volume1 className="size-5" />
              <Sun className="size-5" />
            </div>
          )
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100/50 min-h-screen">
      {settingsGroups.map((group) => (
        <div 
          key={group.title}
          className="bg-white rounded-xl shadow-sm border border-gray-200/80"
        >
          <div className="p-2">
            <h3 className="px-4 py-2 text-sm font-medium text-gray-500">
              {group.title}
            </h3>
            <div className="divide-y divide-gray-100">
              {group.items.map((item) => (
                <div key={item.id}>
                  <Button
                    variant="ghost"
                    className="h-16 w-full justify-between px-6 rounded-none hover:bg-gray-50/80"
                  >
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <span className="text-lg text-gray-700">{item.name}</span>
                    </div>
                    <ChevronRight className="size-5 text-gray-400" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SettingsView;