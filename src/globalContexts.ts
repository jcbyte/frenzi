import { createContext } from "react";
import { DEFAULT_SETTINGS } from "./static";
import { DistanceData, UserSettings } from "./types";

export const UserSettingsContext = createContext<{
	userSettings: UserSettings;
	setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}>({
	userSettings: DEFAULT_SETTINGS,
	setUserSettings: () => {},
});

export const DistanceDataContext = createContext<{
	distanceData: DistanceData;
	setDistanceData: React.Dispatch<React.SetStateAction<DistanceData>>;
}>({
	distanceData: {},
	setDistanceData: () => {},
});
