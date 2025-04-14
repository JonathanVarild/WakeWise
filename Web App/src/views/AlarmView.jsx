import { Minus, Plus } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHoursOfSleep, setWakeUpTime } from "../model/alarmSlice";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function AlarmView() {
  const dispatch = useDispatch();

  const hoursOfSleep = useSelector((state) => state.alarm.hoursOfSleep);
  const wakeUpTime = useSelector((state) => state.alarm.wakeUpTime);

  const handleTimeChange = (newValue) => {
    if (newValue) {
      const formattedTime = dayjs(newValue).format("HH:mm");
      dispatch(setWakeUpTime(formattedTime));
    }
  };

  const increaseSleep = () => {
    dispatch(setHoursOfSleep(hoursOfSleep + 0.5));
  };

 
  const decreaseSleep = () => {
    dispatch(setHoursOfSleep(hoursOfSleep - 0.5));
  };

const handleInputChange = (e) => {
  const inputValue = e.target.value;
  
  if (inputValue === "") {
    dispatch(setHoursOfSleep("")); 
    return;
  }
    
  const numericValue = parseFloat(inputValue);

   if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 23) {
      dispatch(setHoursOfSleep(numericValue)); 
    }
    else{
      dispatch(setHoursOfSleep("Sleep limit is 20 hours"))
    }
  }

  const bedTime = dayjs(`2023-01-01T${wakeUpTime || "07:00"}`)
  .subtract(hoursOfSleep, "hour")
  .format("HH:mm");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-white h-screen flex flex-col items-center justify-center relative">
        <div className="absolute top-[10%] text-4xl text-center">
          Set up sleep schedule
        </div>
        <div className="absolute top-[25%] text-xl text-center">
          You need to go to bed at:
          <div className="py-6" >{bedTime}</div>
          
          </div>

        <div className="absolute top-[45%] flex flex-col items-center text-center gap-4 ">
          <div className="text-xl">Choose hours of sleep</div>
    
          <div className="flex flex-row items-center ">
            <Button className="py-6 px-6" onClick={decreaseSleep} disabled={hoursOfSleep==0} >
              <Minus />
            </Button>
            <Input
              className="text-center py-6 px-10 mx-4 "
              type="number"
              value={hoursOfSleep}
              onChange={handleInputChange}
            />
            <Button className="py-6 px-6" onClick={increaseSleep} disabled={hoursOfSleep==20}>
              <Plus />
            </Button>
          </div>
        </div>
    
        {/* MobileTimePicker */}
        <div className="flex flex-col items-center text-center absolute bottom-[25%]">
          <h2 className="mb-4">Choose wake up time</h2>
          <MobileTimePicker
            value={dayjs(`2023-01-01T${wakeUpTime || "07:00"}`)}
            onChange={handleTimeChange}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default AlarmView;