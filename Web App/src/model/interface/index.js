import { createSlice } from "@reduxjs/toolkit";
import { authInitialState, authenticateUserBuilder, logoutReducer } from "./authentication";
import { navigationInitialState, changeTabReducer, changeSettingSubTabReducer } from "./navigation";
import { alarmInitialState, setHoursReducer, setWakeUpReducer } from "./alarm";


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
        changeSettingSubTab: changeSettingSubTabReducer,
        setHoursOfSleep: setHoursReducer,
        setWakeUpTime: setWakeUpReducer,
    },
    extraReducers: (builder) => {
        authenticateUserBuilder(builder);
    },
});

export const { logoutUser, changeTab, setHoursOfSleep, setWakeUpTime, changeSettingSubTab } = interfaceSlice.actions;

export default interfaceSlice.reducer;
