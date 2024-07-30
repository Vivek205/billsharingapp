import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFirebaseAuth } from "./initializeApp";
import { User } from "firebase/auth";
import { FirebaseAuthContextType } from "./types";

const FirebaseAuthContext = createContext<FirebaseAuthContextType>({
  user: null,
  isLoading: true,
});

export const FirebaseAuthProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("user", user);
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ user, isLoading }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseContext = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context;
};
