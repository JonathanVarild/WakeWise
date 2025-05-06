import { createReduxModule } from "../ReduxHelpers";


const module = createReduxModule("users", {
  list: [],
  loadStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null
});

// fetch users
export const fetchUsers = module.addFetcher("fetchUsers", "/api/users", {
  onPending: (state) => {
    state.loadStatus = "loading";
  },
  onSuccess: (state, action) => {
    state.loadStatus = "succeeded";
    state.list = action.payload;
  },
  onError: (state, action) => {
    state.loadStatus = "failed";
    state.error = action.error.message;
  }
});

// create user
export const createUser = module.addFetcher("createUser", "/api/users", { 
  flags: { method: "POST" },
  onPending: (state) => {
    state.createStatus = "processing";
  },
  onSuccess: (state, action) => {
    state.createStatus = "succeeded";
    state.list.push(action.payload);
  },
  onError: (state, action) => {
    state.createStatus = "failed";
    state.error = action.error.message;
  }
});

// Update user role
export const updateUserRole = module.addFetcher("updateUserRole", "/api/users/:userId/role", {
  flags: { method: "PUT" },
  onPending: (state) => {
    state.updateStatus = "processing";
  },
  onSuccess: (state, action) => {
    state.updateStatus = "succeeded";
    const idx = state.list.findIndex(u => u.id === action.payload.id);
    if (idx !== -1) state.list[idx] = action.payload;
  },
  onError: (state, action) => {
    state.updateStatus = "failed";
    state.error = action.error.message;
  }
});

// update user password
export const updatePassword = module.addFetcher("updatePassword", "/api/users/:userId/password", {
  flags: { method: "PUT" },
  onPending: (state) => {
    state.updateStatus = "processing";
  },
  onSuccess: (state) => {
    state.updateStatus = "succeeded";
  },
  onError: (state, action) => {
    state.updateStatus = "failed";
    state.error = action.error.message;
  }
});

// delete user
export const deleteUser = module.addFetcher("deleteUser", "/api/users/:userId", {
  flags: { method: "DELETE" },
  onPending: (state) => {
    state.deleteStatus = "processing";
  },
  onSuccess: (state, action) => {
    state.deleteStatus = "succeeded";
    state.list = state.list.filter(u => u.id !== action.meta.arg);
  },
  onError: (state, action) => {
    state.deleteStatus = "failed";
    state.error = action.error.message;
  }
});


export const { reducer: usersReducer } = module.getModuleReducer();
