import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from ".";

let provider: GoogleAuthProvider;

export const signinWithGoogle = () => {
  if (!provider) {
    provider = new GoogleAuthProvider();
  }
  const auth = getFirebaseAuth();
  return signInWithPopup(auth, provider);
};
