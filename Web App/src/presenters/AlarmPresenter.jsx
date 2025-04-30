import PageView from "../views/PageView";
import AlarmView from "../views/AlarmView";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { setAlarm } from "../model/interface/alarm";
import { fetchAlarm } from "../model/interface/alarm"; // Importera fetchAlarm

function AlarmPresenter() {
  const [errorMessage, setErrorMessage] = useState("");
  const [alarmErrorMessage, setAlarmErrorMessage] = useState("");

	const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlarm());
  }, [dispatch]);

	const handleTimeChangeACB = (newValue) => {
		if (newValue) {
			const formattedTime = dayjs(newValue).format("HH:mm");
			dispatch(setWakeUpTime(formattedTime));
		}
	};

  const increaseSleepACB = () => {
    dispatch(setHoursOfSleep(hoursOfSleep + 0.5));
    setAlarmErrorMessage("");
  };

  const decreaseSleepACB = () => {
    dispatch(setHoursOfSleep(hoursOfSleep - 0.5));
    setAlarmErrorMessage("");
  };

  const handleInputChangeACB = (inputValue) => {
    console.log("Received inputValue:", inputValue);
    setAlarmErrorMessage("");

    // Sätter en tom sträng. Detta görs för att värdet ska uppdateras på skärmen, kommer inte gå att sparas om den är tom men annars visas det gamla värdet.
    if (inputValue === "") {
      dispatch(setHoursOfSleep(null));
      return;
    }

    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 20) {
      dispatch(setHoursOfSleep(numericValue));
      setErrorMessage("");
    } else if (numericValue < 0) {
      dispatch(setHoursOfSleep(numericValue));
      setErrorMessage("Sleeping hours can't be negative");
    } else if (numericValue > 20) {
      dispatch(setHoursOfSleep(numericValue));
      setErrorMessage("Sleeping hours can't be over 20 hours");
    }
  };

  const saveAlarmData = (state) => {
    const savedWakeUpTime = wakeUpTime;
    const savedHoursOfSleep = hoursOfSleep;
    const savedBedtime = bedtime;
    if (
      savedWakeUpTime != null &&
      savedHoursOfSleep != null &&
      savedBedtime != null
    ) {
      console.log("Saved WakeupTime: " + savedWakeUpTime);
      console.log("Saved hours of sleep: " + savedHoursOfSleep);
      console.log(savedBedtime);
      dispatch(
        setAlarm({
          wakeup_time: savedWakeUpTime,
          sleep_goal: savedHoursOfSleep,
        })
      );
      //state.interface.saveAlarm();
    } else {
      console.log("Alarm input is missing");
      setAlarmErrorMessage("Alarm input is missing");
    }
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
      alarmErrorMessage={alarmErrorMessage}
      saveAlarmData={saveAlarmData}
    />
  );
}

export default AlarmPresenter;
