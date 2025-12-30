"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/global/spinner";
import { delay } from "@/utils/functions";
import { Header } from "@/components/admin/header";
import { Footer } from "@/components/admin/footer";
import { Aside } from "@/components/admin/aside";
import { AuthProvider } from "@/contexts/authContext";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  async function checkAuth() {
    await delay(700); // ⏳ 0.7s de delay

    try {
      const res = await axios.get('http://localhost:8080/auth/me', { withCredentials: true });

      if (res.status === 200) {
        setAuthenticated(true);
        setUserId(res.data.user);
      } else {
        setAuthenticated(false);
        router.replace("/admin"); // redireciona se não autenticado
      }
    } catch (err) {
      setAuthenticated(false);
      router.replace("/admin");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      await axios.post("http://localhost:8080/auth/sign_out", null, { withCredentials: true });
      setAuthenticated(false);
      router.replace("/admin"); // redireciona para login
    } catch (err) {
      console.error("Erro ao deslogar", err);
    }
  }

  if (loading) return <Spinner />;

  return (
    <AuthProvider>
      {authenticated && (
        <>
          <div className="grid min-h-screen grid-cols-[260px_1fr] grid-rows-[auto_1fr_auto]">      
            <Aside/>
            <Header/>

            <main className="col-start-2 bg-white p-8">
              {children}
            </main>

            <Footer/>
          </div>
        </>
      )}
    </AuthProvider>

  );
}
