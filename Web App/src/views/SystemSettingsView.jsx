import { Globe, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@radix-ui/react-dialog";

export default function SystemSettingsView(props) {
  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-4">
        {/* Timezone Settings Section */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 flex items-center gap-3">
            <Globe size={20} className="text-gray-600 dark:text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Timezone Settings</h2>
          </div>
          <div className="px-4 pb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-[280px] dark:text-gray-100">
                  {props.timeZone || "Select Timezone"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="text-lg font-semibold mb-4 dark:text-gray-100">
                  Select Timezone
                </DialogTitle>
                <div className="max-h-[400px] overflow-y-auto">
                  {props.timezones.map((tz) => (
                    <Button
                      key={tz}
                      variant="ghost"
                      className="w-full justify-start dark:text-gray-100"
                      onClick={() => props.onTimezoneChange(tz)}
                    >
                      {tz}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <div className="text-xs pt-2 text-gray-500 dark:text-gray-300">
              Current timezone: {props.timeZone}
            </div>
          </div>
        </div>

        {/* Interface Theme Section */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 flex items-center gap-3">
            <Moon size={20} className="text-gray-600 dark:text-gray-300" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Interface Theme</h2>
          </div>
          <div className="px-4 pb-4 flex flex-col gap-2">
            <div className="flex justify-between gap-4">
              <Button
                variant={props.theme === 'light' ? 'default' : 'outline'}
                onClick={() => props.onThemeChange('light')}
                className="flex-1"
              >
                Light Mode
              </Button>
              <Button
                variant={props.theme === 'dark' ? 'default' : 'outline'}
                onClick={() => props.onThemeChange('dark')}
                className="flex-1"
              >
                Dark Mode
              </Button>
            </div>
            <div className="text-xs pt-2 text-gray-500 dark:text-gray-300">
              Current theme: {{
                light: 'Light',
                dark: 'Dark'
              }[props.theme]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

