export {
  initializeFirebase,
  // getFirebaseAuth,
  getFirebaseApp,
} from "./initializeApp";

export { signinWithGoogle } from "./signinWithGoogle";
export { signinWithPassword } from "./signinWithPassword";
export { signupWithPassword } from "./signupWithPassword";

export { signout } from "./signout";

export { useFirebaseContext, FirebaseAuthProvider } from "./Context";
