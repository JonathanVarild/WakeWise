import { Minus, Plus } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";

function AlarmView(props) {
  const [hoursOfSleep, setHoursOfSleep] = useState("8");

  function decreaseSleepACB() {
    console.log("UPDATED: " + props.hoursOfSleep);
    props.decreaseSleep();
  }

  function increaseSleepACB() {
    console.log("UPDATED: " + props.hoursOfSleep);

    props.increaseSleep();
  }

  function handleTimeChangeACB(event) {
    console.log("EVENT: " + event);
    console.log("Formatted: " + event.format("HH:mm"));

    props.handleTimeChange(event.format("HH:mm"));
  }

  function handleInputChangeACB(event) {
    console.log("EVENT: " + event.target.value);
    console.log("Hoursofsleep: " + props.hoursOfSleep);
    setHoursOfSleep(event.target.value);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="h-full flex flex-col  relative">

		<div className="text-center text-5xl my-8">Set your alarm</div>

        <div className="flex flex-col items-center text-xl text-center">
          <h2 className="mb-4">Choose wake up time</h2>
          <MobileTimePicker
            ampmInClock={false}
            ampm={false}
            value={dayjs(`2023-01-01T${props.wakeUpTime || "07:00"}`)}
            onAccept={handleTimeChangeACB}
			className="justify-center text-center"
          />
        </div>

        <div className=" flex flex-col items-center text-center gap-4 pt-8">
          <div className="text-xl">Choose hours of sleep</div>

          <div className="flex flex-row items-center ">
            <Button
              className="py-6 px-6"
              onClick={decreaseSleepACB}
              disabled={props.hoursOfSleep == 0}>
              <Minus />
            </Button>
            <Input
              className="text-center py-6 px-10 mx-4 "
              type="number"
              value={props.hoursOfSleep || ""}
              onChange={(event) => props.handleInputChange(event.target.value)}
            />
            <Button
              className="py-6 px-6"
              onClick={increaseSleepACB}
              disabled={props.hoursOfSleep == 20}>
              <Plus />
            </Button>
          </div>

          {props.errorMessage && (
            <div className="text-red-500 text-sm mt-2">
              {props.errorMessage}
            </div>
          )}
        </div>

        <div className=" text-xl text-center pt-8">
          You need to go to bed at:
          <div className="pt-2 font-semibold">{props.bedtime}</div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default AlarmView;
