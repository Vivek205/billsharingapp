import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "./initializeApp";
import { setUser } from "../../database/firestore";

export const signupWithPassword = async (email: string, password: string) => {
  const auth = getFirebaseAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const { uid, displayName } = user;
  await setUser({ uid, email, displayName });
  return user;
};
