import { PanelConfig, PersonData, UserSettings, ValidCurrencies, ValidDistanceUnits } from "./types";

// The default user settings when no user logged in or for new users
export const DEFAULT_SETTINGS: UserSettings = {
	currency: "GBP",
	distanceUnit: "Miles",
	distanceDecimals: 2,
	costPerDistance: 0.15,
};

// The default person data when adding people
export const DEFAULT_PERSON_DATA: PersonData = {
	name: "", // This must be set
	distance: 0,
};

// The default panels to show on the panel page
export const DEFAULT_PANELS: PanelConfig[] = [
	{ type: "distance", value: 5 },
	{ type: "distance", value: 10 },
	{ type: "distance", value: 20 },
	{ type: "currency", value: 10 },
];

// Records for extra data linked to valid settings
export const currencies: Record<ValidCurrencies, string> = { GBP: "£", USD: "$", EUR: "€" };
export const distanceUnits: Record<ValidDistanceUnits, string> = { Miles: "mi", Kilometers: "km" };
