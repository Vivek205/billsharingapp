import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "./initializeApp";

export const signinWithPassword = async (email: string, password: string) => {
  const auth = getFirebaseAuth();
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};
