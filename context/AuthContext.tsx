"use client";
import { auth } from "@/lib/firebaseConfig";

import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthUserContextType {
  email?: string;
  password?: string;
  user?: User;
  logOut: () => void;
  logIn: ({ email, password }: AuthUserContextType) => Promise<UserCredential>;
  signUp: ({ email, password }: AuthUserContextType) => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthUserContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [user, setUser] = useState<User | undefined>();

  const signUp = ({ email, password }: AuthUserContextType) => {
    return createUserWithEmailAndPassword(auth, email!, password!);
  };

  const logIn = ({ email, password }: AuthUserContextType) => {
    return signInWithEmailAndPassword(auth, email!, password!);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser!);
    });
    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={{ logOut, logIn, signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  console.log(AuthContext);
  return useContext(AuthContext);
}
