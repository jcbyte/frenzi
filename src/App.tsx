import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthorisedRoute from "./components/AuthorisedRoute";
import Loading from "./components/Loading";
import MyNavbar from "./components/MyNavbar";
import { auth } from "./firestore/firebase";
import { DistanceDataContext, LoadedStatusContext, UserSettingsContext } from "./globalContexts";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingsPage from "./pages/SettingsPage";
import { DEFAULT_SETTINGS } from "./static";
import { DistanceData, LoadedStatus, UserSettings } from "./types";

export default function App() {
	const [loadedStatus, setLoadedStatus] = useState<LoadedStatus>({
		firebaseAuth: false,
		userSettings: false,
		distanceData: false,
	});

	const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
	const [distanceData, setDistanceData] = useState<DistanceData>({});

	useEffect(() => {
		auth.authStateReady().then(() => {
			setLoadedStatus({ ...loadedStatus, firebaseAuth: true });

			// getUserSettings().then((res) => {
			// 	setUserSettings(res);
			// 	setLoadedStatus({ ...loadedStatus, userSettings: true });
			// });

			// getDistanceData().then((res) => {
			// 	setDistanceData(res);
			// 	setLoadedStatus({ ...loadedStatus, distanceData: true });
			// });
		});
	}, []);

	return (
		// This means that whenever any of these contexts are updated the entire app will need to be rerendered. can this be done better?
		<>
			<LoadedStatusContext.Provider value={{ loadedStatus, setLoadedStatus }}>
				<UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
					<DistanceDataContext.Provider value={{ distanceData, setDistanceData }}>
						<Loading loaded={true} Outlet={<AppLayout />} />
					</DistanceDataContext.Provider>
				</UserSettingsContext.Provider>
			</LoadedStatusContext.Provider>

			<Button
				onClick={() => {
					console.log(loadedStatus);
					console.log(auth.currentUser?.displayName);
					console.log(userSettings);
					console.log(distanceData);
				}}
				color="primary"
			>
				get data
			</Button>
		</>
	);
}

function AppLayout() {
	return (
		<>
			<MyNavbar />

			<Routes>
				<Route path="/" element={<AuthorisedRoute />}>
					<Route path="" element={<DashboardPage />} />
					<Route path="settings" element={<SettingsPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
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
