import { createReduxModule } from "../ReduxHelpers";

const module = createReduxModule("sound", {
  volume: 50,
  sound: "Sound1",
  fade: 5,
});

export default module;

export const setVolume = module.addReducer("setVolume", (state, action) => {
  state.volume = action.payload;
});

export const setSound = module.addReducer("setSound", (state, action) => {
  state.sound = action.payload;
});

export const setFade = module.addReducer("setFade", (state, action) => {
  state.fade = action.payload;
});

export const getSoundSettings = module.addFetcher(
  "getSoundSettings",
  "/api/settings/getsound",
  {
    onSuccess: (state, action) => {
      state.volume = action.payload.volume;
      state.sound = action.payload.sound;
      state.fade = action.payload.fade;
    },
  }
);

export const setSoundSettings = module.addFetcher(
  "setSoundSettings",
  "/api/settings/setsound"
);
