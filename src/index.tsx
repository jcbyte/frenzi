import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, useNavigate } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import SnazzyBackground from "./SnazzyBackground";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<>
		<React.StrictMode>
			<BrowserRouter>
				<NextApp />
			</BrowserRouter>
		</React.StrictMode>
	</>
);

function NextApp() {
	const navigate = useNavigate();

	return (
		<NextUIProvider navigate={navigate}>
			<main className="dark text-foreground bg-background">
				<SnazzyBackground />
				<App />
			</main>
		</NextUIProvider>
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
