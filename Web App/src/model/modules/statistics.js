import { createReduxModule } from "../ReduxHelpers";

const module = createReduxModule("statistics", {
  accuracy: [],
  temp: [],
  phoneUsage: [],
  screenTime: [], 
  score: 0,
  sleepReg: [],
  dreamNotes: [], 
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

export const getAvrgTemp = module.addFetcher("/getAvrgTemp", "/api/stats/getAvrgTemp", {
  onSuccess: async (state, action) => {
    state.temp = action.payload.temp.map((item) => ({
      room_temperature: item.average_temperature,
      room_humidity: item.average_humidity,
    }));
    console.log("TEMPER: ", state.temp)
  },
});

export const getPhoneData = module.addFetcher(
  "/getPhoneData",
  "/api/stats/getPhoneData",
  {
    onSuccess: async (state, action) => {
      state.phone_usage = action.payload.phone_usage;
    },
  }
);

export const getHabitsScreenTime = module.addFetcher(
    "/getHabitsScreenTime",
    "/api/stats/getHabitsScreenTime",
    {
      onSuccess: async (state, action) => {
        state.screen_time = action.payload.screen_time;
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
      console.log(" SCOOOORE:", action.payload.score);

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
        
      }
    ),
    console.log("HEEEEEEJ: ", state.sleepReg)
  );
    },
  }
);
export const getDreamNotes = module.addFetcher(
  "/getDreamNotes",
  "/api/stats/getDreamNotes",
  {
    onSuccess: async (state, action) => {
      state.dreamNotes = action.payload.notes;
    },
  }
);

export const setDate = module.add;
