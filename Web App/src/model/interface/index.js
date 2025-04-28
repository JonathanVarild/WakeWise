import { createSlice } from "@reduxjs/toolkit";
import { authInitialState, authenticateUserBuilder, logoutReducer } from "./authentication";
import { navigationInitialState, changeTabReducer } from "./navigation";
import { alarmInitialState, fetchAlarmBuilder, setAlarmBuilder, setHoursReducer, setWakeUpReducer } from "./alarm";


const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		...authInitialState,
		...navigationInitialState,
		...alarmInitialState
	},
	reducers: {
		logoutUser: logoutReducer,
		changeTab: changeTabReducer,
		setHoursOfSleep: setHoursReducer,
		setWakeUpTime: setWakeUpReducer,
	},
	extraReducers: (builder) => {
		authenticateUserBuilder(builder);
		setAlarmBuilder(builder);
		fetchAlarmBuilder(builder);
	},
});

export const { logoutUser, changeTab, setHoursOfSleep, setWakeUpTime } = interfaceSlice.actions;

export default interfaceSlice.reducer;
