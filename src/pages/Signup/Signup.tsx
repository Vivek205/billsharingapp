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
  signupWithPassword,
} from "../../utils/auth/firebase";

import "./Signup.css";
import { SignupFormInputs } from "./types";
import { SubmitHandler, useForm } from "react-hook-form";
import classNames from "classnames";
import { SIGNUP_PAGE_FORM_ID } from "./constants";
import { UseAppToast } from "../../utils/hooks/useAppToast";

export const Signup: React.FC = () => {
  const router = useIonRouter();
  const [present] = UseAppToast();

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
    } catch (error) {
      present("Failed to signup. Please try again");
      console.log("error in signup", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signinWithGoogle();
      router.push(Routes.Home, "forward");
    } catch (error) {
      // TODO: Replace alert with toast
      window.alert?.(error.message);
    }
  };

  const goToLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(Routes.Login, "forward");
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
          id={SIGNUP_PAGE_FORM_ID}
          noValidate
          onSubmit={handleSubmit(signupHandler)}
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
          <div>
            <IonButton
              className="ion-margin-top"
              expand="block"
              form={SIGNUP_PAGE_FORM_ID}
              type="submit"
            >
              Signup
            </IonButton>
            <IonButton
              className="ion-margin-top"
              color="light"
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
            Already registered? <a onClick={goToLogin}>Log in</a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};
