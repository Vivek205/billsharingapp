import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect } from "react";
import { Routes } from "../../Routes";
import Lottie from "lottie-react";
import ReadingDocAnimation from "../../../public/lottie-animations/ReadingDoc.json";
import {
  convertReceiptImageToJson,
  useReceiptProcessingContext,
} from "../../utils/receiptProcessing";
import { UseAppToast } from "../../utils/hooks/useAppToast";
import { setReceipt, uploadReceiptFile } from "../../utils/database/firestore";
import { useFirebaseContext } from "../../utils/auth/firebase";
import {
  getUserReceipts,
  setUserReceipt,
} from "../../utils/database/firestore/user/user";

export const ReadingReceipt: React.FC = () => {
  const router = useIonRouter();
  const {
    capturedReceipt: capturedReceipt,
    setImageJsonString,
    setReceiptId,
  } = useReceiptProcessingContext();
  const [present] = UseAppToast();
  const { user } = useFirebaseContext();

  const handleRawImage = async () => {
    try {
      if (!user?.uid) return;
      console.log("fetching details for the user", user.uid);

      const [receiptFilePath, imageJsonString, userReceipts] =
        await Promise.all([
          uploadReceiptFile(user.uid, capturedReceipt),
          convertReceiptImageToJson(capturedReceipt.base64String as string),
          getUserReceipts(user.uid),
        ]);

      if (receiptFilePath) {
        const newReceiptId = await setReceipt(
          user.uid,
          receiptFilePath,
          imageJsonString
        );
        setReceiptId(newReceiptId);
        await setUserReceipt(user.uid, [...(userReceipts || []), newReceiptId]);
      }

      setImageJsonString(imageJsonString);

      // TODO: Handle Error
      router.push(Routes.ItemsReview, "root");
    } catch (error) {
      present(`"Unable to read the receipt" ${error.message}`);
      console.log("error in reading receipt", error);
      // router.goBack();
    }
  };

  useEffect(() => {
    if (!capturedReceipt) {
      console.log("Raw image missing. Check the Context");
      alert("Raw image missing. Check the Context");
      router.goBack();
    }
    handleRawImage();
  }, [capturedReceipt]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={Routes.Home} />
          </IonButtons>
          <IonTitle>Reading Receipt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText className="ion-text-center">
          <h3>Hang tight!</h3>
          <p>
            We're giving your receipt a makeover—it's about to go from boring to
            fabulous!
          </p>
        </IonText>
        <Lottie animationData={ReadingDocAnimation} />
      </IonContent>
    </IonPage>
  );
};
