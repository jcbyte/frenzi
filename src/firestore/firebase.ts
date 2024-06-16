import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { FIREBASE_CONFIG } from "./config";

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
// const analytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export const auth = getAuth();
auth.useDeviceLanguage();

export function isAuth(): boolean {
	return auth.currentUser != null;
}

export async function signInFirebaseGoogle(): Promise<void> {
	const provider = new GoogleAuthProvider();
	return await signInWithPopup(auth, provider)
		.then((res) => {
			return;
		})
		.catch((err) => {
			throw err.message;
		});
}

export async function signOutFirebase(): Promise<void> {
	return await signOut(auth)
		.then(() => {
			return;
		})
		.catch((err) => {
			return err.message;
		});
}
