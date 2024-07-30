export type ReceiptProcessingContextType = {
  rawImage: string;
  // TODO: Define the type of the processed receipt json
  imageJsonString?: string;
  setRawImage: (rawImage: string) => void;
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
