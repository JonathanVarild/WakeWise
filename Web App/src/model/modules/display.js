import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "../utilities";

export const fetchDisplayBuilder = (builder) => {
  builder
    .addCase(fetchDisplaySettings.pending, (state) => {
      state.display.status = 'loading';
    })
    .addCase(fetchDisplaySettings.fulfilled, (state, action) => {
      state.display = {
        ...action.payload,
        status: 'succeeded',
        error: null
      };
    })
    .addCase(fetchDisplaySettings.rejected, (state, action) => {
      state.display.status = 'failed';
      state.display.error = action.error.message;
    });
};

export const updateDisplayBuilder = (builder) => {
  builder
    .addCase(updateDisplaySettings.pending, (state) => {
      state.display.status = 'updating';
    })
    .addCase(updateDisplaySettings.fulfilled, (state, action) => {
      state.display = {
        ...action.payload,
        status: 'succeeded',
        error: null
      };
    })
    .addCase(updateDisplaySettings.rejected, (state, action) => {
      state.display.status = 'failed';
      state.display.error = action.error.message;
    });
};

export const fetchDisplaySettings = createAsyncThunk(
  'interface/fetchDisplaySettings',
  async () => {
    const response = await fetch('/api/settings/display');
    return fetchResolvedCB(response);
  }
);

export const updateDisplaySettings = createAsyncThunk(
  'interface/updateDisplaySettings',
  async (settings) => {
    const response = await fetch('/api/settings/display', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings)
    });
    return fetchResolvedCB(response);
  }
);

export const displayInitialState = {
  display: {
    page_layouts: [[1,2,3,4], [5,6,7,8]],
    font_size: 14,
    color: '#ff7626',
    status: 'idle',
    error: null
  }
};