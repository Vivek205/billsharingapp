import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { convertUriToBase64 } from "../receiptProcessing";

export function usePhotoGallery() {
  const resultType = Capacitor.isNativePlatform()
    ? CameraResultType.Uri
    : CameraResultType.Base64;

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType,
        source: CameraSource.Prompt,
        quality: 100,
        allowEditing: true,
        webUseInput: true,
      });

      if (!photo.base64String) {
        photo.base64String = await convertUriToBase64(photo.webPath as string);
      }
      console.log("photo", photo);
      return photo;
    } catch (error) {
      console.log("known error", error);
      throw error;
    }
  };

  return {
    takePhoto,
  };
}
