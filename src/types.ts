// Type definition for a persons data, the app will store a PersonData[]
export interface PersonData {
	name: string;
	distance: number;
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

// The configuration for a panel
export type PanelConfig =
	| {
			extra: false;
			type: PanelConfigType;
			value: number;
			label?: string;
	  }
	| {
			extra: true;
			type: ExtraPanelType;
	  };
export type PanelConfigType = "currency" | "distance";
export type ExtraPanelType = PanelConfigType | "new";
