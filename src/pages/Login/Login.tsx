import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { Routes } from "../../Routes";
import { logoGoogle } from "ionicons/icons";
import {
  signinWithGoogle,
  signinWithPassword,
} from "../../utils/auth/firebase";

import "./Login.css";
import { useLocation } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormInputs } from "./types";
import classNames from "classnames";
import { LOGIN_PAGE_FORM_ID } from "./constants";
import { UseAppToast } from "../../utils/hooks/useAppToast";

export const Login: React.FC = () => {
  const router = useIonRouter();
  const { state } = useLocation<{ path?: string }>();
  const [present] = UseAppToast();
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
    } catch (error) {
      present("Failed to login. Please try again");
      console.log("error in password signin", error);
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
    } catch (error) {
      console.log("error in google signin", error);
      window.alert?.(error.message);
      // TODO: Remove the below line
      router.push(Routes.Home, "root");
    }
  };

  const goToSignup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(Routes.Signup, "forward");
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
          className="form-container"
          id={LOGIN_PAGE_FORM_ID}
          noValidate
          onSubmit={handleSubmit(signinHandler)}
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
                  placeholder="email id"
                  type="text"
                  {...register("email", {
                    required: true,
                    minLength: 5,
                  })}
                  className={classNames({
                    "ion-touched": touchedFields.email || !!submitCount,
                    "ion-invalid": errors.email,
                    "ion-valid": !errors.email,
                  })}
                  enterkeyhint="next"
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
                  enterkeyhint="go"
                  errorText="Invalid Password"
                  onIonChange={(e) => register("password").onChange(e)}
                />
              </IonCardContent>
            </IonCard>
          </div>
          <div className="ion-padding-horizontal">
            <IonButton
              className="ion-margin-top "
              disabled={isSubmitting}
              expand="block"
              form={LOGIN_PAGE_FORM_ID}
              type="submit"
            >
              Login
            </IonButton>
            <IonButton
              className="ion-margin-top"
              color="light"
              disabled={isSubmitting}
              expand="block"
              onClick={handleGoogleSignIn}
            >
              <IonIcon icon={logoGoogle} slot="start"></IonIcon>
              Sign in with Google
            </IonButton>
          </div>
        </form>
        <IonText className="ion-text-center ion-padding-top">
          <p>
            Don't have an account? <a onClick={goToSignup}>Sign up</a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};
