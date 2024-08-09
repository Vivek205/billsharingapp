import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { FC } from "react";
import { Routes } from "../../Routes";
import { useNativeShare } from "../../utils/hooks/useNativeShare";
import { updateReceipt } from "../../utils/database/firestore";
import { useReceiptProcessingContext } from "../../utils/receiptProcessing";
import { SubmitHandler, useForm } from "react-hook-form";
import { SharePaymentLinkFormInputs } from "./types";
import { SHARE_PAYMENT_LINK_PAGE_FORM_ID } from "./constants";

export const SharePaymentLink: FC = () => {
  const { receiptId } = useReceiptProcessingContext();
  const { share } = useNativeShare();
  const { register, handleSubmit } = useForm<SharePaymentLinkFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const handleShare: SubmitHandler<SharePaymentLinkFormInputs> = async ({
    receiptTitle,
  }) => {
    // TODO: Replace the validTill with the correct date
    const validTill = new Date();
    validTill.setDate(validTill.getDate() + 7);

    try {
      if (receiptId) {
        await updateReceipt(receiptId, { title: receiptTitle });
      }
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
        <form
          id={SHARE_PAYMENT_LINK_PAGE_FORM_ID}
          noValidate
          onSubmit={handleSubmit(handleShare)}
        >
          <IonCard>
            <IonCardContent>
              <IonInput
                autoFocus
                enterkeyhint="go"
                placeholder="What is this receipt for?"
                {...register("receiptTitle", {
                  minLength: 5,
                })}
                counter
                maxlength={18}
                onIonChange={(e) => register("receiptTitle").onChange(e)}
              />
            </IonCardContent>
          </IonCard>
        </form>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <div className="ion-text-center">
            <IonButton form={SHARE_PAYMENT_LINK_PAGE_FORM_ID} type="submit">
              share
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
