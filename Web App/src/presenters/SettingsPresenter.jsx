import {
	SUBTAB_LIGHTSETTINGS,
	SUBTAB_SOUNDSETTINGS,
	SUBTAB_CONFIGURATION,
	SUBTAB_USERS,
	SUBTAB_NOTIFICATIONS,
	SUBTAB_DISPLAY,
	SUBTAB_MIC,
	SUBTAB_SCREENTIME,
	SUBTAB_ROUTINES,
	changeSubTab,
} from "../model/modules/navigation";
import SettingsView from "../views/SettingsView";
import { AlarmClock, Settings, Cpu, CalendarCheck, Mic } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import PageView from "../views/PageView";
import SettingsLightPresenter from "./SettingsLightPresenter";
import DisplaySettingsPresenter from "./DisplaySettingsPresenter";
import MicrophoneSettingsPresenter from "./MicrophoneSettingsPresenter";
import SoundPresenter from "./SoundPresenter";
import ScreenTimePresenter from "./ScreenTimePresenter";
import RoutinePresenter from "./RoutinesPresenter";

const settingsSubTabs = [];
settingsSubTabs[SUBTAB_DISPLAY] = <DisplaySettingsPresenter />;
settingsSubTabs[SUBTAB_MIC] = <MicrophoneSettingsPresenter />;
settingsSubTabs[SUBTAB_LIGHTSETTINGS] = <SettingsLightPresenter />;
settingsSubTabs[SUBTAB_SOUNDSETTINGS] = <SoundPresenter />;
settingsSubTabs[SUBTAB_SCREENTIME] = <ScreenTimePresenter />;
settingsSubTabs[SUBTAB_ROUTINES] = <RoutinePresenter />;


const settingsData = [
	{
		id: 1,
		title: "Wakeup Settings",
		icon: AlarmClock,
		items: [
			{ id: SUBTAB_LIGHTSETTINGS, name: "Light Settings" },
			{ id: SUBTAB_SOUNDSETTINGS, name: "Sound Settings" },
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
	const currentSubTab = useSelector((state) => state.navigation.settingsSubTab);

	const handleItemClick = (id) => {
		dispatch(changeSubTab(id));
	};

	const handleGoBackButtonACB = () => {
		dispatch(changeSubTab(null));
	};

	function renderView() {
		if (currentSubTab === null) {
			return <SettingsView modules={settingsData} onItemClick={handleItemClick} />;
		} else {
			return settingsSubTabs[currentSubTab];
		}
	}

	return (
		<PageView title="Settings" renderBackButton={currentSubTab != null} onBackButtonClick={handleGoBackButtonACB}>
			{renderView()}
		</PageView>
	);
}
