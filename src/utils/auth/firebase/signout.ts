import { getFirebaseAuth } from "./initializeApp";

export const signout = () => {
  const auth = getFirebaseAuth();
  return auth.signOut();
};
