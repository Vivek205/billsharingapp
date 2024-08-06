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
  signinWithPassword,
  useFirebaseContext,
} from "../../utils/auth/firebase";

import "./Login.css";
import { useLocation } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormInputs } from "./types";
import classNames from "classnames";
import { LOGIN_PAGE_FORM_ID } from "./constants";

export const Login: React.FC = () => {
  const router = useIonRouter();
  const { state } = useLocation<{ path?: string }>();
  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, isSubmitting, submitCount },
  } = useForm<LoginFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const signinHandler: SubmitHandler<LoginFormInputs> = async ({
    email,
    password,
  }) => {
    try {
      await signinWithPassword(email, password);

      if (state?.path) {
        router.push(state.path, "root");
      } else {
        router.push(Routes.Home, "root");
      }
    } catch (error: any) {
      // TODO: Replace alert with toast
      console.log("error in password signin", error);
      window.alert?.(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log("signin with google initiated");
      await signinWithGoogle();
      if (state?.path) {
        router.push(state.path, "root");
      } else {
        router.push(Routes.Home, "root");
      }
    } catch (error: any) {
      console.log("error in google signin", error);
      window.alert?.(error.message);
      // TODO: Remove the below line
      router.push(Routes.Home, "root");
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
          id={LOGIN_PAGE_FORM_ID}
          onSubmit={handleSubmit(signinHandler)}
          className="form-container"
          noValidate
        >
          <div>
            <IonText className="ion-text-center">
              <h1>Welcome Back!</h1>
            </IonText>
            <IonText className="ion-text-center">
              <p>Please sign in to your account</p>
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
          <div className="ion-padding-horizontal">
            <IonButton
              disabled={isSubmitting}
              form={LOGIN_PAGE_FORM_ID}
              className="ion-margin-top "
              type="submit"
              expand="block"
            >
              Login
            </IonButton>
            <IonButton
              disabled={isSubmitting}
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
            Don't have an account? <a href={Routes.Signup}>Sign up</a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};
