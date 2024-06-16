import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

const FIREBASE_CONFIG = {
	apiKey: "AIzaSyAx9aHOa68wloVao1UTI7AXZTjJvuZuB_c",
	authDomain: "frenzi-420xd.firebaseapp.com",
	projectId: "frenzi-420xd",
	storageBucket: "frenzi-420xd.appspot.com",
	messagingSenderId: "697896495243",
	appId: "1:697896495243:web:0dd254727dbf46f1da0c8e",
	measurementId: "G-G97DKKJJVW",
};

const fbApp = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(fbApp);
// const analytics = getAnalytics(fbApp);

const provider = new GoogleAuthProvider();

const auth = getAuth();
auth.useDeviceLanguage();

export function loginWithGoogle() {
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			console.log(credential);
			const token = credential?.accessToken;
			console.log(token);
			// The signed-in user info.
			const user = result.user;
			console.log(user);
			// IdP data available using getAdditionalUserInfo(result)
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			console.log(errorCode);
			const errorMessage = error.message;
			console.log(errorMessage);
			// The email of the user's account used.
			const email = error.customData.email;
			console.log(email);
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.log(credential);
			// ...
		});
}

export function signOutOfGoogle() {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		});
}

export async function testfb() {
	if (auth.currentUser == null) return;

	await setDoc(doc(db, "frenzi", auth.currentUser.uid, "test user 1", "uid"), { distance: 39, date: Date.now() });
}
