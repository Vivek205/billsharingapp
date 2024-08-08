import { FirebaseFirestore } from "@capacitor-firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Receipt } from "./types";

const COLLECTION_NAME = "receipts";

export const setReceipt = async (
  userId: string,
  receiptFilePath: string,
  jsonData: string
) => {
  console.log("creating receipt", receiptFilePath);
  const id = uuidv4();
  const ref = `${COLLECTION_NAME}/${id}`;
  await FirebaseFirestore.setDocument({
    reference: ref,
    data: {
      id,
      createdAt: new Date().getTime(),
      imageUrl: receiptFilePath,
      jsonData,
      userId,
    },
  });
  return id;
};

export const getReceiptsByIds = async (receiptIds: string[]) => {
  const documentPromises = receiptIds.map((id) =>
    FirebaseFirestore.getDocument<Receipt>({
      reference: `${COLLECTION_NAME}/${id}`,
    })
      .then((result) => result.snapshot.data)
      .catch((error) => {
        console.error(`Error retrieving document ${id}:`, error);
        return null;
      })
  );

  const documents = await Promise.all(documentPromises);
  console.log("documents");
  return documents.filter((doc) => doc !== null);
};

export const updateReceipt = async (id: string, receipt: Partial<Receipt>) => {
  FirebaseFirestore.updateDocument({
    reference: `${COLLECTION_NAME}/${id}`,
    data: receipt,
  });
};
