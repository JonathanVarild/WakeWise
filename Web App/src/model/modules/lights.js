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
    state.brightness = action.payload;
  }
);

export const setColorHex = module.addReducer("setColorHex", (state, action) => {
  state.color = action.payload;
});

export const setId = module.addReducer("setId", (state, action) => {
  state.id = action.payload;
});

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

export const getSunrise = module.addFetcher(
  "getSunrise",
  "/api/lights/getSunrise",
  {
    onSuccess: async (state, action) => {
      state.sunrise = action.payload.sunrise;
      console.log("Fetched sunrise:", state.sunrise);
    },
  }
);

export const updateSunrise = module.addFetcher(
    "updateSunrise",
    "/api/lights/updateSunrise",
    {
      onSuccess: async (state, action) => {
        state.sunrise = action.payload.sunrise;
      },
    }
  );

  export const getBrightness = module.addFetcher(
    "getBrightness",
    "/api/lights/getBrightness",
    {
      onSuccess: async (state, action) => {
        console.log("Fetched brightness:", action.payload.brightness); 
        state.brightness = action.payload.brightness;
      },
    }
  );

export const updateBrightness = module.addFetcher(
  "updateBrightness",
  "/api/lights/updateBrightness",
  {
    onSuccess: async (state, action) => {
      state.brightness = action.payload.brightness;
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
