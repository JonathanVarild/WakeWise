// Importera Redux‑helpern.
import { createReduxModule } from "../ReduxHelpers";

// Bas‑state för skärm‑inställningarna.
const module = createReduxModule("display", {
	page_layouts: [
		[1, 2, 3, 4],
		[5, 6, 7, 8],
	],
	font_size: 14,
	color: "#ff7626",
});

export default module;

/* ------------------------------------------------------------------
 * Fetchers
 * ------------------------------------------------------------------*/

// Hämta skärminställningar från backend.
export const fetchDisplaySettings = module.addFetcher("fetchDisplaySettings", "/api/settings/getDisplaySettings", {
	onSuccess: (state, action) => {
		state.page_layouts = action.payload.page_layouts || [];
		state.font_size = action.payload.font_size;
		state.color = action.payload.color;
	},
});

// Uppdatera skärminställningar i backend.
export const updateDisplaySettings = module.addFetcher("updateDisplaySettings", "/api/settings/setDisplaySettings", {
	onSuccess: (state, action) => {
		Object.assign(state, action.payload);
	},
});
