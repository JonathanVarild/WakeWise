import { createSlice } from "@reduxjs/toolkit";

import { authInitialState, authenticateUserBuilder, logoutReducer } from "./authentication";
import { alarmInitialState, setHoursReducer, setWakeUpReducer } from "./alarm";


const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		...authInitialState,
		...alarmInitialState
	},
	reducers: {
		logoutUser: logoutReducer,
		setHoursOfSleep: setHoursReducer,
		setWakeUpTime: setWakeUpReducer,
	},
	extraReducers: (builder) => {
		authenticateUserBuilder(builder);
	},
});

export const { logoutUser, setHoursOfSleep, setWakeUpTime } = interfaceSlice.actions;

export default interfaceSlice.reducer;
