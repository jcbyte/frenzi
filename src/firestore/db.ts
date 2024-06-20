import { doc, getDoc } from "@firebase/firestore";
import { setDoc } from "firebase/firestore";
import { FriendData, UserSettings } from "../types";
import { auth, firestore, isAuth } from "./firebase";

const DB_NAME = "frenzi";

async function getOneFriendData(person: string): Promise<FriendData> {
	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person))
		.then((res) => {
			return { name: person, distance: res.data()?.distance };
		})
		.catch((err) => {
			throw err.message;
		});
}

export async function getFriendData(): Promise<FriendData[]> {
	if (!isAuth()) {
		throw "Not authenticated";
	}

	var friends = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data()?.people)
		.catch((err) => {
			throw err.message;
		});

	var friendDataPromises: Promise<FriendData>[] = friends.map((person: string) => getOneFriendData(person));

	return await Promise.all(friendDataPromises);
}

export async function getUserSettings(): Promise<UserSettings> {
	if (!isAuth()) {
		throw "Not authenticated";
	}

	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "settings", "data"))
		.then((res) => res.data() as UserSettings)
		.catch((err) => {
			throw err.message;
		});
}

export async function saveUserSettings(userSettings: UserSettings) {
	if (!isAuth()) {
		throw "Not authenticated";
	}

	return await setDoc(doc(firestore, "frenzi", auth.currentUser!.uid, "settings", "data"), userSettings);
}
