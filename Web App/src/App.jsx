import {
  TAB_ALARM,
  TAB_STATISTICS,
  TAB_RECORDINGS,
  TAB_SETTINGS,
} from "./model/modules/navigation";
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
import RecordingsPresenter from "./presenters/RecordingsPresenter";
import SoundPresenter from "./presenters/SoundPresenter";
import SettingsLightPresenter from "./presenters/SettingsLightPresenter";
import ScreenTimePresenter from "./presenters/ScreenTimePresenter";
import RoutinesPresenter from "./presenters/RoutinesPresenter";
import { SummaryPresenter } from "./presenters/summaryPresenter";
import dayjs from "dayjs"; // Installera dayjs om det inte redan finns
import { useState } from "react";
import { SummaryView } from "./views/SummaryView";


function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state) => state.authentication.authenticatedAs
  );
  const activeTab = useSelector((state) => state.navigation.navigationTab);

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
    }
  }, [dispatch]);

  const currentHour = dayjs().hour();


  function closeSummaryACB(){
    setShowSummary(false);
  }

  if (authenticated) {
   
    if(showSummary && currentHour > 5 && currentHour < 18){
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
