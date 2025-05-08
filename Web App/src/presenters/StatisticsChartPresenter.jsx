import { useEffect } from "react";
import { getAccuracy, getPhoneData } from "../model/modules/statistics";
import { getTemp } from "../model/modules/statistics";
import PageView from "../views/PageView";
import StatisticsChartView from "../views/StatisticsChartView";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getScore } from "../model/modules/statistics";
import { getSleepReg } from "../model/modules/statistics";

function StatisticsChartPresenter(props) {
  const dispatch = useDispatch();
  const accuracy = useSelector((state) => state.statistics.accuracy);
  const temp = useSelector((state) => state.statistics.temp);
  const phoneUsage = useSelector((state) => state.statistics.phone_usage);
  const score = useSelector((state) => state.statistics.score);
  const sleepReg = useSelector((state) => state.statistics.sleepReg);

  console.log("SCORE", score);
  const [plannedStartArray, setPlannedStartArray] = useState([]);

  //const [tempArray, setTempArray] = useState([]);

  const [phoneUsageArray, setPhoneUsageArray] = useState([]);

  //const [score1, setScore] = useState([]);

  const tempArray = temp.map((item) => ({
    temp: Number(item.room_temperature),
    hum: Number(item.room_humidity),
  }));

  const sleepRegArray = sleepReg.map((item) => ({
    sleep_start: item.sleep_start,
    sleep_end: item.sleep_end,
  }));

  console.log("Temperature Array;", tempArray);
  console.log("SleepReg Array;", sleepRegArray);

  useEffect(() => {
    dispatch(getAccuracy());
    getAccuracyData();
    getPhone();
    dispatch(getTemp());
    dispatch(getScore());
    dispatch(getPhoneData());
    dispatch(getSleepReg());
  }, [dispatch]);

  //console.log("STATISTICS: ", accuracy);

  function getAccuracyData() {
    const newPlannedStartArray = accuracy.map((item) => {
      const plannedStart = new Date(item.planned_start);
      const actualStart = new Date(item.actual_start);
      const plannedEnd = new Date(item.planned_end);
      const actualEnd = new Date(item.actual_end);

      const day = plannedStart.getDate();
      const month = plannedStart.getMonth() + 1;
      const year = plannedStart.getFullYear();
      const date = year + "/" + month + "/" + day;

      const plannedDuration = (plannedEnd - plannedStart) / (1000 * 60 * 60);
      const actualDuration = (actualEnd - actualStart) / (1000 * 60 * 60);

      return {
        planned: Number(plannedDuration.toFixed(1)),
        actual: Number(actualDuration.toFixed(1)),
        date: date,
      };
    });
    setPlannedStartArray(newPlannedStartArray);
    console.log("Updated plannedStartArray:", newPlannedStartArray);
  }

  /*function getTempData() {
    const newTempArray = temp.map((item) => {
      const temperature = Number(item.room_temperature);
      const humidity = Number(item.room_humidity);

      return {
        temp: temperature,
        hum: humidity,
      };
    });

    setTempArray(newTempArray);
    console.log("Updated TempArray", newTempArray);
  }*/

  function getPhone() {
    if (phoneUsage == undefined) {
      console.log("NO");
      return;
    }

    const newPhoneArray = phoneUsage.map((item) => {
      const plannedStart = new Date(item.planned_start);

      const day = plannedStart.getDate();
      const month = plannedStart.getMonth() + 1;
      const year = plannedStart.getFullYear();
      const date = year + "/" + month + "/" + day;
      //console.log("Phone usage", item.phone_usage);
      const phoneUsage = item.phone_usage;
      return {
        phone_usage: phoneUsage,
        date: date,
      };
    });

    setPhoneUsageArray(newPhoneArray);
    //console.log("UPDATED phoneUsage", newPhoneArray);
  }

  return (
    <PageView title="Statistics">
      <StatisticsChartView
        getAccuracyData={getAccuracyData}
        plannedStartArray={plannedStartArray}
        tempArray={tempArray}
        getPhone={getPhone}
        score={score}
        phoneUsageArray={phoneUsageArray}
        sleepRegArray={sleepRegArray}
      />
    </PageView>
  );
}

export default StatisticsChartPresenter;
