import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

export const signout = () => {
  return FirebaseAuthentication.signOut();
};
