import { Preferences } from "@capacitor/preferences";
import { PreferenceKeys } from "./types";

export const usePreference = () => {
  const setPreference = (key: PreferenceKeys, value: string) => {
    return Preferences.set({ key, value });
  };

  const getPreference = async (key: PreferenceKeys) => {
    const { value } = await Preferences.get({ key });
    return value;
  };

  return {
    setPreference,
    getPreference,
  };
};
