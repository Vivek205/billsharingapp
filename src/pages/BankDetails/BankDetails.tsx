import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { save } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Routes } from "../../Routes";

export const BankDetails = () => {
  const [accountName, setAccountName] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  console.log("Bank details");
  useEffect(() => {
    console.log("Bank details mounted");
  }, []);

  const handleSubmit = async () => {
    if (!accountName || !IBAN) {
      window.alert("Please fill in all fields");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={Routes.Home} />
          </IonButtons>
          <IonTitle>Bank Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <form> */}
      <IonContent>
        <IonText className="ion-text-center">
          <p>Please enter your bank details</p>
        </IonText>

        <IonList className="ion-padding-top">
          <IonItem>
            <IonInput
              type="text"
              placeholder="Account Name"
              value={accountName}
              onIonChange={(e) => setAccountName(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              placeholder="IBAN"
              type="text"
              value={IBAN}
              onIonChange={(e) => setIBAN(e.detail.value!)}
            />
          </IonItem>
        </IonList>
        <IonText color="medium">
          <p className="ion-padding-horizontal">
            Your IBAN can be found on your debit card or on your banking website
          </p>
        </IonText>
      </IonContent>
      <IonFooter className="ion-padding-bottom">
        {isSaving && <IonProgressBar type="indeterminate" />}
        <div className="ion-text-center ion-padding-top">
          <IonButton onClick={handleSubmit} disabled={isSaving}>
            <IonIcon slot="start" icon={save}></IonIcon>
            Save
          </IonButton>
        </div>
      </IonFooter>
      {/* </form> */}
    </IonPage>
  );
};
