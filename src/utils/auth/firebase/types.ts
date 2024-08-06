import { User } from "@capacitor-firebase/authentication";

export type FirebaseAuthContextType = {
  user: User | null;
  isLoading: boolean;
};
