import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { FIREBASE_CONFIG } from "./config";

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
// const analytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export const auth = getAuth();
auth.useDeviceLanguage();

// Returns whether the user is logged in
// We should use the state variable within `App.tsx` if we require re-render, using this function will not
export function isAuth(): boolean {
	return auth.currentUser != null;
}

// Use firebase to sign in using google
export async function signInFirebaseGoogle(): Promise<void> {
	const provider = new GoogleAuthProvider();
	return await signInWithPopup(auth, provider)
		.then((res) => {
			return;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

// Use firebase to sign out
export async function signOutFirebase(): Promise<void> {
	return await signOut(auth)
		.then(() => {
			return;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}
