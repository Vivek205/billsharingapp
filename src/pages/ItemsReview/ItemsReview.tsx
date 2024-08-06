import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useMemo } from "react";
import { Routes } from "../../Routes";
import {
  ParsedReceipt,
  useReceiptProcessingContext,
} from "../../utils/receiptProcessing";

export const ItemsReview: React.FC = () => {
  const router = useIonRouter();
  const { imageJsonString } = useReceiptProcessingContext();

  useEffect(() => {
    if (!imageJsonString) {
      alert("Image JSON String missing. Check the Context");
      router.goBack();
    }
  }, [imageJsonString]);

  const handleConfirm = async () => {
    return router.push(Routes.SharePaymentLink, "forward");
  };

  const parsedJson = useMemo<ParsedReceipt | undefined>(() => {
    let result;

    if (imageJsonString) {
      try {
        result = JSON.parse(imageJsonString);
      } catch (error) {
        console.log("error in parsing json", error);
        alert("Error parsing JSON");
      }
    }
    return result;
  }, [imageJsonString]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={Routes.Home} />
          </IonButtons>
          <IonTitle>ItemsReview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* TODO: Show the list of items. Edit options for checkboxes, and qty, add missing items, delete wrong items */}
        {parsedJson && (
          <IonList>
            <IonItem color="medium">
              <IonLabel>Name</IonLabel>
              <IonLabel>Price</IonLabel>
              <IonLabel>Quantity</IonLabel>
            </IonItem>
            {parsedJson?.items?.map((item) => (
              <IonItem key={item.name}>
                <IonLabel>{item.name}</IonLabel>
                <IonLabel>{parseFloat(item.price).toFixed(2)}</IonLabel>
                <IonLabel>{item.quantity}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
      <IonFooter className="ion-padding-bottom">
        <div className="ion-text-center">
          <IonButton onClick={handleConfirm}>Confirm</IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};
