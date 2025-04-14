import { createSlice } from "@reduxjs/toolkit";

const alarmSlice = createSlice({
  name: "alarm",
  initialState: {
    hoursOfSleep: 8, 
    wakeUpTime: "06:00", 
  },
  reducers: {
    setHoursOfSleep: (state, action) => {
      state.hoursOfSleep = action.payload; 
    },
    setWakeUpTime: (state, action) => {
      state.wakeUpTime = action.payload;
    },
  },
});

export const { setHoursOfSleep, setWakeUpTime } = alarmSlice.actions; 
export default alarmSlice.reducer; 