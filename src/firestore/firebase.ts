import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { FIREBASE_CONFIG } from "./config";

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
// const analytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export const auth = getAuth();
auth.useDeviceLanguage();

export function signInFirebaseGoogle() {
	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			console.log("success");
		})
		.catch((error) => {
			const errorMessage = error.message;
			console.log("error", errorMessage);
		});
}

export function signOutFirebase() {
	signOut(auth)
		.then(() => {
			console.log("success");
		})
		.catch((error) => {
			const errorMessage = error.message;
			console.log("error", errorMessage);
		});
}
