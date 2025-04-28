
import { createAsyncThunk } from "@reduxjs/toolkit";

export const recordingsInitialState = {
    recordings:[],
    metadataId: null,
    date: null,
    metadata: {
      status: "idle",
      requestId: null,
      error: null,
      userInfo: null,
    },
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  
  async function presentMetadataCB(payload, { getState, abort, requestId }) {
    const state = getState().interface;

    if (state.metadata.requestId !== requestId)
        return abort("Request already in progress.");

    return await fetch(apiUrl + "/api/rec/getMetadata", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch metadata");
        }
        return response.json();
    });
}

  
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


export const presentMetadata = createAsyncThunk("interface/recordings", presentMetadataCB);

export function metadataBuilder(builder) {
  builder
      .addCase(presentMetadata.pending, (state, action) => {
          if (state.metadata.requestId === null) {
              state.metadata.status = "loading";
              state.metadata.requestId = action.meta.requestId;
          }
      })
      .addCase(presentMetadata.fulfilled, (state, action) => {
          if (state.metadata.requestId === action.meta.requestId) {
              state.metadata.status = "idle";
              state.metadata.requestId = null;

              state.recordings = action.payload.recordings; // Uppdatera recordings med data från API
          }
      })
      .addCase(presentMetadata.rejected, (state, action) => {
          if (state.metadata.requestId === action.meta.requestId) {
              state.metadata.status = "failed";
              state.metadata.requestId = null;
              state.metadata.error = action.error.message;
          }
      });
}


  export { toggleFavoriteReducer, togglePlayReducer };