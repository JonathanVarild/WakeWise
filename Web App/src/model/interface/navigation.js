// Constants to identify the tabs.
export const TAB_ALARM = 0;
export const TAB_STATISTICS = 1;
export const TAB_RECORDINGS = 2;
export const TAB_SETTINGS = 3;

// The initial state of the navigation.
export const navigationInitialState = {
    navigationTab: TAB_ALARM,
};

// Reducer to navigate to a new page.
export const changeTabReducer = (state, action) => {
    state.navigationTab = action.payload;
}