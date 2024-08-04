// import { User } from "firebase/auth";

import { User } from "@capacitor-firebase/authentication";

export type FirebaseAuthContextType = {
  // user: User | null;
  user: User | null;
  isLoading: boolean;
};
