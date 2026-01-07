"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, signIn, signOut } from "@/services/auth";

import { User } from "@/types/user";
import axios from "axios";

interface AuthContextData {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  permissions: string[];
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<string[]>([]);


  const router = useRouter();

  const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auth/me", {
        withCredentials: true,
      });

      setUser(res.data);
      setPermissions(res.data.permissions ?? []);
      setAuthenticated(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.replace("/admin");
      }

      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      await signIn(email, password);
      await loadUser()

      setAuthenticated(true);
      router.replace("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);

      await signOut();

      setUser(null);
      setAuthenticated(false);

      router.replace("/admin");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        login,
        logout,
        loading,
        permissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
