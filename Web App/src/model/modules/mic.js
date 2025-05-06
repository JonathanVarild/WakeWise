// Import Redux‑helpern.
import { createReduxModule } from "../ReduxHelpers";

// Grund‑state för mikrofoninställningar.
const module = createReduxModule("mic", {
	before_sleep_delay_minutes: 10,
	activation_threshold_db: 100,
	recording_lifespan_days: 30,
});

export default module;

// SKapa reducer för att ändra before_sleep_delay_minutes.
export const setBeforeSleepDelay = module.addReducer("setBeforeSleepDelay", (state, action) => {
	state.before_sleep_delay_minutes = parseInt(action.payload);
});

// SKapa reducer för att ändra activation_threshold_db.
export const setActivationThreshold = module.addReducer("setActivationThreshold", (state, action) => {
	state.activation_threshold_db = parseInt(action.payload);
});

// SKapa reducer för att ändra recording_lifespan_days.
export const setRecordingLifespan = module.addReducer("setRecordingLifespan", (state, action) => {
	state.recording_lifespan_days = parseInt(action.payload);
});

// Hämta mikrofoninställningar från backend.
export const fetchMicSettings = module.addFetcher("fetchMicSettings", "/api/settings/getMicSettings", {
	onSuccess: (state, action) => {
		Object.assign(state, action.payload);
	},
});

// Uppdatera mikrofoninställningar i backend.
export const updateMicSettings = module.addFetcher("updateMicSettings", "/api/settings/setMicSettings", {});
