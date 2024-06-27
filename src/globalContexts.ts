// This defines the global context for the app

import { createContext } from "react";
import { DEFAULT_PANELS, DEFAULT_SETTINGS } from "./static";
import { PanelConfig, UserSettings } from "./types";

// Settings context
export const UserSettingsContext = createContext<{
	userSettings: UserSettings;
	setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}>({
	userSettings: DEFAULT_SETTINGS,
	setUserSettings: () => {},
});

// Panels context
export const UserPanelsContext = createContext<{
	userPanels: PanelConfig[];
	setUserPanels: React.Dispatch<React.SetStateAction<PanelConfig[]>>;
}>({
	userPanels: DEFAULT_PANELS,
	setUserPanels: () => {},
});
