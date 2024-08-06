import { FirebaseStorage } from "@capacitor-firebase/storage";
import { base64ToBlob } from "../../../receiptProcessing/base64ToBlob";

let uploading = false;

export const uploadReceiptFile = async (
  userId: string,
  receiptImage: string
) => {
  if (uploading && process.env.NODE_ENV === "development") {
    console.log("uploading already in progress");
    return;
  }
  uploading = true;
  const path = `receipts/${userId}/${new Date().getTime()}.png`;
  const fileBlob = base64ToBlob(receiptImage);

  const uploadEventPromise = new Promise<string>((resolve, reject) => {
    FirebaseStorage.uploadFile(
      {
        path: path,
        blob: fileBlob,
      },
      (event, error) => {
        console.log("event", event);
        if (error) {
          console.log("error in callback", error);
          uploading = false;
          reject(error);
        } else if (event?.completed) {
          console.log("completed", event);
          uploading = false;
          resolve(path);
        }
      }
    );
  });
  await uploadEventPromise;
  const { downloadUrl } = await FirebaseStorage.getDownloadUrl({ path });
  return downloadUrl;
};
