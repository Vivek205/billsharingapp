export { initializeFirestore } from "./firestore";

export { setUser, getUserReceipts } from "./user";
export { setBankDetails, getBankDetails } from "./bankDetails";

export {
  setReceipt,
  getReceipt,
  getReceiptsByIds,
  updateReceipt,
} from "./receipts";
export type { Receipt } from "./receipts/types";

export { uploadReceiptFile } from "./files";
