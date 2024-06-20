import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Loading from "./components/Loading";
import { getFriendData, getUserSettings, saveUserSettings } from "./firestore/db";
import { auth } from "./firestore/firebase";
import { UserSettingsContext } from "./globalContexts";
import { DEFAULT_SETTINGS } from "./static";
import { FriendData, UserSettings } from "./types";

export default function App() {
	// Flags describing if certain services or data is loaded (these require re-render)
	const [firebaseReady, setFirebaseReady] = useState<boolean>(false);
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);
	// Flags describing if we are currently getting data from firestore to prevent re saving them on update
	const retrievingUserSettings = useRef<boolean>(true);
	const retrievingFriendData = useRef<boolean>(true);

	// The local copy of data retrieved from firestore
	const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
	const [friendData, setFriendData] = useState<FriendData[]>([]);

	// On mount
	useEffect(() => {
		// Once firebase service is loaded the flag is set
		auth.authStateReady().then(() => {
			setFirebaseReady(true);
		});

		// Function to run when firebase auth change (user signs in/out)
		auth.onAuthStateChanged(async (user) => {
			// We set the loading data flag to false our current data is now stale
			setDataLoaded(false);

			if (user) {
				// If the user has signed in then we need to load the data from firestore
				// so set our retrieving data flags
				retrievingUserSettings.current = true;
				retrievingFriendData.current = true;

				// Wait for both of our firestore calls to finish and set the results
				await getUserSettings().then((res) => {
					setUserSettings(res);
				});
				await getFriendData().then((res) => {
					setFriendData(res);
				});

				// Once finished then our local data is correct so set the flag
				setDataLoaded(true);

				// Data is now loaded so we un set our retrieving data flags
				retrievingUserSettings.current = false;
				retrievingFriendData.current = false;
			}
		});
	}, []);

	// When `userSettings` are changed we need to save them to firestore
	useEffect(() => {
		// If they have changed due to loading them then do not save
		if (retrievingUserSettings.current) return;

		// Save the settings and show toast feedback to user
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
			{/* Use context provider to access settings from anywhere within the app */}
			<UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
				{/* Do not show the app until firebase service starts as we do not know if you are logged in until then */}
				<Loading
					loaded={firebaseReady}
					once={<AppRoutes dataLoaded={dataLoaded} friendData={friendData} setFriendData={setFriendData} />}
				/>
			</UserSettingsContext.Provider>

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
