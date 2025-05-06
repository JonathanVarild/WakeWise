import { createReduxModule } from "../ReduxHelpers";

const module = createReduxModule("routine", {
  max_time_in_bed: 1,
  must_be_in_bed_time: 1,
});
export default module;

export const setMaxTimeInBed = module.addReducer(
  "setMaxTimeInBed",
  (state, action) => {
    state.max_time_in_bed = action.payload;
  }
);

export const setMustBeInBedTime = module.addReducer(
  "setMustBeInBedTime",
  (state, action) => {
    state.must_be_in_bed_time = action.payload;
  }
);

export const getRoutineSettings = module.addFetcher(
  "getRoutineSettings",
  "/api/settings/getroutines",
  {
    onSuccess: (state, action) => {
      state.max_time_in_bed = action.payload.max_time_in_bed;
      state.must_be_in_bed_time = action.payload.must_be_in_bed_time;
    },
  }
);

export const setRoutineSettings = module.addFetcher(
  "setRoutineSettings",
  "/api/settings/setroutines"
);
