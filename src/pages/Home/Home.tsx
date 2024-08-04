import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { add, camera, logOut } from "ionicons/icons";
import { usePhotoGallery } from "../../utils/hooks/usePhotoGallery";
import { useReceiptProcessingContext } from "../../utils/receiptProcessing";
import { Routes } from "../../Routes";
import { HOME_PAGE_MENU_ID } from "./constants";
import { signout } from "../../utils/auth/firebase";

import "./Home.css";

export const Home: React.FC = () => {
  const { takePhoto } = usePhotoGallery();
  const router = useIonRouter();
  const { setRawImage } = useReceiptProcessingContext();

  const handleCapture = async () => {
    try {
      const receiptImage = await takePhoto();

      if (!receiptImage?.base64String) return;

      setRawImage(receiptImage.base64String);

      // TODO: Remove the below line
      return router.push(Routes.ReadingReceipt, "forward");
      // TODO: Afer capturing the image, redirect to ReadingReceipt
    } catch (error) {
      console.log("error in capture", error);
      alert("Error capturing image");
    }

    // try {
    //   await transformImageToText(receiptImage.base64String);
    //   console.log("image transformed");
    // } catch (error) {
    //   console.log("error for image processing", error);
    // }
  };

  const handleLogout = async () => {
    try {
      await signout();
      router.push(Routes.Login);
    } catch (error) {
      console.log("error for logout", error);
    }
  };

  const redirectToBankDetails = () => {
    router.push(Routes.BankDetails, "none");
  };

  return (
    <>
      <IonMenu type="push" side="end" contentId={HOME_PAGE_MENU_ID}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem onClick={handleLogout}>
              <IonIcon slot="start" icon={logOut} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id={HOME_PAGE_MENU_ID}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
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
              // routerLink={Routes.BankDetails}
              // routerDirection="forward"
              onClick={redirectToBankDetails}
            >
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonItem>
          <IonItem color="light" className="ion-margin-top">
            <IonLabel>
              No expenses yet. Capture a receipt to start splitting the bills
            </IonLabel>
          </IonItem>
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
    </>
  );
};
