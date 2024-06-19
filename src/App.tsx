import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthorisedRoute from "./components/AuthorisedRoute";
import Loading from "./components/Loading";
import MyNavbar from "./components/MyNavbar";
import { getDistanceData, getUserSettings, saveUserSettings } from "./firestore/db";
import { auth } from "./firestore/firebase";
import { UserSettingsContext } from "./globalContexts";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingsPage from "./pages/SettingsPage";
import { DEFAULT_SETTINGS } from "./static";
import { DistanceData, UserSettings } from "./types";

export default function App() {
	const [firebaseReady, setFirebaseReady] = useState<boolean>(false);
	const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);

	const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
	const [distanceData, setDistanceData] = useState<DistanceData>({});

	const retrievingUserSettings = useRef<boolean>(true);
	const retrievingDistanceData = useRef<boolean>(true);

	useEffect(() => {
		auth.authStateReady().then(() => {
			setFirebaseReady(true);
		});

		auth.onAuthStateChanged(async (user) => {
			setUserDataLoaded(false);

			if (user) {
				retrievingUserSettings.current = true;
				retrievingDistanceData.current = true;

				await getUserSettings().then((res) => {
					setUserSettings(res);
				});
				await getDistanceData().then((res) => {
					setDistanceData(res);
				});

				setUserDataLoaded(true);

				retrievingUserSettings.current = false;
				retrievingDistanceData.current = false;
			}
		});
	}, []);

	useEffect(() => {
		if (retrievingUserSettings.current) return;

		saveUserSettings(userSettings)
			.then(() => {
				toast.success("Saved");
			})
			.catch((err) => {
				toast.error(`Could not save: ${err}`);
			});
	}, [userSettings]);

	return (
		<>
			<UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
				<Loading
					loaded={firebaseReady}
					once={
						<AppLayout userDataLoaded={userDataLoaded} distanceData={distanceData} setDistanceData={setDistanceData} />
					}
				/>
			</UserSettingsContext.Provider>
		</>
	);
}

function AppLayout({
	userDataLoaded,
	distanceData,
	setDistanceData,
}: {
	userDataLoaded: boolean;
	distanceData: DistanceData;
	setDistanceData: React.Dispatch<React.SetStateAction<DistanceData>>;
}) {
	return (
		<>
			<MyNavbar />

			<Routes>
				<Route path="/" element={<AuthorisedRoute />}>
					<Route
						path=""
						element={
							<Loading
								loaded={userDataLoaded}
								once={<DashboardPage distanceData={distanceData} setDistanceData={setDistanceData} />}
							/>
						}
					/>
					<Route path="settings" element={<Loading loaded={userDataLoaded} once={<SettingsPage />} />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="*" element={<NoPage />} />
			</Routes>

			<Button
				onClick={() => {
					setDistanceData((prev) => {
						return { ...prev, sharlotte: distanceData["sharlotte"] + 1 };
					});
				}}
			>
				add miles to shalr
			</Button>

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
