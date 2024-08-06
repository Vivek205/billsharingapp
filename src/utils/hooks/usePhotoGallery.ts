import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";

export function usePhotoGallery() {
  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 100,
        allowEditing: true,
        webUseInput: true,
      });
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
