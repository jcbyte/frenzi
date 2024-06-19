import { createContext } from "react";
import { DEFAULT_SETTINGS } from "./static";
import { UserSettings } from "./types";

export const UserSettingsContext = createContext<{
	userSettings: UserSettings;
	setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}>({
	userSettings: DEFAULT_SETTINGS,
	setUserSettings: () => {},
});
