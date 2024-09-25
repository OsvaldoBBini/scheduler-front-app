import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStrogaKeys";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/usersService";
import { httpClient } from "../services/httpClient";
import toast from "react-hot-toast";

interface AuthContextValue {
  signedIn: boolean;
  email: string;
  signout(): void;
  signin(accessToken: string): void
  setUserEmail(userEmail: string): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: {
  children: React.ReactNode
}) {

  const [email, setEmail] = useState<string>('');

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    return !!storageAccessToken;
  });

  const setAccessToken = useCallback(( accessToken: string ) => {
    httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`
  },[]);

  const setUserEmail = useCallback(( userEmail: string ) => {
    setEmail(userEmail);
  }, []);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    
    if (storedAccessToken) {
      setAccessToken(localStorageKeys.ACCESS_TOKEN);
    }
  }, [setAccessToken]);

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setAccessToken(accessToken)

    setSignedIn(true);
  }, [setAccessToken]);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  const { isError } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => userService.me(),
    enabled: signedIn,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider value={{signedIn, signin, signout, setUserEmail, email}}>
      {children}
    </AuthContext.Provider>
  );
}