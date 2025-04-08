import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import model from "./model/";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={model}>
			<App />
		</Provider>
	</StrictMode>
);
