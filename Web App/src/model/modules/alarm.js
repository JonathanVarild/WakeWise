import { createReduxModule } from "../ReduxHelpers";

// Create and export new Redux module.
const module = createReduxModule("alarm", {
	hoursOfSleep: 8,
	wakeUpTime: "06:00",
});
export default module;

// Create and export a reducer to change the state for hours of sleep.
export const setHoursOfSleep = module.addReducer("setHoursOfSleep", (state, action) => {
	state.hoursOfSleep = action.payload;
});

// Create and export a reducer to change the state for wake up time.
export const setWakeUpTime = module.addReducer("setWakeUpTime", (state, action) => {
	state.wakeUpTime = action.payload;
});

export const fetchAlarm = module.addFetcher("fetchAlarm", "/api/alarm/getAlarm", {
	onSuccess: async (state, action) => {
		state.hoursOfSleep = action.payload.alarmData.sleep_goal;
		state.wakeUpTime = action.payload.alarmData.wakeup_time;
	},
});

export const setAlarm = module.addFetcher("setAlarm", "/api/alarm/settingAlarm");
