import { useEffect } from "react";
import { getAccuracy, getPhoneData } from "../model/modules/statistics";
import { getTemp } from "../model/modules/statistics"
import PageView from "../views/PageView";
import StatisticsChartView from "../views/StatisticsChartView";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function StatisticsChartPresenter(props) {
  const dispatch = useDispatch();
  const accuracy = useSelector((state) => state.statistics.accuracy);
  const temp = useSelector((state) => state.statistics.temp);
  const phoneUsage = useSelector((state) => state.statistics.phone_usage)

  const [plannedStartArray, setPlannedStartArray] = useState([]);

  const [tempArray, setTempArray] = useState([]);

  const [phoneUsageArray, setPhoneUsageArray] = useState([]);

  useEffect(() => {
    dispatch(getAccuracy());
    getAccuracyData();
	dispatch(getTemp());
	dispatch(getPhoneData())
  }, [dispatch]);

  useEffect(() => {
	if (temp.length > 0) getTempData();
  }, [temp]);

  //console.log("STATISTICS: ", accuracy);

  function getAccuracyData() {
    const newPlannedStartArray = accuracy.map((item) => {
      //console.log("Planned Start:", item.planned_start);
      //console.log("Actual Start:", item.actual_start);

      const plannedStart = new Date(item.planned_start);
	  const actualStart = new Date(item.actual_start);

	  const plannedEnd = new Date(item.planned_end);
	  const actualEnd = new Date(item.actual_end);
	  
	  const day = plannedStart.getDate()
	  const month = plannedStart.getMonth() +1
	  const year = plannedStart.getFullYear() 
	  const date = year + "/" + month + "/" + day
      
      /*const diffStart = actualStart.getTime() - plannedStart.getTime();
      const diffStartInMinutes = Math.floor(diffStart / (1000 * 60));

	  const diffEnd = actualEnd.getTime() - plannedEnd.getTime();
	  console.log(diffEnd)
	  const diffEndInMinutes = Math.floor(diffEnd / (1000 * 60));*/

	  const plannedDuration = (plannedEnd - plannedStart) / (1000 * 60 * 60); 
  	  const actualDuration = (actualEnd - actualStart) / (1000 * 60 * 60);     
	  //console.log("DURATION: ",actualDuration);
	  //console.log("actual End:",actualEnd)

      return {
        //MinutesStart: diffStartInMinutes,
		//MinutesEnd: diffEndInMinutes,
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
	if (!Array.isArray(phoneUsage) || phoneUsage.length === 0) {
	  console.error("Phone usage data is empty or invalid:", phoneUsage);
	  return;
	}
  
	const newPhoneArray = phoneUsage.map((item) => {
	  console.log("Phone usage", item.phone_usage);
	  const phoneUsage = item.phone_usage;
	  const date = item.planned_start
  
	  return {
		phone_usage: phoneUsage,
		start: date
	  };
	});
  
	setPhoneUsageArray(newPhoneArray);
	console.log("Updated phoneUsage", newPhoneArray);
  }


  return (
    <PageView title="Statistics">
      <StatisticsChartView
        getAccuracyData={getAccuracyData}
        plannedStartArray={plannedStartArray}
		tempArray={tempArray}
		getTempData={getTempData}
      />
    </PageView>
  );
}

export default StatisticsChartPresenter;
