import { UserDetails } from "./types";
import { FirebaseFirestore } from "@capacitor-firebase/firestore";

const COLLECTION_NAME = "users";

export const setUser = (user: UserDetails) => {
  // const db = getDbInstance();
  // const docRef = doc(db, COLLECTION_NAME, user.uid);
  // return setDoc(docRef, user, { merge: true });
  return FirebaseFirestore.setDocument({
    reference: `${COLLECTION_NAME}/${user.uid}`,
    data: user,
    merge: true,
  });
};

export const getUserReceipts = async (userId: string) => {
  const { snapshot } = await FirebaseFirestore.getDocument<UserDetails>({
    reference: `${COLLECTION_NAME}/${userId}`,
  });

  return snapshot.data?.receiptIds;
};

export const setUserReceipt = async (userId: string, receiptIds: string[]) => {
  // const db = getDbInstance();
  // const docRef = doc(db, COLLECTION_NAME, userId);
  // return setDoc(doc(docRef, user, userId), { receiptIds });
  return FirebaseFirestore.updateDocument({
    reference: `${COLLECTION_NAME}/${userId}`,
    data: {
      receiptIds,
    },
  });
};
