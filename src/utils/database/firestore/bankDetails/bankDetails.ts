import { BankDetails } from "./types";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";

const COLLECTION_NAME = "bankDetails";

export const setBankDetails = (bankDetails: BankDetails, userId: string) => {
  FirebaseFirestore.setDocument({
    reference: `${COLLECTION_NAME}/${userId}`,
    data: bankDetails,
    merge: true,
  });
};

export const getBankDetails = async (userId: string) => {
  const { snapshot } = await FirebaseFirestore.getDocument<BankDetails>({
    reference: `${COLLECTION_NAME}/${userId}`,
  });
  console.log("snapshot", snapshot);
  return snapshot.data;
};
