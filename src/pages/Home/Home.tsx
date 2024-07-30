import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, camera } from "ionicons/icons";
import { usePhotoGallery } from "../../utils/hooks/usePhotoGallery";
import { transformImageToText } from "../../utils/transformImageToText";
import { Routes } from "../../Routes";

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
        <IonItem color="light">
          <IonLabel>
            Enter your bank details to start receiving payments
          </IonLabel>
          <IonButton
            slot="end"
            routerLink={Routes.BankDetails}
            routerDirection="forward"
          >
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </IonItem>
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
