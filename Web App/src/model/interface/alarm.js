

export const alarmInitialState = {
    hoursOfSleep: 8,
    wakeUpTime : "06:00", 
}


const setHoursReducer = (state, action) => {
      state.hoursOfSleep = action.payload; 
}
 const setWakeUpReducer =  (state, action) => {
      state.wakeUpTime = action.payload;
}

export {setHoursReducer,setWakeUpReducer}

