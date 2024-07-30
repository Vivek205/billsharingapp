import { Firestore, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "../../auth/firebase";

let dbInstance: Firestore;

export const initializeFirestore = () => {
  const app = getFirebaseApp();
  dbInstance = getFirestore(app);
  return dbInstance;
};

export const getDbInstance = () => {
  if (!dbInstance) {
    initializeFirestore();
  }

  return dbInstance;
};
