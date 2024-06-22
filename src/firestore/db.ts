import { doc, getDoc, setDoc } from "@firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { DEFAULT_PERSON_DATA, DEFAULT_SETTINGS } from "../static";
import { PersonData, UserSettings } from "../types";
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

// Check that the firestore database is as expected and repair it if is not
// returns true if a repair had to be done
export async function checkRepairFirestore(): Promise<boolean> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// Get a list of all peoples names from an array on users profile
	let people: string[] = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data()!.people)
		.catch((err) => {
			throw new Error(err.message);
		});

	// Create an array of promises to return the person and if there document exists
	let peopleExistPromise: Promise<{ name: string; exists: boolean }>[] = people.map(async (person: string) => {
		return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person))
			.then((res) => {
				return { name: person, exists: res.exists() };
			})
			.catch((err) => {
				throw new Error(err.message);
			});
	});

	// Get an array of names of people which are on users profile but do not have a document
	let nonExistingPeople = await Promise.all(peopleExistPromise)
		.then((peopleExist) =>
			peopleExist.filter((personExists) => !personExists.exists).map((personExists) => personExists.name)
		)
		.catch((err) => {
			throw new Error(err.message);
		});

	if (nonExistingPeople.length === 0) return false;

	// Add the document to all these people
	let peopleRepairedPromise: Promise<void>[] = nonExistingPeople.map(async (person: string) => {
		await setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person), {
			...DEFAULT_PERSON_DATA,
			name: person,
		}).catch((err) => {
			throw new Error(err.message);
		});
	});

	await Promise.all(peopleRepairedPromise).catch((err) => {
		throw new Error(err.message);
	});

	return true;
}

// Retrieve a singular persons data from to firestore
async function getPersonData(person: string): Promise<PersonData> {
	return await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", person))
		.then((res) => res.data() as PersonData)
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
	let people: string[] = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data()!.people)
		.catch((err) => {
			throw new Error(err.message);
		});

	// Create an array of promises to return the people data
	let peopleDataPromises: Promise<PersonData>[] = people.map((person: string) => getPersonData(person));

	// Once all promises have returned then return the array of PersonData which has been retrieved
	return await Promise.all(peopleDataPromises).catch((err) => {
		throw new Error(err.message);
	});
}

// Update person data in firestore
export async function updatePersonData(personData: PersonData): Promise<void> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	await setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "people", personData.name), personData).catch((err) => {
		throw new Error(err.message);
	});
}

// Add new person to firestore
export async function addPerson(person: string): Promise<void> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// Get a list of the current people in firestore
	let people: string[] = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
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
		setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid), { people: people }).catch((err) => {
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

// Delete person from firestore
export async function removePerson(person: string): Promise<void> {
	// If not logged in then throw an exception
	if (!isAuth()) {
		throw new Error("Not authenticated");
	}

	// Get a list of the current people in firestore
	let people: string[] = await getDoc(doc(firestore, DB_NAME, auth.currentUser!.uid))
		.then((res) => res.data()!.people)
		.catch((err) => {
			throw new Error(err.message);
		});

	// If the person doesn't exists then throw an exception otherwise remove this one and save it
	if (!people.includes(person)) {
		throw new Error("Person does not exists");
	}
	people = people.filter((personName: string) => personName !== person);

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

	await setDoc(doc(firestore, DB_NAME, auth.currentUser!.uid, "settings", "data"), userSettings).catch((err) => {
		throw new Error(err.message);
	});
}
