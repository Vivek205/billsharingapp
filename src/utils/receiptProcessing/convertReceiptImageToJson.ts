import { parseImageTextToJson } from "./parseImageTextToJson";
import { transformImageToText } from "./transformImageToText";

export const convertReceiptImageToJson = async (image: string) => {
  const imageText = await transformImageToText(image);
  const jsonString = parseImageTextToJson(imageText);
  if (!jsonString) {
    throw new Error("JSON is missing in the response");
  }
  return jsonString;
};
