import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { save } from "ionicons/icons";
import { useEffect } from "react";
import { Routes } from "../../Routes";
import { useFirebaseContext } from "../../utils/auth/firebase";
import { getBankDetails, setBankDetails } from "../../utils/database/firestore";
import { BANK_DETAILS_PAGE_FORM_ID } from "./constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { BankDetailsFormInputs } from "./types";
import classNames from "classnames";
import { UseAppToast } from "../../utils/hooks/useAppToast";

export const BankDetails = () => {
  const { user } = useFirebaseContext();
  const [present] = UseAppToast();
  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, isSubmitting, submitCount },
    reset,
  } = useForm<BankDetailsFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const fetchBankDetails = async () => {
      if (user?.uid) {
        const bankDetails = await getBankDetails(user.uid);
        if (bankDetails) {
          // TODO: Loading state for fetching bank details
          reset({
            accountName: bankDetails.accountName,
            iban: bankDetails.iban,
          });
        }
      }
    };
    fetchBankDetails();
  }, [user]);

  const saveBankDetails: SubmitHandler<BankDetailsFormInputs> = async ({
    accountName,
    iban,
  }) => {
    if (!user?.uid) return;

    try {
      await setBankDetails({ accountName, iban }, user?.uid);
      present("Bank details updated", "success");
    } catch (error) {
      present("Error updating bank details. Please try again");
      console.log("error in saving bank details", error);
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
      <IonContent>
        <IonText className="ion-text-center">
          <p>Please enter your bank details</p>
        </IonText>
        <form
          id={BANK_DETAILS_PAGE_FORM_ID}
          noValidate
          onSubmit={handleSubmit(saveBankDetails)}
        >
          <IonCard>
            <IonCardContent>
              <IonInput
                placeholder="Account Name"
                type="text"
                {...register("accountName", {
                  required: true,
                  minLength: 5,
                })}
                className={classNames({
                  "ion-touched": touchedFields.accountName || !!submitCount,
                  "ion-invalid": errors.accountName,
                  "ion-valid": !errors.accountName,
                })}
                enterkeyhint="next"
                errorText="Invalid Account Name"
                onIonChange={(e) => register("accountName").onChange(e)}
              />

              <IonInput
                placeholder="IBAN"
                type="text"
                {...register("iban", {
                  required: true,
                  minLength: 14,
                  maxLength: 34,
                })}
                className={classNames({
                  "ion-touched": touchedFields.iban || !!submitCount,
                  "ion-invalid": errors.iban,
                  "ion-valid": !errors.iban,
                })}
                enterkeyhint="go"
                errorText="Invalid IBAN"
                onIonChange={(e) => register("iban").onChange(e)}
              />
            </IonCardContent>
          </IonCard>
        </form>
        <IonText color="medium">
          <p className="ion-padding-horizontal">
            Your IBAN can be found on your debit card or on your banking website
          </p>
        </IonText>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          {isSubmitting && <IonProgressBar type="indeterminate" />}
          <div className="ion-text-center ion-padding-top">
            <IonButton
              disabled={isSubmitting}
              form={BANK_DETAILS_PAGE_FORM_ID}
              type="submit"
            >
              <IonIcon icon={save} slot="start"></IonIcon>
              Save
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
