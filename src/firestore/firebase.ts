import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { firebaseResult } from "../types";
import { FIREBASE_CONFIG } from "./config";

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
// const analytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export const auth = getAuth();
auth.useDeviceLanguage();

export function isAuth(): boolean {
	return auth.currentUser != null;
}

export async function signInFirebaseGoogle() {
	const provider = new GoogleAuthProvider();
	return await signInWithPopup(auth, provider)
		.then((res) => {
			return { success: true } as firebaseResult;
		})
		.catch((err) => {
			throw { success: false, message: err.message } as firebaseResult;
		});
}

export async function signOutFirebase() {
	return await signOut(auth)
		.then(() => {
			return { success: true } as firebaseResult;
		})
		.catch((err) => {
			return { success: false, message: err.message } as firebaseResult;
		});
}
