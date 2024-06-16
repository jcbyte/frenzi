export interface FirebaseResult {
	success: boolean;
	message?: string;
}

export interface FirebaseDBResult {
	success: boolean;
	data?: Object;
	// TODO ? individual data returns?
}

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
