import { doc, setDoc } from "firebase/firestore";
import { getDbInstance } from "../firestore";
import { BankDetails } from "./types";

const COLLECTION_NAME = "bankDetails";

export const setBankDetails = (bankDetails: BankDetails, userId: string) => {
  const db = getDbInstance();
  const docRef = doc(db, COLLECTION_NAME, userId);
  return setDoc(docRef, bankDetails);
};
