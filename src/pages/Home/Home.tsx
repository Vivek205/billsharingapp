import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { add, camera, logOut } from "ionicons/icons";
import { usePhotoGallery } from "../../utils/hooks/usePhotoGallery";
import {
  convertUriToBase64,
  useReceiptProcessingContext,
} from "../../utils/receiptProcessing";
import { Routes } from "../../Routes";
import { HOME_PAGE_MENU_ID } from "./constants";
import { signout, useFirebaseContext } from "../../utils/auth/firebase";

import "./Home.css";
import { UseAppToast } from "../../utils/hooks/useAppToast";
import { useEffect, useState } from "react";
import {
  getReceiptsByIds,
  getUserReceipts,
  Receipt,
} from "../../utils/database/firestore";
import { Capacitor } from "@capacitor/core";
import { CapturedReceipt } from "../../utils/receiptProcessing/types";

export const Home: React.FC = () => {
  const { takePhoto } = usePhotoGallery();
  const router = useIonRouter();
  const { setCapturedReceipt: setCapturedReceipt } =
    useReceiptProcessingContext();
  const [present] = UseAppToast();
  const { user } = useFirebaseContext();
  const [userReceipts, setUserReceipts] = useState<Receipt[]>([]);

  const getUserReceiptDetails = async (userId: string) => {
    const receiptIds = await getUserReceipts(userId);
    console.log("receipt ids", receiptIds);
    if (!receiptIds) return;
    const receipts = await getReceiptsByIds(receiptIds);
    setUserReceipts(receipts);
  };

  useEffect(() => {
    if (user?.uid) {
      getUserReceiptDetails(user.uid);
    }
  }, [user?.uid]);

  const handleCapture = async () => {
    try {
      const receiptImage = await takePhoto();

      const image: CapturedReceipt = {
        uri: receiptImage?.path,
        webPath: receiptImage?.webPath,
        base64String: receiptImage?.base64String,
      };

      if (Capacitor.isNativePlatform()) {
        image.base64String = await convertUriToBase64(
          receiptImage?.webPath as string
        );
      }

      if (!image) return;

      setCapturedReceipt(image);

      // TODO: Remove the below line
      return router.push(Routes.ReadingReceipt, "forward");
      // TODO: Afer capturing the image, redirect to ReadingReceipt
    } catch (error) {
      console.log("error in capture", error);
      present("Unable to pick image. Please check the camera permissions");
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

  console.log("user receipts", userReceipts);
  return (
    <>
      <IonMenu contentId={HOME_PAGE_MENU_ID} side="end" type="push">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem onClick={handleLogout}>
              <IonIcon icon={logOut} slot="start" />
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
            <IonButton onClick={redirectToBankDetails}>
              <IonIcon icon={add} slot="icon-only" />
            </IonButton>
          </IonItem>
          <IonList className="ion-margin-top">
            {userReceipts.length > 0 ? (
              userReceipts.map((receipt) => (
                <IonItem button key={receipt.id}>
                  <IonAvatar slot="start">
                    <img alt="receipt" src={receipt.imageUrl} />
                  </IonAvatar>
                  {receipt.createdAt}
                </IonItem>
              ))
            ) : (
              <IonItem>
                <IonLabel>
                  No expenses yet. Capture a receipt to start splitting the
                  bills
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonContent>
        <IonFooter className="ion-margin-bottom">
          <div className="ion-text-center">
            <IonButton onClick={handleCapture}>
              <IonIcon icon={camera} slot="start"></IonIcon>
              Capture Receipt
            </IonButton>
          </div>
        </IonFooter>
      </IonPage>
    </>
  );
};
