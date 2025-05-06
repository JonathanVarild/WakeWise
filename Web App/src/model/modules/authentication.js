// Import the Redux helper library.
import { createReduxModule } from "../ReduxHelpers";

// Create and export new Redux module.
const module = createReduxModule("authentication", { authenticatedAs: null, availableUsers: null, clockName: "Unknown's Alarm Clock" });
export default module;

// Create and export a reducer to change the state for logging out.
export const logout = module.addReducer("logout", (state, payload) => {
	state.authenticatedAs = null;
});

// Create and export a reducer to clear authentication errors.
export const clearAuthErrors = module.addReducer("clearAuthErrors", (state, payload) => {
	state["authenticateUser"].error = null;
	state["reauthenticateUser"].error = null;
});

// Create and export a fetcher to contact the WEB API for authentication.
export const authenticateUser = module.addFetcher("authenticateUser", "/api/auth/login", {
	onSuccess: (state, action) => {
		state.authenticatedAs = action.payload.username;
	},
});

// Create and export a fetcher to contact the WEB API for re-authentication.
export const reauthenticateUser = module.addFetcher("reauthenticateUser", "/api/auth/reauth", {
	onSuccess: (state, action) => {
		state.authenticatedAs = action.payload.username;
	},
	onError: (state, action) => {
		if (action.error.message === "Missing JWT token.") {
			state.reauthenticateUser.status = "idle";
		} else {
			state.reauthenticateUser.status = "failed";
			state.reauthenticateUser.error = action.error.message;
		}

		state.reauthenticateUser.requestId = null;
		return false;
	},
});

// Create and export a fetcher to contact the WEB API for available users.
export const getAvailableUsers = module.addFetcher("getAvailableUsers", "/api/auth/getusers", {
	onSuccess: (state, action) => {
		state.availableUsers = action.payload.users;
		state.clockName = action.payload.clockName;
	},
});
