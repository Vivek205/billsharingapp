import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants";
import {
  Auth,
  getAuth,
} from "firebase/auth";
import {
  FirebaseAuthentication,
  Persistence,
} from "@capacitor-firebase/authentication";
import { Capacitor } from "@capacitor/core";

let app: FirebaseApp;
let auth: Auth;

export const initializeFirebase = () => {
  // if (!Capacitor.isNativePlatform()) {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }

  if (!auth) {
    auth = getAuth(app);
  }
  // }

  if (Capacitor.isNativePlatform()) {
    FirebaseAuthentication.setPersistence({
      persistence: Persistence.IndexedDbLocal,
    });
  }
};

export const getFirebaseApp = () => {
  if (!app) {
    initializeFirebase();
  }

  return app;
};

// export const getFirebaseAuth = () => {
//   if (!auth) {
//     initializeFirebase();
//   }

//   return auth;
// };
