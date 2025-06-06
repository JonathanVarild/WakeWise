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

export const getRecordingsMetadata = module.addFetcher("getRecordings", "/api/rec/getRecordingsData", {
	onSuccess: async (state, action) => {
		state.recordings = action.payload.recordings;
		console.log("from getRecordings", state.recordings);

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


export const setRecordingNotes = module.addFetcher("setRecordingNotes", "/api/rec/setRecordingNotes", {
	onSuccess: async (state, action) => {
	  const { file_id, user_note } = action.payload; 
	  const recordingIndex = state.recordings.findIndex((r) => r.id === file_id); 
	  if (recordingIndex !== -1) {
		state.recordings[recordingIndex].user_note = user_note;
	}
	onError: ( action) => {
	  console.error("Error in setRecordingNotes:", action.error); 
	}}
  });

  export const setRecordingFavorite = module.addFetcher("setRecordingFavorite", "/api/rec/setRecordingFavorite", {
	onSuccess: async (state, action) => {
		const {file_id} = action.payload;

		const recordingIndex = state.recordings.findIndex((r) => r.id === file_id); 
		if (recordingIndex !== -1) {
		  state.recordings[recordingIndex].is_favorite = true;
	  }
	  onError: ( action) => {
		console.error("Error in setRecordingNotes:", action.error); 

	  }}
  })

  export const removeRecordingFavorite = module.addFetcher("removeRecordingFavorite", "/api/rec/removeRecordingFavorite", {
	onSuccess: async (state, action) => {
	  console.log("Hej");
	  const { file_id } = action.payload;
	  const recordingIndex = state.recordings.findIndex((r) => r.id === file_id);
	  if (recordingIndex !== -1) {
		console.log("Hej");
		state.recordings[recordingIndex].is_favorite = false;
	  }
	},
	onError: (action) => {
	  console.error("Error in removeRecordingFavorite:", action.error);
	},
  });

 export const deleteRecording = module.addFetcher("deleteRecordingAudio", "/api/rec/deleteRecording", {
	onSuccess: async (state, action) => {
		//state.recordings = action.payload;

		const id = action.meta.arg.id

		for (let index = 0; index < state.recordings.length; index++) {
			if (state.recordings[index].id == id) {
				state.recordings.splice(index, 1);
			}
		}
	},
 })