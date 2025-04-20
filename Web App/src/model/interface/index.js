import { createSlice } from "@reduxjs/toolkit";
import { authInitialState, authenticateUserBuilder, logoutReducer } from "./authentication";
import { navigationInitialState, changeTabReducer } from "./navigation";
import { alarmInitialState, setHoursReducer, setWakeUpReducer } from "./alarm";
import { recordingsInitialState, toggleFavoriteReducer, togglePlayReducer } from "./recordings";


const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		...authInitialState,
		...navigationInitialState,
		...alarmInitialState,
		...recordingsInitialState,
	},
	reducers: {
		logoutUser: logoutReducer,
		changeTab: changeTabReducer,
		setHoursOfSleep: setHoursReducer,
		setWakeUpTime: setWakeUpReducer,
		toggleFavorite: toggleFavoriteReducer,
		togglePlay: togglePlayReducer,
	},
	extraReducers: (builder) => {
		authenticateUserBuilder(builder);
	},
});

export const { logoutUser, changeTab, setHoursOfSleep, setWakeUpTime, toggleFavorite, togglePlay } = interfaceSlice.actions;

export default interfaceSlice.reducer;
