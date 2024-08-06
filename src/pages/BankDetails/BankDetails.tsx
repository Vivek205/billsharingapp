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
import { useFirebaseContext } from "../../utils/auth/firebase";
import { getBankDetails, setBankDetails } from "../../utils/database/firestore";

export const BankDetails = () => {
  const [accountName, setAccountName] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useFirebaseContext();

  useEffect(() => {
    const fetchBankDetails = async () => {
      if (user?.uid) {
        const bankDetails = await getBankDetails(user.uid);
        if (bankDetails) {
          setAccountName(bankDetails.accountName);
          setIBAN(bankDetails.iban);
        }
      }
    };
    fetchBankDetails();
  }, [user]);

  const handleSubmit = async () => {
    if (!accountName || !IBAN) {
      window.alert("Please fill in all fields");
      return;
    }
    console.log("start saving bank details");

    if (user?.uid) {
      setIsSaving(true);
      try {
        await setBankDetails({ accountName, iban: IBAN }, user?.uid);
        console.log("bank details saved");
      } catch (error) {
        console.log("error in saving bank details", error);
      } finally {
        setIsSaving(false);
      }
    } else {
      console.log("user not found in bank details");
    }
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
              onIonChange={(e) => setAccountName(e.detail.value!)}
              placeholder="Account Name"
              type="text"
              value={accountName}
            />
          </IonItem>
          <IonItem>
            <IonInput
              onIonChange={(e) => setIBAN(e.detail.value!)}
              placeholder="IBAN"
              type="text"
              value={IBAN}
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
          <IonButton disabled={isSaving} onClick={handleSubmit}>
            <IonIcon icon={save} slot="start"></IonIcon>
            Save
          </IonButton>
        </div>
      </IonFooter>
      {/* </form> */}
    </IonPage>
  );
};
