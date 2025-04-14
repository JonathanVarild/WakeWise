import { Minus, Plus } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHoursOfSleep, setWakeUpTime } from "../model/alarmSlice"; // Importera Redux actions
import { TimePicker } from "react-ios-time-picker";


function AlarmView() {
  const dispatch = useDispatch();

  // Hämta värden från Redux state
  const hoursOfSleep = useSelector((state) => state.alarm.hoursOfSleep);
  const wakeUpTime = useSelector((state) => state.alarm.wakeUpTime);

  // Hantera ändring av väckningstid
  const handleTimeChange = (timeValue) => {
    dispatch(setWakeUpTime(timeValue)); // Uppdatera Redux state med ny tid
  };

  // Funktion för att öka timmar
  const increaseSleep = () => {
    dispatch(setHoursOfSleep(hoursOfSleep + 0.5)); // Öka med 0.5 timmar
  };

  // Funktion för att minska timmar
  const decreaseSleep = () => {
    dispatch(setHoursOfSleep(hoursOfSleep - 0.5)); // Minska med 0.5 timmar
  };

  // Funktion för att hantera direkt inmatning i input-fältet
  const handleInputChange = (e) => {
    const inputValue = parseFloat(e.target.value); // Konvertera till ett flyttal
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 12) {
      dispatch(setHoursOfSleep(inputValue)); // Uppdatera Redux state
    }
  };

  const handleTimePickerFocus = () => {
    document.body.style.overflow = "hidden"; // Inaktivera sidans scrollning
  };
  
  const handleTimePickerBlur = () => {
    document.body.style.overflow = "auto"; // Återställ sidans scrollning
  };

  return (
    <div className="bg-blue-950 h-screen flex flex-col items-center justify-center relative">
      <div className="absolute top-[15%] text-4xl text-center">
        Set up sleep schedule
      </div>
  
      <div className="absolute top-[32%] flex flex-col items-center text-center gap-4 ">
        <div className="text-xl">Choose hours of sleep</div>
  
        <div className="flex flex-row items-center ">
          <Button onClick={decreaseSleep}>
            <Minus />
          </Button>
          <Input
            className="text-center py-8 "
            type="number"
            value={hoursOfSleep} // Koppla värdet till Redux state
            onChange={handleInputChange} // Uppdatera Redux state vid inmatning
          />
          <Button onClick={increaseSleep}>
            <Plus />
          </Button>
        </div>
      </div>
  
      {/* TimePicker */}
      <div className="flex flex-col items-center text-center mt-[30%]">
        <h2 className="mb-4">Choose wake up time</h2>
        <TimePicker
          onChange={handleTimeChange} // Uppdatera Redux state vid ändring
          value={wakeUpTime} // Visa värdet från Redux state
          use12Hours={false}
          cellHeight={40}
          className="time-wheel"
          placeHolder="Choose wake up time"
          cancelButtonText="Cancel"
          saveButtonText="Save"
          onFocus={handleTimePickerFocus} // Inaktivera scrollning
          onBlur={handleTimePickerBlur}
        />
      </div>
    </div>
  );
}

export default AlarmView;