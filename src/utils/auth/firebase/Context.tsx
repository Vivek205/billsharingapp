import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FirebaseAuthContextType } from "./types";
import {
  FirebaseAuthentication,
  User,
} from "@capacitor-firebase/authentication";

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
    FirebaseAuthentication.removeAllListeners().then(() => {
      FirebaseAuthentication.addListener("authStateChange", (change) => {
        console.log("authStateChange", change);
        setUser(change.user);
        setIsLoading(false);
      });
    });
    return () => {
      FirebaseAuthentication.removeAllListeners();
    };
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
