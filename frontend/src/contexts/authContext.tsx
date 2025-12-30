"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("")

  async function loadUser() {
    try {
      const res = await axios.get('http://localhost:8080/auth/me', { withCredentials: true });

      if (res.status === 200) {
        setUser(res.data)
      } 
      
    } catch (err) {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };