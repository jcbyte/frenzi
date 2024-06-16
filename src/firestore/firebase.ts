import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { FirebaseResult } from "../types";
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
			return { success: true } as FirebaseResult;
		})
		.catch((err) => {
			throw { success: false, message: err.message } as FirebaseResult;
		});
}

export async function signOutFirebase() {
	return await signOut(auth)
		.then(() => {
			return { success: true } as FirebaseResult;
		})
		.catch((err) => {
			return { success: false, message: err.message } as FirebaseResult;
		});
}
