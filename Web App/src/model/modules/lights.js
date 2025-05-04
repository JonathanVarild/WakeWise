
import { createReduxModule } from "../ReduxHelpers";

// Create and export new Redux module.
const module = createReduxModule("recordings", {
    colors: [],
});

export default module;

export const getColors = module.addFetcher("getColors", "/api/lights/getColors", {
    onSuccess: async(state,action) => {
        state.colors = action.payload.colors;
        console.log("Lights array: ", state.colors)
    }
})

export const updateColors = module.addReducer("updatecolors", {
    
})