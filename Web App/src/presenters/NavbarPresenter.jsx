import { useDispatch, useSelector } from "react-redux";
import NavbarView from "../views/NavbarView";
import { TAB_ALARM, TAB_STATISTICS, TAB_RECORDINGS, TAB_SETTINGS, changeTab } from "../model/modules/navigation";
import { AlarmClock, ChartNoAxesCombined, Mic, Settings } from "lucide-react";

function NavbarPresenter(props) {
	const dispatch = useDispatch();
	const activeTab = useSelector((state) => state.navigation.navigationTab);

	// Define the tabs for the navbar.
	const tabs = [
		{ id: TAB_ALARM, name: "Alarm", icon: <AlarmClock className="size-6" /> },
		{ id: TAB_STATISTICS, name: "Statistics", icon: <ChartNoAxesCombined className="size-6" /> },
		{ id: TAB_RECORDINGS, name: "Recordings", icon: <Mic className="size-6" /> },
		{ id: TAB_SETTINGS, name: "Settings", icon: <Settings className="size-6" /> },
	];

	// Function to change the active tab.
	function changeTabACB(tab) {
		if (activeTab !== tab) {
			dispatch(changeTab(tab));
		}
	}

	return <NavbarView tabs={tabs} activeTab={activeTab} changeTab={changeTabACB} />;
}

export default NavbarPresenter;
