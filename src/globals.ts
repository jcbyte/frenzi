import { UserSettings } from "./types";

export var settings: UserSettings = {
	currencySymbol: "£",
	distanceSymbol: "mi",
	distanceDecimals: 2,
};

export const currencies = { GBP: "£", USD: "$" };
export const distances = { Miles: "mi", Kilometers: "km" };
