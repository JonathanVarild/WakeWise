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

// Reducer to navigate to a new page.
export const navigationInitialState = {
    navigationTab: TAB_ALARM,
    settingsSubTab: null,
};

export const changeTabReducer = (state, action) => {
    state.navigationTab = action.payload;
}

export const changeSettingSubTabReducer = (state, action) => {
    state.settingsSubTab = action.payload;
}