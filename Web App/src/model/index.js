import { createSlice } from "@reduxjs/toolkit";
import { authInitialState, authenticateUserBuilder, logoutReducer } from "./authentication";
import { navigationInitialState, changeTabReducer, changeSettingSubTabReducer } from "./navigation";
import { alarmInitialState, setHoursReducer, setWakeUpReducer } from "./alarm";
import {micInitialState,fetchMicBuilder,updateMicBuilder} from "./mic";
import {displayInitialState, fetchDisplayBuilder, updateDisplayBuilder} from "./display"; 

const interfaceSlice = createSlice({
    name: "interface",
    initialState: {
        ...authInitialState,
        ...navigationInitialState,
        ...alarmInitialState,
        ...micInitialState,
        ...displayInitialState 
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
        fetchMicBuilder(builder);
        updateMicBuilder(builder);
        fetchDisplayBuilder(builder); 
        updateDisplayBuilder(builder);
    },
});

export const { logoutUser, changeTab, setHoursOfSleep, setWakeUpTime, changeSettingSubTab,
  fetchDisplaySettings,updateDisplaySettings 
} = interfaceSlice.actions;

export default interfaceSlice.reducer;
