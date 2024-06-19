import { UserSettings, ValidCurrencies } from "./types";

export const DEFAULT_SETTINGS: UserSettings = {
	currency: "GBP",
	distanceUnit: "Miles",
	distanceDecimals: 2,
	costPerDistance: 0.15,
};

export const currencies: Record<ValidCurrencies, string> = { GBP: "£", USD: "$", EUR: "€" };
export const distanceUnits = { Miles: "mi", Kilometers: "km" };
