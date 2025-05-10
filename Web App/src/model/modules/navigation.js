import { createReduxModule } from "../ReduxHelpers";

// Constants to identify the tabs.
export const TAB_ALARM = 0;
export const TAB_STATISTICS = 1;
export const TAB_RECORDINGS = 2;
export const TAB_SETTINGS = 3;

// The initial state of the navigation.
export const SUBTAB_LIGHTSETTINGS = 0;
export const SUBTAB_SOUNDSETTINGS = 1;
export const SUBTAB_CONFIGURATION = 21;
export const SUBTAB_USERS = 22;
export const SUBTAB_NOTIFICATIONS = 23;
export const SUBTAB_DISPLAY = 31;
export const SUBTAB_MIC = 32;
export const SUBTAB_SCREENTIME = 41;
export const SUBTAB_ROUTINES = 42;

export const SUBTAB_STATISTICS = 4; 
export const SUBTAB_STATISTICS_SCREEN = 5;

// Create and export a Redux module for the navigation.
const module = createReduxModule("navigation", {
	navigationTab: TAB_ALARM,
	settingsSubTab: null,
	statisticsSubtab: SUBTAB_STATISTICS
});
export default module;

// Create and export a reducer to change the state for the active tab.
export const changeTab = module.addReducer("changeTab", (state, action) => {
  state.navigationTab = action.payload;
	

});

export const changeStatisticsTab = module.addReducer("changeStatisticsTab", (state, action) => {
	state.statisticsSubtab = action.payload;
});

 

export const changeSubTab = module.addReducer("changeSubTab", (state, action) => {
	state.settingsSubTab = action.payload;
});
