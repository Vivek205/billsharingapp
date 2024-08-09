import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";
import {
  getReceipt,
  Receipt,
  updateReceipt,
} from "../../utils/database/firestore";
import { ParsedReceipt } from "../../utils/receiptProcessing";
import { ReceiptDetailsProps, ReceiptDetailsUrlParams } from "./types";
import { Routes } from "../../Routes";
import { formatEpoch } from "../../utils/formatEpoch";

import "./ReceiptDetails.css";
import { checkmarkOutline, shareOutline, trash } from "ionicons/icons";
import { useParams } from "react-router-dom";
import { UseAppToast } from "../../utils/hooks/useAppToast";
import { useNativeShare } from "../../utils/hooks/useNativeShare";

export const ReceiptDetails: FC<ReceiptDetailsProps> = ({ match }) => {
  const params = useParams<ReceiptDetailsUrlParams>();

  const { receiptId } = params;
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [present] = UseAppToast();
  const { share } = useNativeShare();

  const fetchReceiptDetails = async () => {
    console.log("fetching receipt details");
    const receiptFromDb = await getReceipt(match.params.receiptId);
    setReceipt(receiptFromDb);
    // TODO: Fetch the receipt details from the database
    // TODO: Set the receipt details in the context
  };

  useEffect(() => {
    console.log("receiptId", receiptId);
    console.log("match", match);
    if (match.params.receiptId) {
      fetchReceiptDetails();
    }
  }, [receiptId, match]);

  if (!receipt) {
    <IonPage>
      <IonContent className="ion-padding">
        <p>Implement the loading state and the error state</p>
      </IonContent>
    </IonPage>;
  }

  const handleConfirm = async () => {
    try {
      console.log("handle confirm", receiptId);
      if (!receiptId) return;
      await updateReceipt(receiptId as string, { isConfirmed: true });
      await fetchReceiptDetails();
      present("Items confirmed", "success");
    } catch (error) {
      present(`Error confirming the receipt ${error.message}`);
    }
  };

  const handleShare = async () => {
    // TODO: Replace the validTill with the correct date
    const validTill = new Date();
    validTill.setDate(validTill.getDate() + 7);
    try {
      if (!receiptId) return;
      await share({
        title: receipt?.title,
        text: `Hey! I've shared a payment link with you. 
        You can select the items intended for you and complete your payment. 
        Hurry, it's valid until ${validTill.toLocaleDateString()}! 
        Check it out: https://www.google.com`,
        url: "https://www.google.com",
      });
    } catch (error) {
      present(`Error sharing the receipt ${error.message}`);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={Routes.Home} />
          </IonButtons>
          <IonTitle>Receipt</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonFab horizontal="end" slot="fixed" vertical="top">
          <IonFabButton color="danger" size="small">
            <IonIcon icon={trash} />
          </IonFabButton>
        </IonFab>
        <IonCard>
          <img alt="receipt" src={receipt?.imageUrl} />
          <IonCardHeader>
            <IonCardTitle>{receipt?.title}</IonCardTitle>
            <IonCardSubtitle>
              {formatEpoch(receipt?.createdAt ?? 0)}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {receipt?.jsonData && (
              <IonList>
                <IonItem color="medium">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>Price</IonLabel>
                  <IonLabel>Quantity</IonLabel>
                </IonItem>
                {(JSON.parse(receipt.jsonData) as ParsedReceipt).items.map(
                  (item) => (
                    <IonItem key={item.name}>
                      <IonLabel>{item.name}</IonLabel>
                      <IonLabel>{parseFloat(item.price).toFixed(2)}</IonLabel>
                      <IonLabel>{item.quantity}</IonLabel>
                    </IonItem>
                  )
                )}
              </IonList>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <div className="ion-text-center">
            <IonButton
              color={receipt?.isConfirmed ? "primary" : "secondary"}
              fill="solid"
              onClick={receipt?.isConfirmed ? handleShare : handleConfirm}
            >
              <IonIcon
                icon={receipt?.isConfirmed ? shareOutline : checkmarkOutline}
                slot="start"
              />
              {receipt?.isConfirmed ? "Share" : "Confirm"}
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
