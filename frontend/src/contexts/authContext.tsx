"use client";

import { Spinner } from "@/components/global/spinner";
import { delay } from "@/utils/functions";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[]
}

export interface Role {
  roleId: string;
  name: string;
}

interface AuthContextData {
  user: User | null;
  authenticated: boolean;
  logout: () => Promise<void>;
  loading: boolean;
  loggingOut: boolean;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter()

  async function loadUser() {
    try {
      await delay(700); // simula backend lento
      const response = await axios.get('http://localhost:8080/auth/me', { withCredentials: true });

      setUser(response.data);
      setAuthenticated(true);
    } catch {
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function login(
    email: string,
    password: string
  ): Promise<void> {
    try {
      setLoading(true);

      await delay(700); // simula backend lento
      await axios.post(
        "http://localhost:8080/auth/sign_in",
        { username: email, password },
        { withCredentials: true }
      );

      await loadUser();
      router.replace("/admin/dashboard");
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // async function logout() {
  //   try {
  //     setLoading(true)
  //     await delay(700); // simula backend lento
  //     const response = await axios.post("http://localhost:8080/auth/sign_out", null, {
  //       withCredentials: true,
  //     });

  //     // se chegou aqui, status foi 2xx
  //     if (response.status === 200) {
  //       router.replace("/admin/dashboard");
  //       return;
  //     }

  //     router.replace("/admin"); // redireciona para login
  //   } catch (err) {
  //     console.error("Erro ao deslogar", err);
  //   }
  //   finally {
  //     setLoading(false);
  //   } 
  // }

  async function logout() {
    try {
      setLoading(true);
      await delay(700); // simula backend lento
      const response = await axios.post("http://localhost:8080/auth/sign_out", null, {
        withCredentials: true,
      });

      setUser(null);
      setAuthenticated(false);

      router.replace("/admin");
    } finally {
      setLoading(false);
    }
  } 

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        logout,
        login,
        loading,
        loggingOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };