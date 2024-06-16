import { doc, getDoc } from "@firebase/firestore";
import { DistanceData, FirebaseFriendDataResponse, FirebaseUserResponse } from "../types";
import { auth, firestore, isAuth } from "./firebase";

const DB_NAME = "frenzi";

export async function getDistanceData() {
	if (!isAuth()) {
		// TODO make this raise
		console.log("error", "not authenticated");
		return;
	}

	var docData = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid)).then(
		(res) => res.data() as FirebaseUserResponse
	);
	// TODO catch incase of issues

	var friendData: DistanceData = {};
	docData.people.forEach(async (person) => {
		var docData = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person)).then(
			(res) => res.data() as FirebaseFriendDataResponse
		);
		friendData[person] = docData.distance;
	});
	// TODO catch for any of these

	return friendData;

	// await setDoc(doc(firestore, "frenzi", auth.currentUser.uid, "test user 1", "uid"), {
	// 	distance: 39,
	// 	date: Date.now(),
	// });
}
