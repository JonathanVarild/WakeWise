import { createReduxModule } from "../ReduxHelpers";

// Create and export new Redux module.
const module = createReduxModule("recordings", {
  colors: [],
});

export default module;

export const getColors = module.addFetcher(
  "getColors",
  "/api/lights/getColors",
  {
    onSuccess: async (state, action) => {
      state.colors = action.payload.colors;
      console.log("Lights array: ", state.colors);
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
      console.log("Updated color and rgb: ", color_hex, ", ", color_rgb,  "for id: ", lightIndex);
    
    },
  }
);
