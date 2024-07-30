import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { FC, useState } from "react";
import { Routes } from "../../Routes";
import { useNativeShare } from "../../utils/hooks/useNativeShare";

export const SharePaymentLink: FC = () => {
  const [receiptTitle, setReceiptTitle] = useState("");
  const { share } = useNativeShare();
  const handleShare = async () => {
    // TODO: Share the link with the user
    const validTill = new Date();
    validTill.setDate(validTill.getDate() + 7);

    try {
      await share({
        title: receiptTitle,
        text: `Hey! I've shared a payment link with you. 
        You can select the items intended for you and complete your payment. 
        Hurry, it's valid until ${validTill.toLocaleDateString()}! 
        Check it out: https://www.google.com`,
        url: "https://www.google.com",
      });
    } catch (error) {
      console.log("error in share", error);
      alert("Error sharing");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={Routes.ItemsReview} />
          </IonButtons>
          <IonTitle>Share Payment Link</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="What is this receipt for?"
          value={receiptTitle}
          onIonChange={(e) => setReceiptTitle(e.detail.value!)}
        />
      </IonContent>
      <IonFooter className="ion-padding-bottom">
        <div className="ion-text-center">
          <IonButton onClick={handleShare}>share</IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};
