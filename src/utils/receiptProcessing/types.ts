export type CapturedReceipt = {
  uri?: string;
  base64String?: string;
  webPath?: string;
};
export type ReceiptProcessingContextType = {
  receiptId?: string;
  setReceiptId: (receiptId: string) => void;
  capturedReceipt: CapturedReceipt;
  // TODO: Define the type of the processed receipt json
  imageJsonString?: string;
  setCapturedReceipt: (rawImage: CapturedReceipt) => void;
  setImageJsonString: (imageJsonString: string) => void;
};

type ReceiptItemType =
  | "room"
  | "tax"
  | "parking"
  | "service"
  | "fee"
  | "delivery"
  | "product"
  | "food"
  | "alcohol"
  | "tobacco"
  | "transportation"
  | "fuel"
  | "refund"
  | "discount"
  | "payment"
  | "giftcard";

export type ParsedReceiptItem = {
  name: string;
  price: number | null;
  quantity: number;
  total: number;
  type: ReceiptItemType;
};

export type ParsedReceipt = ParsedReceiptItem[];
