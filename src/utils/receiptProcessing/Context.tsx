import { createContext, FC, ReactNode, useContext, useState } from "react";
import { CapturedReceipt, ReceiptProcessingContextType } from "./types";

const ReceiptProcessingContext = createContext<ReceiptProcessingContextType>({
  receiptId: undefined,
  setReceiptId: () => {},
  capturedReceipt: {},
  imageJsonString: undefined,
  setCapturedReceipt: () => {},
  setImageJsonString: () => {},
});

export const ReceiptProcessingProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [receiptId, setReceiptId] = useState<string | undefined>(undefined);
  const [capturedReceipt, setCapturedReceipt] = useState<CapturedReceipt>({});
  const [imageJsonString, setImageJsonString] = useState<string | undefined>(
    undefined
  );

  return (
    <ReceiptProcessingContext.Provider
      value={{
        receiptId,
        setReceiptId,
        capturedReceipt: capturedReceipt,
        imageJsonString,
        setCapturedReceipt,
        setImageJsonString,
      }}
    >
      {children}
    </ReceiptProcessingContext.Provider>
  );
};

export const useReceiptProcessingContext = () => {
  if (!ReceiptProcessingContext) {
    throw new Error(
      "useReceiptProcessingContext must be used within a ReceiptProcessingProvider"
    );
  }
  return useContext(ReceiptProcessingContext);
};
