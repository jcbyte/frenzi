import { doc, setDoc } from "@firebase/firestore";
import { auth, firestore } from "./firebase";

export async function testfb() {
	if (auth.currentUser == null) {
		console.log("error", "not authenticated");
		return;
	}

	await setDoc(doc(firestore, "frenzi", auth.currentUser.uid, "test user 1", "uid"), {
		distance: 39,
		date: Date.now(),
	});
}
