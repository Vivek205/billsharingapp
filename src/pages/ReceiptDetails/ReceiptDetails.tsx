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
  useIonRouter,
} from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { getReceipt, Receipt } from "../../utils/database/firestore";
import { ParsedReceipt } from "../../utils/receiptProcessing";
import { ReceiptDetailsProps } from "./types";
import { Routes } from "../../Routes";
import { formatEpoch } from "../../utils/formatEpoch";

import "./ReceiptDetails.css";
import { trash } from "ionicons/icons";
import { useParams } from "react-router-dom";

export const ReceiptDetails: FC<ReceiptDetailsProps> = ({ match }) => {
  const router = useIonRouter();
  console.log("router", router);
  const params = useParams();
  console.log("params", params);
  const { receiptId } = router.routeInfo.params ?? {};
  const [receipt, setReceipt] = useState<Receipt | null>(null);

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
            {/* <IonButton color="danger" fill="outline">
              Delete
            </IonButton> */}
            <IonButton fill="solid">Share</IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
