export function roundTo(x: number | string, places: number): number {
	return Number(Number(x).toFixed(places));
}
