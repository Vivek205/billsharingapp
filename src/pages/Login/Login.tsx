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
  signinWithPassword,
} from "../../utils/auth/firebase";

import "./Login.css";
import { useLocation } from "react-router";

export const Login: React.FC = () => {
  const router = useIonRouter();
  // TODO: Replace with react form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation<{ path?: string }>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      window.alert?.("Please fill in all fields");
      return;
    }
    try {
      await signinWithPassword(email, password);
      console.log("state", state);
      if (state?.path) {
        router.push(state.path, "root");
      } else {
        router.push(Routes.Home, "root");
      }
    } catch (error: any) {
      window.alert?.(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signinWithGoogle();
      console.log("state", state);
      if (state?.path) {
        router.push(state.path, "root");
      } else {
        router.push(Routes.Home, "root");
      }
    } catch (error: any) {
      window.alert?.(error.message);
    }
  };

  console.log({ email, password });

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
              <h1>Welcome Back!</h1>
            </IonText>
            <IonText className="ion-text-center">
              <p>Please sign in to your account</p>
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
              Login
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
            Don't have an account? <a href={Routes.Signup}>Sign up</a>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};
