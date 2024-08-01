import { doc, setDoc } from "firebase/firestore";
import { getDbInstance } from "../firestore";
import { BankDetails } from "./types";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";

const COLLECTION_NAME = "bankDetails";

export const setBankDetails = (bankDetails: BankDetails, userId: string) => {
  // FirebaseFirestore.setDocument({
  //   reference: `${COLLECTION_NAME}/${userId}`,
  //   data: bankDetails,
  //   merge: true,
  // });
  const db = getDbInstance();
  console.log("received db reference", db);
  const docRef = doc(db, COLLECTION_NAME, userId);
  console.log("docRef", docRef);
  return setDoc(docRef, bankDetails);
};
