import { createReduxModule } from "../ReduxHelpers";

const module = createReduxModule("user", {
  username: "",
  userPassword: "",
  isAdmin: false,
});

export default module;

export const setUsername = module.addReducer("setUsername", (state, action) => {
  state.username = action.payload;
});

export const setUserPassword = module.addReducer(
  "setUserPassword",
  (state, action) => {
    state.userPassword = action.payload;
  }
);

export const setIsAdmin = module.addReducer("setIsAdmin", (state, action) => {
  state.isAdmin = action.payload;
});

export const setUserSettings = module.addFetcher(
  "setUserSettings",
  "/api/user/setUserSettings"
);

export const updatePassword = module.addFetcher(
  "updatePassword",
  "/api/user/updatePassword"
)
