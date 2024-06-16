import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

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

export async function testfb() {
	await setDoc(doc(db, "frenzi-react", "joel", "test user 1", "uid"), { distance: 39, date: Date.now() });

	// https://console.firebase.google.com/u/0/project/frenzi-420xd/firestore/databases/-default-/data/~2Ffrenzi-react~2Fjoel
}
