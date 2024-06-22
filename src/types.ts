// Type definition for a persons data, the app will store a PersonData[]
export interface PersonInternalData {
	distance: number;
}
export interface PersonData extends PersonInternalData {
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
