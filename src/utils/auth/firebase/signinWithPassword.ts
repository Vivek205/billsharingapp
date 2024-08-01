import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

export const signinWithPassword = async (email: string, password: string) => {
  const { user } = await FirebaseAuthentication.signInWithEmailAndPassword({
    email,
    password,
  });
  return user;
};
