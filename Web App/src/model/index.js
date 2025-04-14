// filepath: /Users/floralindberg/Desktop/GITHUB/WakeWise/Web App/src/model/index.js
import { configureStore } from "@reduxjs/toolkit";
import alarmReducer from "./alarmSlice";

const model = configureStore({
  reducer: {
    alarm: alarmReducer, // Lägg till alarm reducer
  },
});

export default model;