// Import Redux‑helpern.
import { createReduxModule } from "../ReduxHelpers";

// Grund‑state för mikrofoninställningar.
const module = createReduxModule("mic", {
	before_sleep_delay_minutes: 10,
	activation_threshold_db: 100,
	recording_lifespan_days: 30,
});

export default module;

/* ------------------------------------------------------------------
 * Fetchers
 * ------------------------------------------------------------------*/

// Hämta mikrofoninställningar från backend.
export const fetchMicSettings = module.addFetcher(
	"fetchMicSettings",
	"/api/settings/microphone",
	{
		onSuccess: (state, action) => {
			Object.assign(state, action.payload);
		},
	}
);

// Uppdatera mikrofoninställningar i backend.
export const updateMicSettings = module.addFetcher(
	"updateMicSettings",
	"/api/settings/microphone",
	{
		onSuccess: (state, action) => {
			Object.assign(state, action.payload);
		},
	}
);
