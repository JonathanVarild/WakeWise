import { createSlice } from "@reduxjs/toolkit";
import { authInitialState, authenticateUserBuilder, logoutReducer } from "./authentication";
import { navigationInitialState, changeTabReducer } from "./navigation";

const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		...authInitialState,
		...navigationInitialState,
	},
	reducers: {
		logoutUser: logoutReducer,
		changeTab: changeTabReducer,
	},
	extraReducers: (builder) => {
		authenticateUserBuilder(builder);
	},
});

export const { logoutUser, changeTab } = interfaceSlice.actions;

export default interfaceSlice.reducer;
