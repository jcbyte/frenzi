import { Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./AppRoutes";
import MyNavbar from "./components/MyNavbar";
import { getPeopleData, getUserSettings, initialiseNewUser, saveUserSettings } from "./firestore/db";
import { auth } from "./firestore/firebase";
import { UserSettingsContext } from "./globalContexts";
import { DEFAULT_SETTINGS } from "./static";
import { PersonData, UserSettings } from "./types";

export default function App() {
	// Flags describing if certain services or data is loaded (these require re-render)
	const [firebaseReady, setFirebaseReady] = useState<boolean>(false);
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);
	// Flags describing if we are currently getting data from firestore to prevent re saving them on update
	const retrievingUserSettings = useRef<boolean>(true);
	const retrievingPeopleData = useRef<boolean>(true);

	// The local copy of data retrieved from firestore
	const [userSettings, setUserSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
	const [peopleData, setPeopleData] = useState<PersonData[]>([]);

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
				retrievingPeopleData.current = true;

				// If this is the first time the user has logged on then setup there files on firestore
				if (await initialiseNewUser()) {
					setUserSettings(DEFAULT_SETTINGS);
					setPeopleData([]);
					setDataLoaded(true);
				} else {
					// Retrieve and set data from firestore
					var getDataPromises: Promise<void>[] = [
						getUserSettings().then((res) => {
							setUserSettings(res);
						}),
						getPeopleData().then((res) => {
							setPeopleData(res);
						}),
					];

					await Promise.all(getDataPromises)
						.then((res) => {
							// Once finished then our local data is correct so set the flag
							setDataLoaded(true);
						})
						.catch((err) => {
							// If there is an error then show toast feedback to the user
							toast.error(`Could not load user data: ${err.message}`);
						});
				}

				// Data is now loaded so we un set our retrieving data flags
				retrievingUserSettings.current = false;
				retrievingPeopleData.current = false;
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
				toast.error(`Could not save: ${err.message}`);
			});
	}, [userSettings]);

	return (
		<>
			<MyNavbar />

			{/* Use context provider to access settings from anywhere within the app */}
			<UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
				{/* Do not show the app until firebase service starts as we do not know if you are logged in until then */}
				{firebaseReady ? (
					<AppRoutes dataLoaded={dataLoaded} peopleData={peopleData} setPeopleData={setPeopleData} />
				) : (
					<Spinner label="Initialising Google Services" color="primary" size="lg" className="w-full mx-auto my-10" />
				)}
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
