import { User } from "firebase/auth";

export type FirebaseAuthContextType = {
  user: User | null;
  isLoading: boolean;
};
