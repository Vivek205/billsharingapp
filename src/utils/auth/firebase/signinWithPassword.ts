import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "./initializeApp";

export const signinWithPassword = (email: string, password: string) => {
  const auth = getFirebaseAuth();
  return signInWithEmailAndPassword(auth, email, password);
};
