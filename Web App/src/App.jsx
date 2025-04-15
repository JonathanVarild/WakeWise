import NavbarPresenter from "./presenters/NavbarPresenter";
import { TAB_ALARM, TAB_STATISTICS, TAB_RECORDINGS, TAB_SETTINGS } from "./model/interface/navigation";
import { useSelector } from "react-redux";
import PageView from "./views/PageView";

function App() {
	const activeTab = useSelector((state) => state.interface.navigationTab);

	// Define the pages for each tab
	const pages = [];
	pages[TAB_ALARM] = <PageView title="Alarm">This is the alarm page...</PageView>;
	pages[TAB_STATISTICS] = <PageView title="Statistics" />;
	pages[TAB_RECORDINGS] = <PageView title="Recordings" />;
	pages[TAB_SETTINGS] = <PageView title="Settings" />;

	return (
		<>
			{pages[activeTab]}
			<NavbarPresenter />
		</>
	);
}

export default App;
