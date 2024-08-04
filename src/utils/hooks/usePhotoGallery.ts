import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

export function usePhotoGallery() {
  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100,
        allowEditing: true,
      });
      console.log("photo", photo);
      return photo;
    } catch (error) {
      console.log("known error", error);
    }
  };

  return {
    takePhoto,
  };
}
