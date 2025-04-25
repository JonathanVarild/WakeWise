import { createAsyncThunk } from "@reduxjs/toolkit";


export const alarmInitialState = {
    hoursOfSleep: 8,
    wakeUpTime : "06:00", 
    settingAlarm: {
      status: "idle",
      requestId: null,
      error: null,
      userInfo: null,
},
}

async function setAlarmCB(payload, { getState, abort, requestId }) {
	const state = getState().interface;
	if (state.authenticateRequest.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/alarm/setAlarm", {
		method: "POST",
		body: JSON.stringify({
			wakeUpTime: payload.wakeUpTime,
			hoursOfSleep: payload.hoursOfSleep,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
}



const setHoursReducer = (state, action) => {
      state.hoursOfSleep = action.payload; 
}
 const setWakeUpReducer =  (state, action) => {
      state.wakeUpTime = action.payload;
}

export const setAlarm = createAsyncThunk("interface/setAlarm", setAlarmCB);

export function authenticateUserBuilder(builder) {
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

export {setHoursReducer,setWakeUpReducer}

