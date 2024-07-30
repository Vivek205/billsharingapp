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
import { transformImageToText } from "../../utils/transformImageToText";
import { Routes } from "../../Routes";
import { HOME_PAGE_MENU_ID } from "./constants";
import { signout } from "../../utils/auth/firebase";

export const Home: React.FC = () => {
  const { takePhoto } = usePhotoGallery();
  const router = useIonRouter();

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

  const handleLogout = async () => {
    try {
      await signout();
      router.push(Routes.Login);
    } catch (error) {
      console.log("error for logout", error);
    }
  };

  return (
    <>
      <IonMenu type="push" contentId={HOME_PAGE_MENU_ID}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
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
            <IonButtons slot="start">
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
    </>
  );
};
