import PageView from "../views/PageView";
import AlarmView from "../views/AlarmView";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useState } from "react";
import { setHoursOfSleep, setWakeUpTime } from "../model/modules/alarm";

function AlarmPresenter() {
	const [errorMessage, setErrorMessage] = useState("");

	const dispatch = useDispatch();

	const hoursOfSleep = useSelector((state) => state.alarm.hoursOfSleep);
	const wakeUpTime = useSelector((state) => state.alarm.wakeUpTime);

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
			dispatch(setHoursOfSleep("")); // Sätt till tomt om input är tomt
			return;
		}

		const numericValue = parseFloat(inputValue);
		if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 20) {
			dispatch(setHoursOfSleep(numericValue)); // Uppdatera Redux state
			setErrorMessage("");
		} else {
			setErrorMessage("Value can't exceed 20 hours");
		}
	};

	const bedTime = dayjs(`2023-01-01T${wakeUpTime || "07:00"}`)
		.subtract(hoursOfSleep, "hour")
		.format("HH:mm");

	return (
		<PageView title="Alarm">
			<AlarmView
				bedTime={bedTime}
				hoursOfSleep={hoursOfSleep}
				wakeUpTime={wakeUpTime}
				handleTimeChange={handleTimeChangeACB}
				increaseSleep={increaseSleepACB}
				decreaseSleep={decreaseSleepACB}
				handleInputChange={handleInputChangeACB}
				errorMessage={errorMessage}
				//numericValue={numericValue}
				//inputValue={inputValue}
				//formattedTime={formattedTime}
				//dispatch={dispatch}
			/>
		</PageView>
	);
}

export default AlarmPresenter;
