// This defines the global context for the app

import { createContext } from "react";
import { DEFAULT_SETTINGS } from "./static";
import { UserSettings } from "./types";

// Settings context
export const UserSettingsContext = createContext<{
	userSettings: UserSettings;
	setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}>({
	userSettings: DEFAULT_SETTINGS,
	setUserSettings: () => {},
});
