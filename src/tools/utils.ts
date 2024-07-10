import { currencies, distanceUnits } from "../static";
import { ExtraPanelType, ValidCurrencies, ValidDistanceUnits } from "../types";

// helper function to round a number to a certain number of places
export function roundTo(x: number | string, places: number): number {
	return Number(Number(x).toFixed(places));
}

// Helper function to show a signed balance number in a nice format
export function readableSignedBalance(
	balance: number,
	currency: ValidCurrencies,
	digits: number = 2,
	showPositive: boolean = false
): string {
	return (balance >= 0 ? (showPositive ? "+" : "") : "-") + currencies[currency] + Math.abs(balance).toFixed(digits);
}

// Helper function to show a signed distance number in a nice format
export function readableSignedDistance(
	distance: number,
	distanceUnit: ValidDistanceUnits,
	digits: number,
	showPositive: boolean = false
): string {
	return (
		(distance >= 0 ? (showPositive ? "+" : "") : "-") + Math.abs(distance).toFixed(digits) + distanceUnits[distanceUnit]
	);
}

export function getExtraPanelName(
	panelType: ExtraPanelType,
	currency: ValidCurrencies,
	distanceUnit: ValidDistanceUnits
): string {
	if (panelType === "currency") return `Other ${currencies[currency]}`;
	if (panelType === "distance") return `Other ${distanceUnits[distanceUnit]}`;
	if (panelType === "new") return "New Panel";

	return "Panel name not defined";
}
