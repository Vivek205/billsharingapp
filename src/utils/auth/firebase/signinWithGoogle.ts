import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirebaseAuth } from ".";
import { setUser } from "../../database/firestore";

let provider: GoogleAuthProvider;

export const signinWithGoogle = async () => {
  if (!provider) {
    provider = new GoogleAuthProvider();
  }
  const auth = getFirebaseAuth();
  const userCredential = await signInWithPopup(auth, provider);
  const { user } = userCredential;
  const additionalUserInfo = getAdditionalUserInfo(userCredential);
  console.log("additionalUserInfo", additionalUserInfo);

  if (additionalUserInfo?.isNewUser) {
    const { uid, email, displayName, photoURL } = user;
    await setUser({ uid, email, displayName, photoURL });
  }
  return user;
};
