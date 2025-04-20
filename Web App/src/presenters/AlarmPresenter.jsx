import { setHoursOfSleep, setWakeUpTime } from "../model/interface";
import AlarmView from "../views/AlarmView";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
//import { saveAlarm } from "../model/interface/alarm";

function AlarmPresenter() {
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const hoursOfSleep = useSelector((state) => state.interface.hoursOfSleep);
  const wakeUpTime = useSelector((state) => state.interface.wakeUpTime);

  const handleTimeChangeACB = (newValue) => {
    if (newValue) {
      const formattedTime = dayjs(newValue).format("HH:mm");
      dispatch(setWakeUpTime(formattedTime));
    }
  };

  const increaseSleepACB = () => {
    dispatch(setHoursOfSleep(hoursOfSleep + 0.5));
  };

  const decreaseSleepACB = () => {
    dispatch(setHoursOfSleep(hoursOfSleep - 0.5));
  };

  const handleInputChangeACB = (inputValue) => {
    console.log("Received inputValue:", inputValue);

    if (inputValue === "") {
      dispatch(setHoursOfSleep(""));
      return;
    }

    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 20) {
      dispatch(setHoursOfSleep(numericValue)); 
      setErrorMessage("");
    }
    if (numericValue < 0) {
      setErrorMessage("Sleeping hours can't be negative");
    }
    if (numericValue > 20) {
      dispatch(setHoursOfSleep(""))
      setErrorMessage("Sleeping hours can't be over 20 hours");

    }
  };

  const saveAlarmData = (state) => {
    const savedWakeUpTime = wakeUpTime;
    const savedHoursOfSleep = hoursOfSleep;
    const savedBedtime = bedtime;
    console.log(savedWakeUpTime);
    console.log(savedHoursOfSleep);
    console.log(savedBedtime);
    //state.interface.saveAlarm();
  };

  const bedtime = dayjs(`2023-01-01T${wakeUpTime || "07:00"}`)
    .subtract(hoursOfSleep, "hour")
    .format("HH:mm");

  return (
    <AlarmView
      bedtime={bedtime}
      hoursOfSleep={hoursOfSleep}
      wakeUpTime={wakeUpTime}
      handleTimeChange={handleTimeChangeACB}
      increaseSleep={increaseSleepACB}
      decreaseSleep={decreaseSleepACB}
      handleInputChange={handleInputChangeACB}
      errorMessage={errorMessage}
      saveAlarmData={saveAlarmData}
      //numericValue={numericValue}
      //inputValue={inputValue}
      //formattedTime={formattedTime}
      //dispatch={dispatch}
    />
  );
}

export default AlarmPresenter;
