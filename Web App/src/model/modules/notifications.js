import { createReduxModule } from "../ReduxHelpers";

const initialState = {
  preferences: {
    not_in_bed: false,
    time_to_sleep: false,
    put_away_phone: false,
    get_up: false
  },
  loading: false
};

const module = createReduxModule("notifications", initialState);

export const getPreferences = module.addFetcher(
  "getPreferences",
  "/api/notification/getPreferences",
  {
    onSuccess: (state, action) => {
      state.preferences = action.payload.preferences;
    }
  }
);

export const updatePreferences = module.addFetcher(
  "updatePreferences",
  "/api/notification/updatePreferences",
  {
    onSuccess: (state, action) => {
      state.preferences = action.payload.preferences;
    }
  }
);

export default module;