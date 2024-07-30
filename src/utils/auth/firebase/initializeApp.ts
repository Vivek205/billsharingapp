import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants";
import { Auth, getAuth } from "firebase/auth";

let app: FirebaseApp;
let auth: Auth;

export const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }

  if (!auth) {
    auth = getAuth(app);
  }
};

export const getFirebaseApp = () => {
  if (!app) {
    initializeFirebase();
  }

  return app;
};

export const getFirebaseAuth = () => {
  if (!auth) {
    initializeFirebase();
  }

  return auth;
};
