import { User as FirebaseUser } from "@capacitor-firebase/authentication";

declare module "@capacitor-firebase/authentication" {
  interface User extends FirebaseUser {
    receiptIds?: string[];
  }
}
