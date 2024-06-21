import { doc, getDoc } from "@firebase/firestore";
import { setDoc } from "firebase/firestore";
import { DEFAULT_SETTINGS } from "../static";
import { FriendData, FriendInternalData, UserSettings } from "../types";
import { auth, firestore, isAuth } from "./firebase";

const DB_NAME = "frenzi";

// Check if this is the first time user is using frenzi
async function isNewUser(): Promise<boolean> {
	// If the current user document exists then the user exists
	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid)).then((res) => !res.exists());
}

// If this is the first time the user is using frenzi then we will initialise there firestore
// Returns true if this was a new user
export async function initialiseNewUser(): Promise<boolean> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// If it is a new user then set up there firestore
	if (await isNewUser()) {
		setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "settings", "data"), DEFAULT_SETTINGS);
		setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid), { people: [] });
		return true;
	}

	return false;
}

// Retrieve a singular friends data from to firestore
async function getOneFriendData(person: string): Promise<FriendData> {
	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person))
		.then((res) => {
			return { ...(res.data() as FriendInternalData), name: person };
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

// Retrieve all friend data from to firestore
export async function getFriendData(): Promise<FriendData[]> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// Get a list of all friends names from an array on users profile
	var friends = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data()!.people)
		.catch((err) => {
			throw new Error(err.message);
		});

	// TODO uncaught error when people array has person who does not have a document

	// Create an array of promises to return the friend data
	var friendDataPromises: Promise<FriendData>[] = friends.map((person: string) => getOneFriendData(person));

	// Once all promises have returned then return the array of FriendData which has been retrieved
	return await Promise.all(friendDataPromises).catch((err) => {
		throw new Error(err.message);
	});
}

// Retrieve the settings from to firestore
export async function getUserSettings(): Promise<UserSettings> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "settings", "data"))
		.then((res) => res.data() as UserSettings)
		.catch((err) => {
			throw new Error(err.message);
		});
}

// Save the settings back to firestore
export async function saveUserSettings(userSettings: UserSettings): Promise<void> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	return await setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "settings", "data"), userSettings);
}
