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

export type ParsedReceiptItem = {
  name: string;
  price: string;
  quantity: string;
};

export type ParsedReceipt = {
  items: ParsedReceiptItem[];
};
