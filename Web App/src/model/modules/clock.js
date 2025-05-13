import { createReduxModule } from "../ReduxHelpers";

const module = createReduxModule("clock", {
  clockName: "",
  username: "",
  userPassword: "",
});

export default module;

export const setClockName = module.addReducer(
  "setClockName",
  (state, action) => {
    state.clockName = action.payload;
  }
);

export const setUsername = module.addReducer("setUsername", (state, action) => {
  state.username = action.payload;
});

export const setUserPassword = module.addReducer(
  "setPassword",
  (state, action) => {
    state.userPassword = action.payload;
  }
);

export const setClockSettings = module.addFetcher(
  "setClockSettings",
  "/api/clock/setClockSettings"
);

export const checkUserNumber = module.addFetcher(
  "checkUserNumber",
  "api/clock/checkUserNumber"
);
