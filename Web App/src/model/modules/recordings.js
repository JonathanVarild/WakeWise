import { createReduxModule } from "../ReduxHelpers";

// Create and export new Redux module.
const module = createReduxModule("recordings", {
	recordings: [],
});
export default module;

export const setRecordingName = module.addReducer("setRecordingName", (state, action) => {
	const { id, name } = action.payload;
	console.log("Action payload:", action.payload); // Logga payloaden
	console.log("Current recordings:", state.recordings);

	const recordingIndex = state.recordings.findIndex((r) => r.id === id);
	if (recordingIndex !== -1) {
		state.recordings[recordingIndex].file_name = name; // Uppdatera namnet
		state.name = name; // Uppdatera state.name
		console.log("Updated recording:", state.recordings[recordingIndex]);
	} else {
		console.log("Recording not found for ID:", id);
	}
});

export const toggleRecordingFavorite = module.addReducer("toggleRecordingFavorite", (state, action) => {
	const recordingIndex = state.recordings.findIndex((r) => r.id === action.payload);
	if (recordingIndex !== -1) {
		state.recordings[recordingIndex].favorite = !state.recordings[recordingIndex].favorite;
	}
});

export const toggleRecordingPlay = module.addReducer("toggleRecordingPlay", (state, action) => {
	const recordingIndex = state.recordings.findIndex((r) => r.id === action.payload);
	if (recordingIndex !== -1) {
		state.recordings[recordingIndex].playing = !state.recordings[recordingIndex].playing;
	}
});

export const getRecordingsMetadata = module.addFetcher("getRecordings", "/api/rec/getMetadata", {
	onSuccess: async (state, action) => {
		state.recordings = action.payload.recordings;
	},
});

export const setRecordingMetadata = module.addFetcher("setRecordingMetadata", "/api/rec/saveMetadata", {
	onSuccess: (state, action) => {
		const { id, file_name } = action.payload; // Hämta det uppdaterade objektet
		const recordingIndex = state.recordings.findIndex((r) => r.id === id);
		if (recordingIndex !== -1) {
			state.recordings[recordingIndex].file_name = file_name; // Uppdatera endast det specifika objektet
		}
	},
});
