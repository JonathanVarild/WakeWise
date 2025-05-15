import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SummaryView } from "../views/SummaryView";
import { getTemp } from "../model/modules/summary";
import { getAvailableUsers } from "../model/modules/authentication";
import { getAccuracy, getScore, getAvrgTemp, getAvrgTempNight } from "../model/modules/statistics";
import { setUserNotes } from "../model/modules/summary";


export function SummaryPresenter(props) {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.authentication.authenticatedAs);
  const temp = useSelector((state) => state.summary.temp);
  const accuracy = useSelector((state) => state.statistics.accuracy);
  const score = useSelector((state) => state.statistics.score);
  const avrgTempArray = useSelector((state) => state.statistics.temp);
  const avrgTempNightTrigger = useSelector((state) => state.statistics.avrgTempNight)

  const [durationInHours, setDurationInHours] = useState([]);
  const [todaysHours, setTodaysHours] = useState();
  const [todaysScore, setTodaysScore] = useState();
  const[yesterdaysHours, setYesterdaysHours] = useState();
  const[differenceInSleep, setDifferenceInSleep] = useState();
  const[avrgTemp, setAvrgTemp] = useState();
  const[avrgHum, setAvrgHum] = useState();
  const [timeAfterAlarm, setTimeAfterAlarm] = useState();
  const[avrgTempNight, setAvrgTempNight] = useState();



  useEffect(() => {
    dispatch(getAvailableUsers());
    dispatch(getTemp());
    dispatch(getAccuracy());
    dispatch(getScore());
    dispatch(getAvrgTemp());
    dispatch(getAvrgTempNight());
  }, [dispatch]);

//setavrgTemp(avrgTemp[0].room_temperature)


 
useEffect(() => {
  console.log("Accuracy updated:", avrgTempArray);
  if (Array.isArray(avrgTempArray) && avrgTempArray.length > 0) {
    setAvrgTemp(parseFloat(avrgTempArray[0].room_temperature).toFixed(2))
    setAvrgHum(parseFloat(avrgTempArray[0].room_humidity).toFixed(2))
  } else return;
}, [temp]);


  useEffect(() => {
    console.log("Accuracy updated:", accuracy);
    if (Array.isArray(accuracy) && accuracy.length > 0) {
      console.log("Temp has data, calling getSleepingHours...");
      getSleepingHours();
      differenceInHours();
    calculateTimeafterAlarm();
    } else return;
  }, [accuracy]);


  useEffect(() => {
    console.log("Score updated:", score);
    if (Array.isArray(score) && score.length > 0) {
      console.log("Score has data, calling getTodaysScore...");
      getTodaysScore();
    } else return;
  }, [score]);


  useEffect(() => {
    console.log("avrgTempArray updated:", avrgTempArray);
    if (Array.isArray(avrgTempArray) && avrgTempArray.length > 0) {
      setAvrgTemp(parseFloat(avrgTempArray[0].room_temperature).toFixed(1));
      setAvrgHum(parseFloat(avrgTempArray[0].room_humidity).toFixed(0));
    } else {
      console.log("avrgTempArray is not ready or empty:", avrgTempArray);
    }
  }, [avrgTempArray]);

  useEffect(() => {
    setAvrgTempNight(parseFloat(avrgTempNightTrigger).toFixed(1));
    
  },[avrgTempNightTrigger]);


  function calculateTimeafterAlarm() {
    if (!accuracy || !Array.isArray(accuracy)) {
      console.log("Accuracy is not ready");
      return;
    }
  
    accuracy.map((item) => {
      const alarm = new Date(item.planned_end);
      const out = new Date(item.actual_end);
      const today = new Date();     
      console.log("Out", out.getTime());
      console.log("Alarm", today.getTime());

      if(alarm.getDate() == today.getDate() ){

    const differenceInMilliseconds = (out.getTime() - alarm.getTime());
  
    const differenceInHours = differenceInMilliseconds / (1000 * 60);
  
    setTimeAfterAlarm(differenceInHours); 
    return;
      }

    })
    // const alarm = new Date(accuracy[0].planned_end);
    // const out = new Date(accuracy[0].actual_end);     
    // console.log("Out", out);
    // console.log("Alarm", alarm);
  
   
    // console.log("Time after alarm (hours):", differenceInHours);
  }

  function getTodaysScore() {
    if (!score || !Array.isArray(score)) {
      console.log("Accuracy is not ready");
      return;
    }
    const length = score.length;

    setTodaysScore(score[length - 1].score);
    console.log("TODAYS SCORE: ", todaysScore);
  }

  function getSleepingHours() {
    if (!accuracy || !Array.isArray(accuracy)) {
      console.log("Accuracy is not ready");
      return;
    }

    const durations = accuracy.map((item) => {
      const start = new Date(item.actual_start);
      const end = new Date(item.actual_end);

      const durationInMilliseconds = end - start;
      const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

      console.log(
        `Duration of sleep for ID ${item.id}:`,
        durationInHours,
        "hours"
      );
      return durationInHours;
    });

  
    setDurationInHours(durations);
    console.log(durations);
    const length = durations.length;
    setTodaysHours(durations[length - 1]);
    setYesterdaysHours(durations[length-2]);
    console.log("TODAY: ", todaysHours);
  }

  function differenceInHours (){
    if (!accuracy || !Array.isArray(accuracy)) {
      console.log("Accuracy is not ready");
      return;
    }
    console.log("YESTERDAYS: ", yesterdaysHours);
    console.log("TODAYS: ", todaysHours);
    const diff = ( yesterdaysHours - todaysHours).toFixed(1);
    console.log("TIME", diff);

    setDifferenceInSleep(diff);
    console.log("Difference in hours: ", differenceInSleep)
  }

  const setUserNotesACB = (user_notes) => {
    if (!accuracy || !Array.isArray(accuracy)) {
      console.log("Accuracy is not ready");
      return;
    }
    dispatch(setUserNotes({user_note: user_notes}));
  }

  function closeSummaryACB(){
    props.closeSummary();
  }

  return (
    <SummaryView
    name={username}
    temp={temp}
    durations={durationInHours}
    todaysHours={todaysHours}
    todaysScore={todaysScore}
    setUserNotes={setUserNotesACB} 
    yesterdaysHours={yesterdaysHours}
    differenceInSleep={differenceInSleep}
    avrgTemp={avrgTemp}
    avrgHum={avrgHum}
    timeAfterAlarm={timeAfterAlarm}
    closeSummary={closeSummaryACB}
    avrgTempNight={avrgTempNight}
  />
  );
}
