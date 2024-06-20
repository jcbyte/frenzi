export interface FriendData {
	name: string;
	distance: number;
}

export interface UserSettings {
	currency: ValidCurrencies;
	distanceUnit: ValidDistanceUnits;
	distanceDecimals: number;
	costPerDistance: number;
}

export type ValidCurrencies = "GBP" | "USD" | "EUR";
export type ValidDistanceUnits = "Miles" | "Kilometers";
