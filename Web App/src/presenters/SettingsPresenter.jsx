import { 
  SUBTAB_LIGHTSETTINGS,
  SUBTAB_SOUNDSETTINGS,
  SUBTAB_CONFIGURATION,
  SUBTAB_USERS,
  SUBTAB_NOTIFICATIONS,
  SUBTAB_DISPLAY,
  SUBTAB_MIC,
  SUBTAB_SCREENTIME,
  SUBTAB_ROUTINES
} from "../model/interface/navigation";
import SettingsView from "../views/SettingsView";
import { AlarmClock, Settings, Cpu, CalendarCheck } from "lucide-react";
import { changeSettingSubTab } from "../model/interface";
import { useSelector, useDispatch } from "react-redux";

const settingsData = [
    {
        id: 1,
        title: "Wakeup Settings",
        icon: AlarmClock,
        items: [
            { id: SUBTAB_LIGHTSETTINGS, name: "Light Settings" },
            { id: SUBTAB_SOUNDSETTINGS, name: "Sound Settings" }
        ],
    },
    {
        id: 2,
        title: "System Settings",
        icon: Settings,
        items: [
            { id: SUBTAB_CONFIGURATION, name: "Configuration Settings" },
            { id: SUBTAB_USERS, name: "Users Settings" },
            { id: SUBTAB_NOTIFICATIONS, name: "Notifications Settings" },
        ],
    },
    {
        id: 3,
        title: "Hardware Settings",
        icon: Cpu,
        items: [
            { id: SUBTAB_DISPLAY, name: "Display Settings" },
            { id: SUBTAB_MIC, name: "Microphone Settings" },
        ],
    },
    {
        id: 4,
        title: "Habits Settings",
        icon: CalendarCheck,
        items: [
            { id: SUBTAB_SCREENTIME, name: "Screen Time Settings" },
            { id: SUBTAB_ROUTINES, name: "Routines Settings" },
        ],
    },
];

export default function SettingsPresenter() {
    const dispatch = useDispatch();
    const currentSubTab = useSelector((state) => state.interface.settingsSubTab);

    const handleItemClick = (id) => {
        dispatch(changeSettingSubTab(id));
    };

    const handleBack = () => {
        dispatch(changeSettingSubTab(null));
    };

    const getSubTabTitle = (id) => {
        for (const module of settingsData) {
            const item = module.items.find(item => item.id === id);
            if (item) return item.name;
        }
        return 'Settings';
    };

    return (
        <SettingsView 
            modules={settingsData}
            currentSubTab={currentSubTab}
            subTabTitle={getSubTabTitle(currentSubTab)}
            onItemClick={handleItemClick}
            onBack={handleBack}
        />
    );
}