export interface DistanceData {
	[key: string]: number;
}

export interface UserSettings {
	currencySymbol: string;
	currencyDecimals: number;
	distanceSymbol: string;
	distanceDecimals: number;
}

export interface FirebaseUserResponse {
	people: string[];
}

export interface FirebaseFriendDataResponse {
	distance: number;
}
