import { setUser } from "../../database/firestore";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

export const signupWithPassword = async (email: string, password: string) => {
  const { user } = await FirebaseAuthentication.createUserWithEmailAndPassword({
    email,
    password,
  });
  if (!user) {
    throw new Error("App Error:User not created");
  }
  const { uid, displayName } = user;
  await setUser({ uid, email, displayName });
  return user;
};
