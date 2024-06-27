import { currencies, distanceUnits } from "../static";
import { ValidCurrencies, ValidDistanceUnits } from "../types";

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
