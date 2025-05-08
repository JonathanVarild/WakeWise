import { createReduxModule } from "../ReduxHelpers";

// Constants to identify the tabs.
export const TAB_ALARM = 0;
export const TAB_STATISTICS = 1;
export const TAB_RECORDINGS = 2;
export const TAB_SETTINGS = 3;
export const SUBTAB_STATISTICS = 4; 
export const SUBTAB_STATISTICS_SCREEN = 5;

// Create and export a Redux module for the navigation.
const module = createReduxModule("navigation", {
	navigationTab: TAB_ALARM,
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

 
