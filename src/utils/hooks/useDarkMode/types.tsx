import { ToggleCustomEvent } from "@ionic/react";

export type DarkModeContextType = {
  isDarkModeEnabled: boolean;
  toggleDarkMode: (ev: ToggleCustomEvent) => void;
};
