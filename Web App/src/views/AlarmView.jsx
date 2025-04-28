import { Minus, Plus } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function AlarmView(props) {
	function decreaseSleepACB() {
		console.log("UPDATED: " + props.hoursOfSleep);
		props.decreaseSleep();
	}

	function increaseSleepACB() {
		console.log("UPDATED: " + props.hoursOfSleep);
		props.increaseSleep();
	}

	function handleTimeChangeACB(newValue) {
		props.handleTimeChange(newValue);
	}

	function saveAlarmACB() {
		console.log("HOURS OF SLEEP: " + props.hoursOfSleep);
		console.log("ALARM TIME: " + props.wakeUpTime);
		console.log("BEDTIME: " + props.bedtime);
		props.saveAlarmData();
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div>
				<div className="bg-white h-screen justify-center text-center relative">
					<div className=" text-4xl mb-2">Set up sleep schedule</div>
					<div className=" pt-2 text-xl">
						You need to go to bed at:
						<div className="py-6">{props.bedtime}</div>
					</div>
					<div className=" flex flex-col items-center text-center gap-4 ">
						<div className="text-xl">Choose hours of sleep</div>

						<div className="flex flex-row  ">
							<Button className="py-6 px-6" onClick={decreaseSleepACB} disabled={props.hoursOfSleep == 0}>
								<Minus />
							</Button>
							<Input
								className="text-center py-6 px-10 mx-4 "
								type="number"
								value={props.hoursOfSleep || ""}
								onChange={(event) => props.handleInputChange(event.target.value)}
							/>
							<Button className="py-6 px-6" onClick={increaseSleepACB} disabled={props.hoursOfSleep == 20}>
								<Plus />
							</Button>
						</div>
						{props.errorMessage && <div className="text-red-500 text-sm mt-2">{props.errorMessage}</div>}
					</div>
					<div className="flex flex-col items-center text-center ">
						<h2 className="m-4">Choose wake up time</h2>
						<MobileTimePicker value={dayjs(`2023-01-01T${props.wakeUpTime || "07:00"}`)} onChange={handleTimeChangeACB} />
					</div>
					<div className="pt-4  ">
						<Button onClick={saveAlarmACB} className="h-12">
							Set alarm
						</Button>
					</div>
                    {props.alarmErrorMessage && <div className="text-red-500 text-sm mt-2">{props.alarmErrorMessage}</div>}
				</div>
			</div>
		</LocalizationProvider>
	);
}

export default AlarmView;
