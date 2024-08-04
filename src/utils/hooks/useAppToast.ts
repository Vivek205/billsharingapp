import { useIonToast } from "@ionic/react";
import type { Color } from "@ionic/core";

const TOAST_DURATION = 3000;

export const UseAppToast = () => {
  const [ionPresent, dismiss] = useIonToast();
  const present = (message: string, color: Color = "danger") => {
    return ionPresent({
      message,
      duration: TOAST_DURATION,
      position: "top",
      color,
    });
  };

  return [present, dismiss];
};
