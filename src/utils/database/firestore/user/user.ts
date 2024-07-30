import { doc, setDoc } from "firebase/firestore";
import { getDbInstance } from "../firestore";
import { User } from "./types";

const COLLECTION_NAME = "users";

export const setUser = (user: User) => {
  const db = getDbInstance();
  const docRef = doc(db, COLLECTION_NAME, user.uid);
  return setDoc(docRef, user, { merge: true });
};
