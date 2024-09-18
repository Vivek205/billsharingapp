// import { parseImageTextToJson } from "./parseImageTextToJson";
import { transformImageToText } from "./transformImageToText";

export const convertReceiptImageToJson = async (image: string) => {
  const parsedReceiptData = await transformImageToText(image);
  console.log("Api Data", parsedReceiptData);
  // const jsonString = parseImageTextToJson(imageText);
  // if (!jsonString) {
  //   throw new Error("JSON is missing in the response");
  // }
  return JSON.stringify(parsedReceiptData);
};
