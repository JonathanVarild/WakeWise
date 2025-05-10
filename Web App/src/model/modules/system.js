import { createReduxModule } from "../ReduxHelpers";


const module = createReduxModule("system", {
  settings: {
    time_zone: "Europe/Stockholm",
    theme: "light"
  },
  timezones: []
});

export default module;


export const setSettings = module.addReducer(
  "setSettings", 
  (state, action) => {
    state.settings = action.payload;
  }
);


export const getSettings = module.addFetcher(
  "getSettings",
  "/api/system/getSettings",
  {
    onSuccess: (state, action) => {
      state.settings = action.payload.settings;
      console.log("System settings loaded:", state.settings);
    }
  }
);

// updateTimezone action
export const updateTimezone = module.addFetcher(
  "updateTimezone",
  "/api/system/updateTimezone",
  {
    onSuccess: (state, action) => {
      state.settings.time_zone = action.payload.settings.time_zone;
      console.log("Timezone updated to:", state.settings.time_zone);
    }
  }
);

// updateTheme action
export const updateTheme = module.addFetcher(
  "updateTheme",
  "/api/system/updateTheme",
  {
    onSuccess: (state, action) => {
      state.settings.theme = action.payload.settings.theme;
      console.log("Theme updated to:", state.settings.theme);
    }
  }
);

// uppdateSettings action
export const getTimezones = module.addFetcher(
  "getTimezones",
  "/api/system/getTimezones",
  {
    onSuccess: (state, action) => {
      state.timezones = action.payload.timezones;
      console.log("Loaded timezones:", state.timezones.length);
    }
  }
);