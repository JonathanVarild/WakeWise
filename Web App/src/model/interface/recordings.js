
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const recordingsInitialState = {
    recordings:[],
    metadata: {
      status: "idle",
      requestId: null,
      error: null,
      userInfo: null,
    },
    saveMetadata: { // Lägg till saveMetadata här
        status: "idle",
        requestId: null,
        error: null,
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

async function saveMetadataCB(payload, { getState, abort, requestId }) {
    const { id, file_name } = payload; // Hämta id och file_name från payload

    return await fetch(apiUrl + "/api/rec/saveMetadata", {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ id, file_name }),
    }).then(async (response) => {
        const data = await response.json();
        console.log("Response from backend:", data); // Logga backend-responsen
        if (!response.ok) {
            throw new Error("Failed to save metadata");
        }
        return data;
    });
}


const setRecNameReducer = (state, action) => {
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
};
//  export const recName = (payload) => ({
  //  type: "interface/setRecName",
    //payload,

  //});

  
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


export const presentMetadata = createAsyncThunk("interface/presentMetadata", presentMetadataCB);
export const saveMetadata = createAsyncThunk("interface/saveMetadata", saveMetadataCB);


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

export function saveMetadataBuilder(builder){
    builder
    .addCase(saveMetadata.pending, (state, action) => {
        if (state.saveMetadata.requestId === null) {
            state.saveMetadata.status = "loading";
            state.saveMetadata.requestId = action.meta.requestId;

        }
    })
    .addCase(saveMetadata.fulfilled, (state, action) => {
        if (state.saveMetadata.requestId === action.meta.requestId) {
            state.saveMetadata.status = "idle";
            state.saveMetadata.requestId = null;
            
       
            const { id, file_name } = action.payload; // Hämta det uppdaterade objektet
            const recordingIndex = state.recordings.findIndex((r) => r.id === id);
            if (recordingIndex !== -1) {
                state.recordings[recordingIndex].file_name = file_name; // Uppdatera endast det specifika objektet
            }
        }
    })
    .addCase(saveMetadata.rejected, (state, action) => {
        if (state.saveMetadata.requestId === action.meta.requestId) {
            state.saveMetadata.status = "failed";
            state.saveMetadata.requestId = null;
            state.saveMetadata.error = action.error.message;
          
        }
    });
}   



  export { toggleFavoriteReducer, togglePlayReducer, setRecNameReducer };