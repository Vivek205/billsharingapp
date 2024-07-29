import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "./initializeApp";

export const signupWithPassword = (email: string, password: string) => {
  const auth = getFirebaseAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};
