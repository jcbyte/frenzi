import { doc, getDoc, setDoc } from "@firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { DEFAULT_PERSON_DATA, DEFAULT_SETTINGS } from "../static";
import { PersonData, PersonInternalData, UserSettings } from "../types";
import { auth, firestore, isAuth } from "./firebase";

const DB_NAME = "frenzi";

// Check if this is the first time user is using frenzi
async function isNewUser(): Promise<boolean> {
	// If the current user document exists then the user exists
	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid)).then((res) => !res.exists());
}

// If this is the first time the user is using frenzi then we will initialise there firestore
// Returns true if this was a new user
export async function initialiseNewUser(): Promise<boolean> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// If it is a new user then set up there firestore
	if (await isNewUser()) {
		setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "settings", "data"), DEFAULT_SETTINGS);
		setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid), { people: [] });
		return true;
	}

	return false;
}

// Retrieve a singular persons data from to firestore
async function getPersonData(person: string): Promise<PersonData> {
	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person))
		.then((res) => {
			return { ...(res.data() as PersonInternalData), name: person };
		})
		.catch((err) => {
			throw new Error(err.message);
		});
}

// Retrieve all people data from to firestore
export async function getPeopleData(): Promise<PersonData[]> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// Get a list of all peoples names from an array on users profile
	var people: string[] = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data()!.people)
		.catch((err) => {
			throw new Error(err.message);
		});

	// TODO uncaught error when people array has person who does not have a document

	// Create an array of promises to return the people data
	var peopleDataPromises: Promise<PersonData>[] = people.map((person: string) => getPersonData(person));

	// Once all promises have returned then return the array of PersonData which has been retrieved
	return await Promise.all(peopleDataPromises).catch((err) => {
		throw new Error(err.message);
	});
}

// ! UNTESTED
// Update person data in firestore
export async function _updatePersonData(personData: PersonData) {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	return await setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", personData.name), personData).catch(
		(err) => {
			throw new Error(err.message);
		}
	);
}

// Add new person to firestore
export async function addPerson(person: string) {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// Get a list of the current people in firestore
	var people: string[] = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data()!.people)
		.catch((err) => {
			throw new Error(err.message);
		});

	// If the person already exists then throw an exception
	if (people.includes(person)) {
		throw new Error("Name already exists");
	}
	people.push(person);

	// Add the person with default data
	await Promise.all([
		setDoc(doc(firestore, DB_NAME + "Jk", auth.currentUser!.uid), { people: people }).catch((err) => {
			throw new Error(err.message);
		}),
		setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person), {
			...DEFAULT_PERSON_DATA,
			name: person,
		}).catch((err) => {
			throw new Error(err.message);
		}),
	]);
}

// ! UNTESTED
// Delete person from firestore
export async function _removePerson(person: string) {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// Get a list of the current people in firestore
	var people: string[] = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data()!.people)
		.catch((err) => {
			throw new Error(err.message);
		});

	// If the person doesn't exists then throw an exception otherwise remove this one and save it
	if (!people.includes(person)) {
		throw new Error("Name does not exists");
	}
	people.splice(people.indexOf(person), 1);

	// Remove this person and there respective data
	await Promise.all([
		setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid), { people: people }).catch((err) => {
			throw new Error(err.message);
		}),
		deleteDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person)).catch((err) => {
			throw new Error(err.message);
		}),
	]);
}

// Retrieve the settings from to firestore
export async function getUserSettings(): Promise<UserSettings> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "settings", "data"))
		.then((res) => res.data() as UserSettings)
		.catch((err) => {
			throw new Error(err.message);
		});
}

// Save the settings back to firestore
export async function saveUserSettings(userSettings: UserSettings): Promise<void> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	return await setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "settings", "data"), userSettings);
}
