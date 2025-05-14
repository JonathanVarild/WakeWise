import { TAB_ALARM, TAB_STATISTICS, TAB_RECORDINGS, TAB_SETTINGS } from "./model/modules/navigation";
import { useSelector } from "react-redux";
import NavbarPresenter from "./presenters/NavbarPresenter";
import AlarmPresenter from "./presenters/AlarmPresenter";
import StatisticsChartPresenter from "./presenters/StatisticsChartPresenter";
import SettingsPresenter from "./presenters/SettingsPresenter";
import AuthenticatePresenter from "./presenters/AuthenticatePresenter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getClockNeedsSetup,
  reauthenticateUser,
} from "./model/modules/authentication";
import RecordingsPresenter from "./presenters/RecordingsPresenter";
import { SummaryPresenter } from "./presenters/SummaryPresenter";
import dayjs from "dayjs";
import { useState } from "react";
import ClockSetupPresenter from "./presenters/ClockSetupPresenter";
import LoadingView from "./views/LoadingView";

function App() {
	const dispatch = useDispatch();
	const authenticated = useSelector((state) => state.authentication.authenticatedAs);
	const activeTab = useSelector((state) => state.navigation.navigationTab);
  const needsSetup = useSelector(
    (state) => state.authentication.clockNeedsSetup
  );

	const [showSummary, setShowSummary] = useState(true);

	// Define the pages for each tab
	const pages = [];
	pages[TAB_ALARM] = <AlarmPresenter />;
	pages[TAB_STATISTICS] = <StatisticsChartPresenter />;
	pages[TAB_RECORDINGS] = <RecordingsPresenter />;
	pages[TAB_SETTINGS] = <SettingsPresenter />;

	useEffect(() => {
		if (!authenticated) {
			dispatch(reauthenticateUser());
      dispatch(getClockNeedsSetup());
		}
	}, [dispatch]);

  if (needsSetup == null) {
    return <LoadingView />;
  } else if (needsSetup == true) {
    return <ClockSetupPresenter />;
  }

	const currentHour = dayjs().hour();

	function closeSummaryACB() {
		setShowSummary(false);
	}

	if (authenticated) {
		if (showSummary && currentHour > 5 && currentHour < 18) {
			return <SummaryPresenter closeSummary={closeSummaryACB} />;
		} else {
			return (
				<>
					{pages[activeTab]}
					<NavbarPresenter />
				</>
			);
		}
	} else {
		return <AuthenticatePresenter />;
	}
}

export default App;
