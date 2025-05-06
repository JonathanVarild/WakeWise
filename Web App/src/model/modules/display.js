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
export const fetchDisplaySettings = module.addFetcher("fetchDisplaySettings", "/api/settings/display", {
	onSuccess: (state, action) => {
		// Uppdatera värdena med det som kommer från API:et.
		Object.assign(state, action.payload);
	},
});

// Uppdatera skärminställningar i backend.
export const updateDisplaySettings = module.addFetcher("updateDisplaySettings", "/api/settings/display", {
	onSuccess: (state, action) => {
		// Sätt nya värden direkt i state när anropet lyckas.
		Object.assign(state, action.payload);
	},
});
