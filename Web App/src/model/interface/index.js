import { createSlice } from "@reduxjs/toolkit";
import { authInitialState, authenticateUserBuilder, clearErrorsReducer, getAvailableUsersBuilder, logoutReducer, reauthenticateUserBuilder } from "./authentication";
import { navigationInitialState, changeTabReducer } from "./navigation";
import { alarmInitialState, setHoursReducer, setWakeUpReducer } from "./alarm";

const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		...authInitialState,
		...navigationInitialState,
		...alarmInitialState,
	},
	reducers: {
		logoutUser: logoutReducer,
		clearAuthErrors: clearErrorsReducer,
		changeTab: changeTabReducer,
		setHoursOfSleep: setHoursReducer,
		setWakeUpTime: setWakeUpReducer,
	},
	extraReducers: (builder) => {
		authenticateUserBuilder(builder);
		reauthenticateUserBuilder(builder);
		getAvailableUsersBuilder(builder);
	},
});

export const { logoutUser, clearAuthErrors, changeTab, setHoursOfSleep, setWakeUpTime } = interfaceSlice.actions;

export default interfaceSlice.reducer;
