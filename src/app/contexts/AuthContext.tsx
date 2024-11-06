import { createContext, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { localStorageKeys } from "../config/localStrogaKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "../services/usersService";
import { httpClient } from "../services/httpClient";
import toast from "react-hot-toast";
import { MeResponse } from "../services/usersService/me";
import { authService } from "../services/authService";
import { RefreshParams } from "../services/authService/refreshToken";
import { PageLoader } from "../../view/components/PageLoader";

interface AuthContextValue {
  signedIn: boolean;
  email: string;
  signout(): void;
  signin(accessToken: string, refreshToken: string): void
  setUserEmail(userEmail: string): void;
  profileData: MeResponse | undefined;
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

  const { mutateAsync: refreshAuth } = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: async (data: RefreshParams ) => { return authService.refreshToken(data); }
  });

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use(config => {
      const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    
      if(accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }
      
      return config;
    });

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    }
  },[]);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(localStorageKeys.REFRESH_TOKEN);

        if (originalRequest.url === '/refresh') {
          setSignedIn(false);
          localStorage.clear();
          return Promise.reject(error);
        }

        if (error.response?.status !== 401 || !refreshToken) {
          return Promise.reject(error);
        }

        const {
          accessToken,
          refreshToken: newRefreshToken
        } = await refreshAuth({refreshToken});

        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
        localStorage.setItem(localStorageKeys.REFRESH_TOKEN, newRefreshToken);

        return httpClient(originalRequest);
      }
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, [refreshAuth]);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    
    if (storedAccessToken) {
      setAccessToken(localStorageKeys.ACCESS_TOKEN);
    }
  }, [setAccessToken]);

  const signin = useCallback((accessToken: string, refreshToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    localStorage.setItem(localStorageKeys.REFRESH_TOKEN, refreshToken);
    setAccessToken(accessToken)

    setSignedIn(true);
  }, [setAccessToken]);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  const { data: profileData, isError, isSuccess, isFetching } = useQuery({
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


  if (isFetching) {
    return <PageLoader/>
  }

  return (
    <AuthContext.Provider value={{signedIn: isSuccess && signedIn, signin, signout, setUserEmail, email, profileData}}>
      {children}
    </AuthContext.Provider>
  );
}