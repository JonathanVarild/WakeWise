import { TAB_ALARM, TAB_STATISTICS, TAB_RECORDINGS, TAB_SETTINGS } from "./model/modules/navigation";
import { useSelector } from "react-redux";
import PageView from "./views/PageView";
import NavbarPresenter from "./presenters/NavbarPresenter";
import AlarmPresenter from "./presenters/AlarmPresenter";
import StatisticsChartPresenter from "./presenters/StatisticsChartPresenter";
import SettingsPresenter from "./presenters/SettingsPresenter";
import AuthenticatePresenter from "./presenters/AuthenticatePresenter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reauthenticateUser } from "./model/modules/authentication";

function App() {
	const dispatch = useDispatch();
	const authenticated = useSelector((state) => state.authentication.authenticatedAs);
	const activeTab = useSelector((state) => state.navigation.navigationTab);

	// Define the pages for each tab
	const pages = [];
	pages[TAB_ALARM] = <AlarmPresenter />;
	pages[TAB_STATISTICS] = <StatisticsChartPresenter />;
	pages[TAB_RECORDINGS] = <PageView title="Recordings">Coming soon...</PageView>;
	pages[TAB_SETTINGS] = <SettingsPresenter />;

	useEffect(() => {
		if (!authenticated) {
			dispatch(reauthenticateUser());
		}
	}, [dispatch]);

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
