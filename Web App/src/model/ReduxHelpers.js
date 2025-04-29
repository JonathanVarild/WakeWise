import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

// Helper function copied (by Jonathan) from my other project.
// https://github.com/JonathanVarild/BusTrackr/blob/b5aa892d34e35676e63c9174a07a998472e3ac61/src/store/interface/utilities.js#L1
export async function fetchResolvedCB(resp) {
	if (resp.status < 200 || resp.status > 200) {
		const error = await resp.json();
		return Promise.reject(new Error(error.message));
	}
	return resp.json();
}

function createRequestState() {
	return { status: "idle", requestId: null, error: null };
}

export function createReduxModule(moduleName, initialState) {
	const module = { name: moduleName, initialState, reducers: {}, fetchers: {}, builders: [] };
	const dispatchFunctions = {};

	function addReducer(reducerName, reducer) {
		if (module.reducers[reducerName]) {
			throw new Error(`Reducer ${reducerName} already exists in module ${moduleName}`);
		}
		module.reducers[reducerName] = reducer;

		dispatchFunctions[reducerName] = (state, payload) => {
			throw new Error(`Cannot dispatch ${reducerName} until ${moduleName} is initialized.`);
		};

		return (...args) => dispatchFunctions[reducerName](...args);
	}

	function addFetcher(fetchName, endpoint, objectArguments) {
		if (module.fetchers[fetchName]) {
			throw new Error(`Fetcher ${fetchName} already exists in module ${moduleName}`);
		}
		objectArguments = objectArguments || {};
		objectArguments.onSuccess = objectArguments.onSuccess || (() => {});
		objectArguments.onError = objectArguments.onError || (() => {});
		objectArguments.onPending = objectArguments.onPending || (() => {});
		objectArguments.flags = objectArguments.flags || {};

		initialState[fetchName] = createRequestState();

		async function fetcherCB(payload, { getState, abort, requestId }) {
			if (!objectArguments.flags["noRequestCheck"]) {
				const state = getState()[moduleName];
				if (state[fetchName].requestId !== requestId) return abort("Request already in progress.");
			}

			const requestData = { method: "POST" };

			if (payload) {
				requestData.body = JSON.stringify(payload);
				requestData.headers = {
					"Content-type": "application/json; charset=UTF-8",
				};
			}

			return fetch(apiUrl + endpoint, requestData).then(fetchResolvedCB);
		}

		const fetchReducer = createAsyncThunk(`${moduleName}/${fetchName}`, fetcherCB);
		module.fetchers[fetchName] = fetchReducer;

		module.builders.push((builder) => {
			builder
				.addCase(fetchReducer.pending, (state, action) => {
					if (!objectArguments.flags["noRequestCheck"] || state[fetchName].requestId === null) {
						if (objectArguments.onPending(state, action) == false) return;
						state[fetchName].status = "loading";
						state[fetchName].requestId = action.meta.requestId;
					}
				})
				.addCase(fetchReducer.fulfilled, (state, action) => {
					if (!objectArguments.flags["noRequestCheck"] || state[fetchName].requestId === null) {
						if (objectArguments.onSuccess(state, action) == false) return;
						state[fetchName].status = "idle";
						state[fetchName].requestId = null;
					}
				})
				.addCase(fetchReducer.rejected, (state, action) => {
					if (!objectArguments.flags["noRequestCheck"] || state[fetchName].requestId === null) {
						if (objectArguments.onError(state, action) == false) return;

						state[fetchName].status = "failed";
						state[fetchName].requestId = null;
						state[fetchName].error = action.error.message;
						console.log("Rejected fetcher " + fetchName + ": " + action.error.message + "\n" + action.error.stack);
					}
				});
		});

		return fetchReducer;
	}

	function initializeModule() {
		module.slice = createSlice({
			name: moduleName,
			initialState: module.initialState,
			reducers: module.reducers,
			extraReducers: (builder) => {
				for (const fetcher of module.builders) {
					fetcher(builder);
				}
			},
		});

		for (const [reducerName, reducer] of Object.entries(module.slice.actions)) {
			dispatchFunctions[reducerName] = reducer;
		}
	}

	function getModuleReducer() {
		initializeModule();
		return { reducer: module.slice.reducer, moduleName: moduleName };
	}

	return { ...module, addReducer, addFetcher, initializeModule, getModuleReducer };
}
