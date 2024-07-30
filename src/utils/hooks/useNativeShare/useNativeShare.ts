import { Share } from "@capacitor/share";
import { NativeShareOptions } from "./types";

export const useNativeShare = () => {
  const share = async (options: NativeShareOptions) => {
    const result = await Share.share(options);
    return result;
  };

  return {
    share,
  };
};
