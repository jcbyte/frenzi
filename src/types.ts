// Type definition for a friends data, the app will store a FriendData[]
export interface FriendInternalData {
	distance: number;
}
export interface FriendData extends FriendInternalData {
	name: string;
}

// Type definition for user settings
export interface UserSettings {
	currency: ValidCurrencies;
	distanceUnit: ValidDistanceUnits;
	distanceDecimals: number;
	costPerDistance: number;
}

// List of valid settings (the records for these are in `static.ts`)
export type ValidCurrencies = "GBP" | "USD" | "EUR";
export type ValidDistanceUnits = "Miles" | "Kilometers";
