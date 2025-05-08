import { createReduxModule } from "../ReduxHelpers";

const module = createReduxModule("statistics", {
  accuracy: [],
  temp: [],
  phoneUsage: [],
  score: 0,
  sleepReg: [],
});

export default module;

export const getAccuracy = module.addFetcher(
  "/getAccuracy",
  "/api/stats/getAccuracy",
  {
    onSuccess: async (state, action) => {
      state.accuracy = action.payload.accuracy;
      state.accuracy.forEach((item) => {
        console.log("Planned Start:", item.planned_start);
      });
      console.log("Accuracy statistics fetched ", state.accuracy);
    },
  }
);

export const getTemp = module.addFetcher("/getTemp", "/api/stats/getTemp", {
  onSuccess: async (state, action) => {
    state.temp = action.payload.temp.map((item) => ({
      room_temperature: item.average_temperature,
      room_humidity: item.average_humidity,
    }));
  },
});

export const getPhoneData = module.addFetcher(
  "/getPhoneData",
  "/api/stats/getPhoneData",
  {
    onSuccess: async (state, action) => {
      state.phone_usage = action.payload.phone_usage;
      let i = 0;
      state.phone_usage.forEach((item) => {
        console.log("Phone usage:", i, item.phone_usage);
      });
      console.log("Phone usage fetched ", state.phone_usage);
    },
  }
);

export const getScore = module.addFetcher(
  "/getScoreData",
  "/api/stats/getScoreData",
  {
    onSuccess: async (state, action) => {
      state.score = action.payload.score;
    },
  }
);

export const getSleepReg = module.addFetcher(
  "/getSleepData",
  "/api/stats/getSleepData",
  {
    onSuccess: async (state, action) => {
      state.sleepReg = action.payload.sleepReg.map((item) => ({
        sleep_start: item.avg_actual_start,
        sleep_end: item.avg_actual_end,
      }));
    },
  }
);

export const setDate = module.add;
