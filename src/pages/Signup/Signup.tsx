import {
  IonButton,
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
import React, { useState } from "react";
import { Routes } from "../../Routes";
import { logoGoogle } from "ionicons/icons";
import {
  signinWithGoogle,
  signupWithPassword,
} from "../../utils/auth/firebase";

import "./Signup.css";

export const Signup: React.FC = () => {
  const router = useIonRouter();
  // TODO: Replace with react form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      window.alert?.("Please fill in all fields");
      return;
    }
    try {
      await signupWithPassword(email, password);
      router.push(Routes.Home, "forward");
    } catch (error: any) {
      window.alert?.(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signinWithGoogle();
      router.push(Routes.Home, "forward");
    } catch (error: any) {
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
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <IonText className="ion-text-center">
              <h1>Create a new account</h1>
            </IonText>
            <IonText className="ion-text-center">
              <p>Fill in the form to continue</p>
            </IonText>

            <IonList className="ion-padding-top">
              <IonItem>
                <IonInput
                  type="text"
                  placeholder="Username"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="password"
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
              </IonItem>
            </IonList>
          </div>
          <div>
            <IonButton className="ion-margin-top" type="submit" expand="block">
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
