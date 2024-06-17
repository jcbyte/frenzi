import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/AuthorisedRoute";
import Loading from "./components/Loading";
import MyNavbar from "./components/MyNavbar";
import { auth } from "./firestore/firebase";
import { DEFAULT_SETTINGS } from "./globals";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingsPage from "./pages/SettingsPage";
import { DistanceData, IAppContext, UserSettings } from "./types";

export const AppContext = createContext<IAppContext>({
	userSettings: DEFAULT_SETTINGS,
	setUserSettings: null,
	distanceData: {},
	setDistanceData: null,
});

export default function App() {
	const [loadingFirebase, setLoadingFirebase] = useState(true);

	const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
	const [distanceData, setDistanceData] = useState<DistanceData>({});

	useEffect(() => {
		auth.authStateReady().then(() => {
			setLoadingFirebase(false);
		});
	}, []);

	return (
		<>
			<AppContext.Provider value={{ userSettings, setUserSettings, distanceData, setDistanceData }}>
				{loadingFirebase ? <Loading /> : <AppLayout />}
			</AppContext.Provider>
		</>
	);
}

function AppLayout() {
	return (
		<>
			<MyNavbar />

			<Routes>
				<Route path="/" element={<PrivateRoute />}>
					<Route path="" element={<DashboardPage />} />
				</Route>
				<Route path="/settings" element={<PrivateRoute />}>
					<Route path="" element={<SettingsPage />} />
				</Route>
				<Route path="/login" element={<PrivateRoute notAuthed to="/" />}>
					<Route path="" element={<LoginPage />} />
				</Route>
				<Route path="*" element={<NoPage />} />
			</Routes>

			<Toaster
				toastOptions={{
					className: "",
					style: {
						padding: "16px",
						backgroundColor: "#18181b",
						color: "#ecedee",
					},
				}}
			/>
		</>
	);
}
