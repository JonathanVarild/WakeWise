import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./interface";

const model = configureStore({
	reducer: {
		interface: interfaceReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export default model;