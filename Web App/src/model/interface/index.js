import { createSlice } from "@reduxjs/toolkit";

import { authInitialState, authenticateUserBuilder, logoutReducer } from "./authentication";

const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		...authInitialState,
	},
	reducers: {
		logoutUser: logoutReducer,
	},
	extraReducers: (builder) => {
		authenticateUserBuilder(builder);
	},
});

export const { logoutUser } = interfaceSlice.actions;

export default interfaceSlice.reducer;
