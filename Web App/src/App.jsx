import { TAB_ALARM, TAB_STATISTICS, TAB_RECORDINGS, TAB_SETTINGS } from "./model/interface/navigation";
import { useSelector } from "react-redux";
import PageView from "./views/PageView";
import NavbarPresenter from "./presenters/NavbarPresenter";
import AlarmPresenter from "./presenters/AlarmPresenter";
import StatisticsChartPresenter from "./presenters/StatisticsChartPresenter";
import SettingsPresenter from "./presenters/SettingsPresenter";
import AuthenticatePresenter from "./presenters/AuthenticatePresenter";

function App() {
	const authenticated = useSelector((state) => state.interface.authenticatedAs);
	const activeTab = useSelector((state) => state.interface.navigationTab);

	// Define the pages for each tab
	const pages = [];
	pages[TAB_ALARM] = (
		<PageView title="Alarm">
			<AlarmPresenter />
		</PageView>
	);
	pages[TAB_STATISTICS] = (
		<PageView title="Statistics">
			<StatisticsChartPresenter />
		</PageView>
	);
	pages[TAB_RECORDINGS] = <PageView title="Recordings">Coming soon...</PageView>;
	pages[TAB_SETTINGS] = (
		<PageView title="Settings">
			<SettingsPresenter />
		</PageView>
	);

	if (authenticated) {
		return (
			<>
				{pages[activeTab]}
				<NavbarPresenter />
			</>
		);
	} else {
		return <AuthenticatePresenter />;
	}
}

export default App;
