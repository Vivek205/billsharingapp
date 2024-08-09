import { ToggleCustomEvent } from "@ionic/react";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DarkModeContextType } from "./types";

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkModeEnabled: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleDarkMode = (ev: ToggleCustomEvent) => {
    // TODO: call the handler to set the dark mode flag in the capacitor preferences
    toggleDarkPaletteCssClass(ev.detail.checked);
  };

  // Add or remove the "ion-palette-dark" class on the html element
  const toggleDarkPaletteCssClass = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
  };

  // Check/uncheck the toggle and update the palette based on isDark
  const initializeDarkPalette = (isDark: boolean) => {
    setIsDarkModeEnabled(isDark);
    toggleDarkPaletteCssClass(isDark);
  };

  useEffect(() => {
    // TODO: Get the preference from the capacitor preferences and rest should be ignored if the user has set the preference.

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    console.log("prefersDark", prefersDark);

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkPalette(prefersDark.matches);

    const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
      initializeDarkPalette(mediaQuery.matches);
    };

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change", setDarkPaletteFromMediaQuery);

    return () => {
      prefersDark.removeEventListener("change", setDarkPaletteFromMediaQuery);
    };
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkModeEnabled, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  if (!DarkModeContext) {
    throw new Error(
      "useDarkModeContext must be used within a DarkModeProvider"
    );
  }
  return useContext(DarkModeContext);
};
