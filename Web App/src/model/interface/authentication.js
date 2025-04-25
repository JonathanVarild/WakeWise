import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "../utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const authInitialState = {
	authenticatedAs: null,
	authenticateRequest: {
		status: "idle",
		requestId: null,
		error: null,
	},
	reauthenticateRequest: {
		status: "idle",
		requestId: null,
		error: null,
	},
	},
};

export const logoutReducer = (state, payload) => {
	state.authenticated = null;
};

export const clearErrorsReducer = (state, payload) => {
	state.authenticateRequest.error = null;
	state.reauthenticateRequest.error = null;
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

				state.authenticatedAs = action.payload.username;
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

async function reauthenticateUserCB() {
	return await fetch(apiUrl + "/api/auth/reauth", {
		method: "POST",
	}).then(fetchResolvedCB);
}

export const reauthenticateUser = createAsyncThunk("interface/reauthenticateUser", reauthenticateUserCB);

export function reauthenticateUserBuilder(builder) {
	builder
		.addCase(reauthenticateUser.pending, (state, action) => {
			if (state.reauthenticateRequest.requestId === null) {
				state.reauthenticateRequest.status = "loading";
				state.reauthenticateRequest.requestId = action.meta.requestId;
			}
		})
		.addCase(reauthenticateUser.fulfilled, (state, action) => {
			if (state.reauthenticateRequest.requestId === action.meta.requestId) {
				state.reauthenticateRequest.status = "idle";
				state.reauthenticateRequest.requestId = null;

				state.authenticatedAs = action.payload.username;
			}
		})
		.addCase(reauthenticateUser.rejected, (state, action) => {
			if (state.reauthenticateRequest.requestId === action.meta.requestId) {
				if (action.error.message === "Missing JWT token.") {
					state.reauthenticateRequest.status = "idle";
				} else {
					state.reauthenticateRequest.status = "failed";
					state.reauthenticateRequest.error = action.error.message;
				}

				state.reauthenticateRequest.requestId = null;
			}
		});
}
