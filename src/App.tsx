import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthorisedRoute from "./components/AuthorisedRoute";
import Loading from "./components/Loading";
import MyNavbar from "./components/MyNavbar";
import { getFriendData, getUserSettings, saveUserSettings } from "./firestore/db";
import { auth } from "./firestore/firebase";
import { UserSettingsContext } from "./globalContexts";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SettingsPage from "./pages/SettingsPage";
import { DEFAULT_SETTINGS } from "./static";
import { FriendData, UserSettings } from "./types";

export default function App() {
	const [firebaseReady, setFirebaseReady] = useState<boolean>(false);
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);

	const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
	const [friendData, setFriendData] = useState<FriendData[]>([]);

	const retrievingUserSettings = useRef<boolean>(true);
	const retrievingFriendData = useRef<boolean>(true);

	useEffect(() => {
		auth.authStateReady().then(() => {
			setFirebaseReady(true);
		});

		auth.onAuthStateChanged(async (user) => {
			setDataLoaded(false);

			if (user) {
				retrievingUserSettings.current = true;
				retrievingFriendData.current = true;

				await getUserSettings().then((res) => {
					setUserSettings(res);
				});
				await getFriendData().then((res) => {
					setFriendData(res);
				});

				setDataLoaded(true);

				retrievingUserSettings.current = false;
				retrievingFriendData.current = false;
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

	useEffect(() => {
		console.log(friendData);
	}, [friendData]);

	return (
		<>
			<UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
				<Loading
					loaded={firebaseReady}
					once={<AppLayout dataLoaded={dataLoaded} friendData={friendData} setFriendData={setFriendData} />}
				/>
			</UserSettingsContext.Provider>
		</>
	);
}

function AppLayout({
	dataLoaded,
	friendData,
	setFriendData,
}: {
	dataLoaded: boolean;
	friendData: FriendData[];
	setFriendData: React.Dispatch<React.SetStateAction<FriendData[]>>;
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
								loaded={dataLoaded}
								once={<DashboardPage friendData={friendData} setFriendData={setFriendData} />}
							/>
						}
					/>
					<Route path="settings" element={<Loading loaded={dataLoaded} once={<SettingsPage />} />} />
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
