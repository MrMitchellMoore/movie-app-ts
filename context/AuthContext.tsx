"use client";
import { auth } from "@/lib/firebaseConfig";

import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUser {
  email: string;
  password: string;
}

interface AuthUserContextType {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  signUp: ({ email, password }: IUser) => Promise<UserCredential>;
  logIn: ({ email, password }: IUser) => Promise<UserCredential>;
  logOut: () => {};
}

const defaultState = {
  user: {
    email: "",
    password: "",
  },
  setUser: (_user: IUser) => {},
} as unknown as AuthUserContextType;

export const AuthContext =
  createContext<Partial<AuthUserContextType>>(defaultState);

export function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });

  const signUp = ({ email, password }: IUser) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = ({ email, password }: IUser) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser as unknown as typeof user);
    });
    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={{ user, signUp, logOut, logIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  console.log(AuthContext);
  return useContext(AuthContext);
}
