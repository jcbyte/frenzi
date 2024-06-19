import { doc, getDoc } from "@firebase/firestore";
import { setDoc } from "firebase/firestore";
import { DistanceData, FirebaseFriendDataResponse, FirebaseUserResponse, UserSettings } from "../types";
import { auth, firestore, isAuth } from "./firebase";

const DB_NAME = "frenzi";

export async function getDistanceData(): Promise<DistanceData> {
	if (!isAuth()) {
		throw "Not authenticated";
	}

	var docData = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data() as FirebaseUserResponse)
		.catch((err) => {
			throw err.message;
		});

	var friendData: DistanceData = {};
	docData.people.forEach(async (person) => {
		var docData = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person))
			.then((res) => res.data() as FirebaseFriendDataResponse)
			.catch((err) => {
				throw err.message;
			});
		friendData[person] = docData.distance;
	});

	return friendData;
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
