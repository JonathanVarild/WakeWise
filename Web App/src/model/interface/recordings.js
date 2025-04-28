

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
  
  //Söker efter id och sen sätta detta som favorit?? 
  const toggleFavoriteReducer = (state, action) => {
    const recordingIndex = state.recordings.findIndex(r => r.id === action.payload); 
    if (recordingIndex !== -1) {
      state.recordings[recordingIndex].favorite = !state.recordings[recordingIndex].favorite; 
    }
  };
  
  const togglePlayReducer = (state, action) => {
    const recordingIndex = state.recordings.findIndex(r => r.id === action.payload); 
    if (recordingIndex !== -1) {
      state.recordings[recordingIndex].playing = !state.recordings[recordingIndex].playing; 
    }
  };

  export { toggleFavoriteReducer, togglePlayReducer };