// Example code copied from my other project.

import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = "localhost:3000";

export const authInitialState = {
    authenticated: true,
	authenticateAction: {
		status: "idle",
		requestId: null,
		error: null,
		userInfo: null,
	},
};

export const logoutReducer = (state, payload) => {
    state.authenticated = false;
}

async function authenticateUserCB(_, { getState, abort, requestId }) {
	const state = getState().interface;
	const loginForm = state.authPopupForm.login;

	if (state.authenticate.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/login", {
		method: "POST",
		body: JSON.stringify({
			email: loginForm.email,
			password: loginForm.password,
			long_expire: loginForm.rememberMe,
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
			if (state.authenticate.requestId === null) {
				state.authenticate.status = "loading";
				state.authPopupForm.login.fault = "";
				state.authenticate.requestId = action.meta.requestId;
			}
		})
		.addCase(authenticateUser.fulfilled, (state, action) => {
			if (state.authenticate.requestId === action.meta.requestId) {
				state.authenticate.status = "idle";
				state.authenticate.requestId = null;

				state.authPopup = null;

				parseUserData(action, state);

				state.queuedPopups.push({
					title: "Login Successful",
					message: "You have been successfully logged in and can now make use of more features.",
					type: 0,
				});
			}
		})
		.addCase(authenticateUser.rejected, (state, action) => {
			if (state.authenticate.requestId === action.meta.requestId) {
				state.authenticate.status = "failed";
				state.authenticate.requestId = null;
				state.authenticate.error = action.error.message;
				state.authPopupForm.login.fault = action.error.message;
			}
		});
}