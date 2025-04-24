import { setHoursOfSleep, setWakeUpTime } from "../model/interface";
import AlarmView from "../views/AlarmView";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";

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

        // Sätter en tom sträng. Detta görs för att värdet ska uppdateras på skärmen, kommer inte gå att sparas om den är tom men annars visas det gamla värdet.
		if (inputValue === "") {
			dispatch(setHoursOfSleep(""));
			return;
		}

		const numericValue = parseFloat(inputValue);
		if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 20) {
			dispatch(setHoursOfSleep(numericValue));
			setErrorMessage("");
		}
		else if (numericValue < 0) {
            dispatch(setHoursOfSleep(numericValue));
			setErrorMessage("Sleeping hours can't be negative");
		}
		else if (numericValue > 20) {
			dispatch(setHoursOfSleep(numericValue));
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
		/>
	);
}

export default AlarmPresenter;
