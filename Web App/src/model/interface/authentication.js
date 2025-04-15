import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "../utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const authInitialState = {
	authenticatedAs: null,
	authenticateRequest: {
		status: "idle",
		requestId: null,
		error: null,
		userInfo: null,
	},
};

export const logoutReducer = (state, payload) => {
	state.authenticated = null;
};

async function authenticateUserCB(payload, { getState, abort, requestId }) {
	const state = getState().interface;
	if (state.authenticateRequest.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/auth/login", {
		method: "POST",
		body: JSON.stringify({
			username: payload.username,
			password: payload.password,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
}

export const authenticateUser = createAsyncThunk("interface/authenticateUser", authenticateUserCB);

export function authenticateUserBuilder(builder) {
	builder
		.addCase(authenticateUser.pending, (state, action) => {
			if (state.authenticateRequest.requestId === null) {
				state.authenticateRequest.status = "loading";
				state.authenticateRequest.requestId = action.meta.requestId;
			}
		})
		.addCase(authenticateUser.fulfilled, (state, action) => {
			if (state.authenticateRequest.requestId === action.meta.requestId) {
				state.authenticateRequest.status = "idle";
				state.authenticateRequest.requestId = null;

				state.authPopup = null;
				console.log("authenticateUser.fulfilled", action.payload);
			}
		})
		.addCase(authenticateUser.rejected, (state, action) => {
			if (state.authenticateRequest.requestId === action.meta.requestId) {
				state.authenticateRequest.status = "failed";
				state.authenticateRequest.requestId = null;
				state.authenticateRequest.error = action.error.message;
			}
		});
}
