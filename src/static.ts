import { FriendData, UserSettings, ValidCurrencies, ValidDistanceUnits } from "./types";

// The default user settings when no user logged in or for new users
export const DEFAULT_SETTINGS: UserSettings = {
	currency: "GBP",
	distanceUnit: "Miles",
	distanceDecimals: 2,
	costPerDistance: 0.15,
};

// The default friend data when adding friends
export const DEFAULT_FRIEND_DATA: FriendData = {
	name: "", // This must be set
	distance: 0,
};

// Records for extra data linked to valid settings
export const currencies: Record<ValidCurrencies, string> = { GBP: "£", USD: "$", EUR: "€" };
export const distanceUnits: Record<ValidDistanceUnits, string> = { Miles: "mi", Kilometers: "km" };
