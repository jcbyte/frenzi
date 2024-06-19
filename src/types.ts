export interface DistanceData {
	[key: string]: number;
}

export interface UserSettings {
	currency: ValidCurrencies;
	distanceUnit: ValidDistanceUnits;
	distanceDecimals: number;
	costPerDistance: number;
}

export interface FirebaseUserResponse {
	people: string[];
}

export interface FirebaseFriendDataResponse {
	distance: number;
}

export type ValidCurrencies = "GBP" | "USD" | "EUR";
export type ValidDistanceUnits = "Miles" | "Kilometers";
