import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Routes } from "../../Routes";
import { logoGoogle } from "ionicons/icons";
import {
  signinWithGoogle,
  signupWithPassword,
  useFirebaseContext,
} from "../../utils/auth/firebase";

import "./Signup.css";
import { SignupFormInputs } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";
import classNames from "classnames";
import { SIGNUP_PAGE_FORM_ID } from "./constants";

export const Signup: React.FC = () => {
  const router = useIonRouter();
  // TODO: Replace with react form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, isSubmitting, submitCount },
  } = useForm<SignupFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const signupHandler: SubmitHandler<SignupFormInputs> = async ({
    email,
    password,
  }) => {
    try {
      await signupWithPassword(email, password);
      router.push(Routes.Home, "forward");
    } catch (error: any) {
      // TODO: Replace alert with toast
      window.alert?.(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signinWithGoogle();
      router.push(Routes.Home, "forward");
    } catch (error: any) {
      // TODO: Replace alert with toast
      window.alert?.(error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bill Sharing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form
          onSubmit={handleSubmit(signupHandler)}
          className="form-container"
          noValidate
          id={SIGNUP_PAGE_FORM_ID}
        >
          <div>
            <IonText className="ion-text-center">
              <h1>Create a new account</h1>
            </IonText>
            <IonText className="ion-text-center">
              <p>Fill in the form to continue</p>
            </IonText>
            <IonCard>
              <IonCardContent>
                <IonInput
                  type="text"
                  placeholder="email id"
                  {...register("email", {
                    required: true,
                    minLength: 5,
                  })}
                  className={classNames({
                    "ion-touched": touchedFields.email || !!submitCount,
                    "ion-invalid": errors.email,
                    "ion-valid": !errors.email,
                  })}
                  errorText="Invalid Email Id"
                  onIonChange={(e) => register("email").onChange(e)}
                />

                <IonInput
                  placeholder="password"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                  className={classNames({
                    "ion-touched": touchedFields.password || !!submitCount,
                    "ion-invalid": errors.password,
                    "ion-valid": !errors.password,
                  })}
                  errorText="Invalid Password"
                  onIonChange={(e) => register("password").onChange(e)}
                />
              </IonCardContent>
            </IonCard>
          </div>
          <div>
            <IonButton
              form={SIGNUP_PAGE_FORM_ID}
              className="ion-margin-top"
              type="submit"
              expand="block"
            >
              Signup
            </IonButton>
            <IonButton
              color="light"
              className="ion-margin-top"
              expand="block"
              onClick={handleGoogleSignIn}
            >
              <IonIcon slot="start" icon={logoGoogle}></IonIcon>
              Sign in with Google
            </IonButton>
          </div>
        </form>
        <IonText className="ion-text-center ion-padding-top">
          <p>
            Already registered? <a href={Routes.Login}>Log in</a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};
