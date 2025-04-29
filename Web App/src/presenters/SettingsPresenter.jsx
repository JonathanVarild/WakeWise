import PageView from "../views/PageView";
import SettingsView from "../views/SettingsView";
import { AlarmClock, Settings, Cpu, CalendarCheck } from "lucide-react";

const settingsData = [
	{
		id: 1,
		title: "Wakeup Settings",
		icon: AlarmClock,
		items: [
			{ id: 11, name: "Light Settings", path: "/settings/light" },
			{ id: 12, name: "Sound Settings", path: "/settings/sound" },
		],
	},
	{
		id: 2,
		title: "System Settings",
		icon: Settings,
		items: [
			{ id: 21, name: "Configuration Settings", path: "/settings/config" },
			{ id: 22, name: "Users Settings", path: "/settings/users" },
			{ id: 23, name: "Notifications Settings", path: "/settings/notifications" },
		],
	},
	{
		id: 3,
		title: "Hardware Settings",
		icon: Cpu,
		items: [
			{ id: 31, name: "Display Settings", path: "/settings/display" },
			{ id: 32, name: "Microphone Settings", path: "/settings/mic" },
		],
	},
	{
		id: 4,
		title: "Habits Settings",
		icon: CalendarCheck,
		items: [
			{ id: 41, name: "Screen Time Settings", path: "/settings/screentime" },
			{ id: 42, name: "Routines Settings", path: "/settings/routines" },
		],
	},
];

export default function SettingsPresenter() {
	const handleItemClick = (path) => {
		console.log("Clicked item path:", path);
	};

	return (
		<PageView title="Settings">
			<SettingsView modules={settingsData} onItemClick={handleItemClick} />
		</PageView>
	);
}
