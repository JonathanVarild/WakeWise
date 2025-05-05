import { createReduxModule } from "../ReduxHelpers";

// Create and export new Redux module.
const module = createReduxModule("lights", {
  colors: [],
  id: null,
  brightness: 30,
  color: "#FFFFFF",
  sunrise: null,
});

export default module;

export const setBrightness = module.addReducer(
  "setBrightness",
  (state, action) => {
    console.log("Updated brightness", action.payload);
    state.brightness = action.payload;
  }
);

export const setColorHex = module.addReducer("setColorHex", (state, action) => {
  state.color = action.payload;
});

export const setId = module.addReducer("setId", (state, action) => {
  state.id = action.payload;
});

export const getSunrise = module.addFetcher(
  "getSunrise",
  "/api/lights/getSunrise",
  {
    onSuccess: async (state, action) => {
      state.sunrise = action.payload;
      console.log("Fetched sunrise:", state.brightness);
    },
  }
);

export const getBrightness = module.addFetcher(
  "getBrightness",
  "/api/lights/getBrightness",
  {
    onSuccess: async (state, action) => {
      state.brightness = action.payload.brightness;
      console.log("Fetched brightness:", state.brightness);
    },
  }
);

export const getSavedId = module.addFetcher(
  "getSavedId",
  "/api/lights/getSavedId",
  {
    onSuccess: async (state, action) => {
      state.id = action.payload.id;
      console.log("id:", state.id);
    },
  }
);

export const updateBrightness = module.addFetcher(
  "updateBrightness",
  "/api/lights/updateBrightness",
  {
    onSuccess: async (state, action) => {
      state.brightness = action.payload.updatedBrightness.brightness;
      console.log("Updated brightness in Redux state:", state.brightness);
    },
  }
);

export const updateSunrise = module.addFetcher(
  "updateSunrise",
  "/api/lights/updateSunrise",
  {
    onSuccess: async (state, action) => {
      state.sunrise = action.payload.sunrise;
      console.log("Updated brightness in Redux state:", state.sunrise);
    },
  }
);

export const updateColorsData = module.addFetcher(
  "updateColorsData",
  "/api/lights/updateColorsData",
  {
    onSuccess: async (state, action) => {
      state.color = action.payload;
      console.log("Updated color in Redux state:", state.color);
    },
  }
);

export const getColors = module.addFetcher(
  "getColors",
  "/api/lights/getColors",
  {
    onSuccess: async (state, action) => {
      state.colors = action.payload.colors;
    },
  }
);

export const updateColor = module.addFetcher(
  "updateColor",
  "/api/lights/updateColor",
  {
    onSuccess: (state, action) => {
      const { id, color_hex, color_rgb } = action.payload;
      const lightIndex = state.colors.findIndex((r) => r.id === id);
      if (lightIndex !== -1) {
        state.colors[lightIndex].color_hex = color_hex;
        state.colors[lightIndex].color_rgb = color_rgb;
      }
      console.log(
        "Updated color and rgb: ",
        color_hex,
        ", ",
        color_rgb,
        "for id: ",
        lightIndex
      );
    },
  }
);
