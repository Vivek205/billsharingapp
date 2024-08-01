import { GoogleAuthProvider } from "firebase/auth";
import { setUser } from "../../database/firestore";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

let provider: GoogleAuthProvider;

export const signinWithGoogle = async () => {
  if (!provider) {
    provider = new GoogleAuthProvider();
  }

  console.log("waiting for FirebaseAuthentication.signInWithGoogle");
  const signinResult = await FirebaseAuthentication.signInWithGoogle();
  console.log("userCredential result", signinResult);

  const { user, additionalUserInfo } = signinResult;
  console.log("additionalUserInfo", signinResult.additionalUserInfo);

  if (additionalUserInfo?.isNewUser && user) {
    const { uid, email, displayName } = user;
    await setUser({
      uid,
      email,
      displayName,
      photoURL: additionalUserInfo?.profile?.picture as string,
    });
  }
  return user;
};
