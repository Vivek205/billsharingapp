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
import { updateReceipt } from "../../utils/database/firestore";
import { UseAppToast } from "../../utils/hooks/useAppToast";

export const ItemsReview: React.FC = () => {
  const router = useIonRouter();
  const { imageJsonString, receiptId } = useReceiptProcessingContext();
  const [present] = UseAppToast();

  useEffect(() => {
    if (!imageJsonString) {
      alert("Image JSON String missing. Check the Context");
      router.goBack();
    }
  }, [imageJsonString]);

  const handleConfirm = async () => {
    try {
      if (!receiptId) return;
      await updateReceipt(receiptId, { isConfirmed: true });
      return router.push(Routes.SharePaymentLink, "forward");
    } catch (error) {
      present(`Error confirming the receipt ${error.message}`);
    }
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

  console.log("parsedJson", parsedJson);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={Routes.Home} />
          </IonButtons>
          <IonTitle>Items Review</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* 
        // TODO: Show the list of items. Edit options for checkboxes, and qty, add missing items, delete wrong items 
        */}
        {parsedJson && (
          <IonList>
            <IonItem color="medium">
              <IonLabel>Name</IonLabel>
              <IonLabel>Quantity</IonLabel>
              <IonLabel>Price</IonLabel>
            </IonItem>
            {parsedJson?.map((item) => (
              <IonItem key={item.name}>
                <IonLabel>{item.name}</IonLabel>
                <IonLabel>{item.quantity}</IonLabel>
                <IonLabel>{item.total}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <div className="ion-text-center">
            <IonButton onClick={handleConfirm}>Confirm</IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
