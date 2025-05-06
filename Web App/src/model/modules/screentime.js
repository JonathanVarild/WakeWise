import { createReduxModule } from "../ReduxHelpers";

const module = createReduxModule("screentime", {
  pre_sleep_min: 0,
  post_sleep_min: 0,
  alertType: "notificaton",
});
export default module;

export const setAlertType = module.addReducer(
  "setAlertType",
  (state, action) => {
    state.alertType = action.payload;
  }
);

export const setPreSleep = module.addReducer("setPreSleep", (state, action) => {
  state.pre_sleep_min = action.payload;
});

export const setPostSleep = module.addReducer(
  "setPostSleep",
  (state, action) => {
    state.post_sleep_min = action.payload;
  }
);

export const getScreentimeSettings = module.addFetcher(
  "getScreentimeSettings",
  "/api/settings/getscreentime",
  {
    onSuccess: (state, action) => {
      state.pre_sleep_min = action.payload.pre_sleep_min;
      state.post_sleep_min = action.payload.post_sleep_min;
      state.alertType = action.payload.alertType;
    },
  }
);

export const setScreentimeSettings = module.addFetcher(
  "setScreentimeSettings",
  "/api/settings/setscreentime"
);
