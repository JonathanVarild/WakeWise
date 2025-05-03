import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "../utilities";


export const fetchMicBuilder = (builder) => {
  builder
    .addCase(fetchMicSettings.pending, (state) => {
      state.mic.status = 'loading';
    })
    .addCase(fetchMicSettings.fulfilled, (state, action) => {
      state.mic = {
        ...action.payload,
        status: 'succeeded',
        error: null
      };
    })
    .addCase(fetchMicSettings.rejected, (state, action) => {
      state.mic.status = 'failed';
      state.mic.error = action.error.message;
    });
};

export const updateMicBuilder = (builder) => {
  builder
    .addCase(updateMicSettings.pending, (state) => {
      state.mic.status = 'updating';
    })
    .addCase(updateMicSettings.fulfilled, (state, action) => {
      state.mic = {
        ...action.payload,
        status: 'succeeded',
        error: null
      };
    })
    .addCase(updateMicSettings.rejected, (state, action) => {
      state.mic.status = 'failed';
      state.mic.error = action.error.message;
    });
};


export const fetchMicSettings = createAsyncThunk(
  'interface/fetchMicSettings',
  async () => {
    const response = await fetch('/api/settings/microphone');
    return fetchResolvedCB(response);
  }
);

export const updateMicSettings = createAsyncThunk(
  'interface/updateMicSettings',
  async (settings) => {
    const response = await fetch('/api/settings/microphone', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings)
    });
    return fetchResolvedCB(response);
  }
);


export const micInitialState = {
  mic: {
    before_sleep_delay_minutes: 10,
    activation_threshold_db: 100,
    recording_lifespan_days: 30,
    status: 'idle',
    error: null
  }
};