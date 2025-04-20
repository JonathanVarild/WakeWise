

export const recordingsInitialState = {
    recordings: [
      { id: 1, 
        description: "Your recording",
        title: "Recording 2025-04-19", 
        favorite: false,
        playing: false,
     },
      { id: 2,
        description: "Your recording",
        title: "Recording 2025-04-18",
        favorite: false,
        playing: false,
    },
      { id: 3,
        description: "Your recording",
        title: "Recording 2025-04-17",
        favorite: false,
        playing: false,
     },
    ],
  };
  
  // Reducer för att toggla favorite-status för en specifik inspelning
 const toggleFavoriteReducer = (state, action) => {
    const recordingId = action.payload; 
    state.recordings = state.recordings.map((recording) =>
      recording.id === recordingId
        ? { ...recording, favorite: !recording.favorite } 
        : recording
    );
  };
  
  const togglePlayReducer = (state, action) => {
    const recordingId = action.payload; 
    state.recordings = state.recordings.map((recording) =>
      recording.id === recordingId
        ? { ...recording, playing: !recording.playing } 
        : recording
    );
  };

  export { toggleFavoriteReducer, togglePlayReducer };