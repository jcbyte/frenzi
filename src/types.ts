export interface DistanceData {
	[key: string]: number;
}

export interface UserSettings {
	currencySymbol: string;
	distanceSymbol: string;
	distanceDecimals: number;
}

export interface FirebaseUserResponse {
	people: string[];
}

export interface FirebaseFriendDataResponse {
	distance: number;
}

export interface IAppContext {
	userSettings: UserSettings;
	setUserSettings: any;
	distanceData: DistanceData;
	setDistanceData: any;
}
