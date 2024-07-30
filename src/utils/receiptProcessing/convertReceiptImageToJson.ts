import { parseImageTextToJson } from "./parseImageTextToJson";
import { transformImageToText } from "./transformImageToText";

export const convertReceiptImageToJson = async (image: string) => {
  const imageText = await transformImageToText(image);
  const jsonString = parseImageTextToJson(imageText);
  return jsonString;
};
