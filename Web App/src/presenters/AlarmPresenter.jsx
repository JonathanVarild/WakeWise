import PageView from "../views/PageView";
import AlarmView from "../views/AlarmView";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";
import { setAlarm, setHoursOfSleep, fetchAlarm, setWakeUpTime } from "../model/modules/alarm";

function AlarmPresenter() {
	const [errorMessage, setErrorMessage] = useState("");
	const [alarmErrorMessage, setAlarmErrorMessage] = useState("");

	const dispatch = useDispatch();
	const isFirstRun = useRef(true);

	const hoursOfSleep = useSelector((state) => state.alarm.hoursOfSleep);
	const wakeUpTime = useSelector((state) => state.alarm.wakeUpTime);

	useEffect(() => {
		dispatch(fetchAlarm());
	}, [dispatch]);

	// This fix for saving data is really ugly but will work for the demo.
	// TODO: Fix better saving.
	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}
		saveAlarmData();
	}, [hoursOfSleep, wakeUpTime]);

	const handleTimeChangeACB = (newValue) => {
		console.log("Time changed to:", newValue);

		if (newValue) {
			dispatch(setWakeUpTime(newValue));
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
		console.log("Saving alarm data...");

		const savedWakeUpTime = wakeUpTime;
		const savedHoursOfSleep = hoursOfSleep;
		const savedBedtime = bedtime;

		if (savedWakeUpTime != null && savedHoursOfSleep != null && savedBedtime != null) {
			console.log("Saved WakeupTime: " + savedWakeUpTime);
			console.log("Saved hours of sleep: " + savedHoursOfSleep);
			console.log(savedBedtime);
			dispatch(
				setAlarm({
					wakeup_time: savedWakeUpTime,
					sleep_goal: savedHoursOfSleep,
				})
			);
			//state.alarm.saveAlarm();
		} else {
			console.log("Alarm input is missing");
			setAlarmErrorMessage("Alarm input is missing");
		}
	};

	const bedtime = dayjs(`2023-01-01T${wakeUpTime || "07:00"}`)
		.subtract(hoursOfSleep, "hour")
		.format("HH:mm");

	return (
		<PageView title="Alarm">
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
		</PageView>
	);
}

export default AlarmPresenter;
