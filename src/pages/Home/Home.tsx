import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { usePhotoGallery } from "../../utils/hooks/usePhotoGallery";
import { transformImageToText } from "../../utils/transformImageToText";

export const Home: React.FC = () => {
  const { takePhoto } = usePhotoGallery();

  const handleCapture = async () => {
    const receiptImage = await takePhoto();

    if (!receiptImage?.base64String) return;

    try {
      await transformImageToText(receiptImage.base64String);
      console.log("image transformed");
    } catch (error) {
      console.log("error for image processing", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bill Sharing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Click the below button to capture a receipt
      </IonContent>
      <IonFooter className="ion-margin-bottom">
        <div className="ion-text-center">
          <IonButton onClick={handleCapture}>
            <IonIcon slot="start" icon={camera}></IonIcon>
            Capture Receipt
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};
