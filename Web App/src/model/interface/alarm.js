import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "../utilities";

export const alarmInitialState = {
  hoursOfSleep: 8,
  wakeUpTime: "06:00",
  settingAlarm: {
    status: "idle",
    requestId: null,
    error: null,
    userInfo: null,
  },
};


//const apiUrl = "http://localhost:3000";

const apiUrl = import.meta.env.VITE_API_URL;

async function setAlarmCB(payload, { getState, abort, requestId }) {
  const state = getState().interface;
 


  if (state.settingAlarm.requestId !== requestId)
    return abort("Request already in progress.");


  return await fetch(apiUrl + "/api/alarm/settingAlarm", {
    method: "PUT",
    body: JSON.stringify({
      wakeup_time: state.wakeUpTime,
      sleep_goal: state.hoursOfSleep,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(fetchResolvedCB);
}

async function fetchAlarmCB() {
  try {
    const response = await fetch(apiUrl + "/api/alarm/getAlarm", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch alarm: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching alarm:", error.message);
    throw error;
  }
}

const setHoursReducer = (state, action) => {
  state.hoursOfSleep = action.payload;
};
const setWakeUpReducer = (state, action) => {
  state.wakeUpTime = action.payload;
};

export const setAlarm = createAsyncThunk("interface/setAlarm", setAlarmCB);

export const fetchAlarm = createAsyncThunk("interface/fetchAlarm", fetchAlarmCB);

export function setAlarmBuilder(builder) {
  builder
    .addCase(setAlarm.pending, (state, action) => {
      if (state.settingAlarm.requestId === null) {
        state.settingAlarm.status = "loading";
        state.settingAlarm.requestId = action.meta.requestId;
      }
    })
    .addCase(setAlarm.fulfilled, (state, action) => {
      if (state.settingAlarm.requestId === action.meta.requestId) {
        state.settingAlarm.status = "idle";
        state.settingAlarm.requestId = null;

        state.authenticatedAs = action.payload.username;
      }
    })
    .addCase(setAlarm.rejected, (state, action) => {
      if (state.settingAlarm.requestId === action.meta.requestId) {
        state.settingAlarm.status = "failed";
        state.settingAlarm.requestId = null;
        state.settingAlarm.error = action.error.message;
      }
    });
}

export function fetchAlarmBuilder(builder) {
  builder
    .addCase(fetchAlarm.pending, (state) => {
      state.settingAlarm.status = "loading"; 
    })
    .addCase(fetchAlarm.fulfilled, (state, action) => {
     
      state.hoursOfSleep = action.payload.alarmData.sleep_goal;
      state.wakeUpTime = action.payload.alarmData.wakeup_time;
      state.settingAlarm.status = "idle"; 
    })
    .addCase(fetchAlarm.rejected, (state, action) => {
      state.settingAlarm.status = "failed"; 
      state.settingAlarm.error = action.error.message;
      console.error("Failed to fetch alarm:", action.error.message);
    });
}

export { setHoursReducer, setWakeUpReducer };
