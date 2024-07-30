import { createContext, FC, ReactNode, useContext, useState } from "react";
import { ReceiptProcessingContextType } from "./types";

const ReceiptProcessingContext = createContext<ReceiptProcessingContextType>({
  rawImage: "",
  imageJsonString: undefined,
  setRawImage: () => {},
  setImageJsonString: () => {},
});

export const ReceiptProcessingProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rawImage, setRawImage] = useState("");
  const [imageJsonString, setImageJsonString] = useState<string | undefined>(
    undefined
  );

  return (
    <ReceiptProcessingContext.Provider
      value={{
        rawImage,
        imageJsonString,
        setRawImage,
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
