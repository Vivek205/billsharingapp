import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
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

export const ReadingReceipt: React.FC = () => {
  const router = useIonRouter();
  const { rawImage, setImageJsonString } = useReceiptProcessingContext();
  const [present] = UseAppToast();

  const handleRawImage = async () => {
    try {
      const imageJsonString = await convertReceiptImageToJson(rawImage);

      setImageJsonString(imageJsonString);

      // TODO: Handle Error
      router.push(Routes.ItemsReview, "root");
    } catch (error) {
      present("Unable to read the receipt");
      router.goBack();
    }
  };

  useEffect(() => {
    if (!rawImage) {
      console.log("Raw image missing. Check the Context");
      alert("Raw image missing. Check the Context");
      router.goBack();
    }
    handleRawImage();
  }, [rawImage]);

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
