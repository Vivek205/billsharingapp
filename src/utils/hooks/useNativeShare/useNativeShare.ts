import { Share } from "@capacitor/share";
import { NativeShareOptions } from "./types";
import { Capacitor } from "@capacitor/core";

export const useNativeShare = () => {
  const share = async (options: NativeShareOptions) => {
    if (Capacitor.isNativePlatform()) {
      const result = await Share.share(options);
      return result;
    }
    if (navigator.share) {
      return navigator.share({
        title: options.title,
        text: options.text,
        url: options.url,
      });
    }
  };

  return {
    share,
  };
};
