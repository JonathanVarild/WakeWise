import { configureStore } from "@reduxjs/toolkit";

const importedReducers = {};

const modules = import.meta.glob("./modules/*.js", { eager: true });
for (const file of Object.keys(modules)) {
	const module = modules[file];

	if (module.default && module.default.getModuleReducer) {
		const { reducer, moduleName } = module.default.getModuleReducer();
		importedReducers[moduleName] = reducer;
	} else {
		console.warn("Redux module " + file + " does not export a default module object. (Missing 'export default module')");
	}
}

const model = configureStore({
	reducer: {
		...importedReducers,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export default model;
