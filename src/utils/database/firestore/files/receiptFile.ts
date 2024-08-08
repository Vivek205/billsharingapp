import {
  FirebaseStorage,
  UploadFileOptions,
} from "@capacitor-firebase/storage";
import { base64ToBlob } from "../../../receiptProcessing/base64ToBlob";
import { Capacitor } from "@capacitor/core";
import { CapturedReceipt } from "../../../receiptProcessing/types";

let uploading = false;

export const uploadReceiptFile = async (
  userId: string,
  receiptImage: CapturedReceipt
) => {
  console.log("receiptImage", receiptImage);
  if (uploading && process.env.NODE_ENV === "development") {
    console.log("uploading already in progress");
    return;
  }
  uploading = true;

  const options: UploadFileOptions = {
    path: `receipts/${userId}/${new Date().getTime()}.png`,
  };

  if (Capacitor.isNativePlatform()) {
    options.uri = receiptImage.uri;
  } else {
    options.blob = base64ToBlob(receiptImage.base64String as string);
  }

  const uploadEventPromise = new Promise<string>((resolve, reject) => {
    FirebaseStorage.uploadFile(options, (event, error) => {
      console.log("event", event);
      if (error) {
        console.log("error in callback", error);
        uploading = false;
        reject(error);
      } else if (event?.completed) {
        console.log("completed", event);
        uploading = false;
        resolve(options.path);
      }
    });
  });
  await uploadEventPromise;
  const { downloadUrl } = await FirebaseStorage.getDownloadUrl({
    path: options.path,
  });
  return downloadUrl;
};
