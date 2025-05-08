import { useEffect } from "react";
import {
  getAccuracy,
  getPhoneData,
  getHabitsScreenTime,
} from "../model/modules/statistics";
import { getTemp } from "../model/modules/statistics";
import PageView from "../views/PageView";
import StatisticsChartView from "../views/StatisticsChartView";
import StatisticsPhoneView from "../views/StatisticsPhoneView";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  SUBTAB_STATISTICS,
  SUBTAB_STATISTICS_SCREEN,
  changeStatisticsTab,
} from "../model/modules/navigation";
import { Moon, Smartphone } from "lucide-react";

function StatisticsChartPresenter(props) {
  const dispatch = useDispatch();
  const accuracy = useSelector((state) => state.statistics.accuracy);
  const temp = useSelector((state) => state.statistics.temp);
  const phoneUsage = useSelector((state) => state.statistics.phone_usage);
  const screenTimeData = useSelector((state) => state.statistics.screen_time);
  const activeTab = useSelector(
    (state) => state.navigation.statisticsSubtab
  );

  const statisticsSubtabs = [];

  console.log("activetab: ", activeTab);
  console.log("SUBTAB_STATISTICS_SCREEN:", SUBTAB_STATISTICS_SCREEN);
  console.log("SUBTAB_STATISTICS: ", SUBTAB_STATISTICS, )

  


  const tabs = [
    {
      id: SUBTAB_STATISTICS,
      icon: <Moon />,
      name: "Sleep statistics",
    },
    {
      id: SUBTAB_STATISTICS_SCREEN,
      icon: <Smartphone />,
      name: "Phone statistics",
    },
  ];

  const [plannedStartArray, setPlannedStartArray] = useState([]);

  const [tempArray, setTempArray] = useState([]);

  const [phoneUsageArray, setPhoneUsageArray] = useState([]);
  const [screenTimeArray, setScreenTimeArray] = useState([]);

  useEffect(() => {
    dispatch(getAccuracy());
    dispatch(getPhoneData());
    dispatch(getTemp());
    dispatch(getHabitsScreenTime());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(accuracy) && accuracy.length > 0) {
      getAccuracyData();
    }
  }, [accuracy]);

  useEffect(() => {
    if (temp.length > 0) getTempData();
  }, [temp]);

  useEffect(() => {
    if (Array.isArray(phoneUsage) && phoneUsage.length > 0) {
      getPhone();
    }
  }, [phoneUsage]);

  useEffect(() => {
    if (Array.isArray(screenTimeData) && screenTimeData.length > 0) {
      getPhoneComparison();
    }
  }, [screenTimeData]);

  //console.log("Screen time habits data: ", screenTimeData);

  function changeTabACB(tab) {
    if (activeTab !== tab) {
      dispatch(changeStatisticsTab(tab));
    }
  }

  function getAccuracyData() {
    const newPlannedStartArray = accuracy.map((item) => {
      const plannedStart = new Date(item.planned_start);
      const actualStart = new Date(item.actual_start);
      const plannedEnd = new Date(item.planned_end);
      const actualEnd = new Date(item.actual_end);

      const day = plannedStart.getDate();
      const month = plannedStart.getMonth() + 1;
      const year = plannedStart.getFullYear();
      const date = month + "/" + day;

      const plannedDuration = (plannedEnd - plannedStart) / (1000 * 60 * 60);
      const actualDuration =
        Math.abs(actualEnd - actualStart) / (1000 * 60 * 60);

      return {
        planned: Number(plannedDuration.toFixed(1)),
        actual: Number(actualDuration.toFixed(1)),
        date: date,
      };
    });
    setPlannedStartArray(newPlannedStartArray);
    console.log("Updated plannedStartArray:", newPlannedStartArray);
  }

  function getTempData() {
    const newTempArray = temp.map((item) => {
      console.log("Temp:", item.room_temperature);
      console.log("Humidity", item.room_humidity);
      const temperature = Number(item.room_temperature);
      const humidity = Number(item.room_humidity);
      return {
        temp: temperature,
        hum: humidity,
      };
    });
    setTempArray(newTempArray);
    console.log("Updated TempArray", newTempArray);
  }

  function getPhone() {
    const newPhoneArray = phoneUsage.map((item) => {
      const plannedStart = new Date(item.planned_start);

      const day = plannedStart.getDate();
      const month = plannedStart.getMonth() + 1;
      const year = plannedStart.getFullYear();
      const date = month + "/" + day;
      //console.log("Phone usage", item.phone_usage);
      const phoneUsage = item.phone_usage;
      return {
        phone_usage: phoneUsage,
        date: date,
      };
    });
    setPhoneUsageArray(newPhoneArray);
    console.log("UPDATED phoneUsage", newPhoneArray);
  }

  function getPhoneComparison() {
    let total_phone_usage = 0;
    let total_allowed_minutes = 0;

    screenTimeData.map((item) => {
      const plannedStart = new Date(item.planned_start);

      const day = plannedStart.getDate();
      const month = plannedStart.getMonth() + 1;
      const year = plannedStart.getFullYear();
      const date = `${month}/${day}`; // Fixat datumformatet

      //console.log("Actual phone usage:", item.phone_usage);
      //console.log("Planned usage:", item.total_allowed_minutes);

      total_phone_usage += item.phone_usage;
      total_allowed_minutes += item.total_allowed_minutes;
    });

    const newScreenTimeArray = [
      {
        actual: total_phone_usage,
        planned: total_allowed_minutes,
      },
    ];

    console.log("TOTAL TIME: ", total_phone_usage);
    console.log("TOTAL PLANNED TIME: ", total_allowed_minutes);

    setScreenTimeArray(newScreenTimeArray[0]);
    console.log("UPDATED screenTimeArray:", newScreenTimeArray);
  }

  const handleItemClick = (id) => {
    dispatch(changeSubTab(id));
  };

  statisticsSubtabs[SUBTAB_STATISTICS] = <StatisticsChartView getAccuracyData={getAccuracyData}
  plannedStartArray={plannedStartArray}
  tempArray={tempArray}
  getTempData={getTempData}
  getPhone={getPhone}
  phoneUsageArray={phoneUsageArray}
  getPhoneComparison={getPhoneComparison}
  screenTimeArray={screenTimeArray}
  changeTab={changeTabACB}
  tabs={tabs}
  onItemClick={handleItemClick}/>;
  

  statisticsSubtabs[SUBTAB_STATISTICS_SCREEN] = (
    <StatisticsPhoneView
      getAccuracyData={getAccuracyData}
      plannedStartArray={plannedStartArray}
      tempArray={tempArray}
      getTempData={getTempData}
      getPhone={getPhone}
      phoneUsageArray={phoneUsageArray}
      getPhoneComparison={getPhoneComparison}
      screenTimeArray={screenTimeArray}
      changeTab={changeTabACB}
      tabs={tabs}
      onItemClick={handleItemClick}
    />
  );

  function renderView() {
    console.log("statisticsSubtabs", statisticsSubtabs)
    console.log("activeTab", activeTab)
    console.log("statisticsSubtabs[activeTab]", statisticsSubtabs[activeTab]);
    
     return statisticsSubtabs[activeTab];
     
  
  }

  return <PageView title="Statistics">{renderView()}</PageView>;
}

export default StatisticsChartPresenter;
