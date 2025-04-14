import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import model from "./model/index.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={model}>
			<App />
		</Provider>
	</StrictMode>
);
