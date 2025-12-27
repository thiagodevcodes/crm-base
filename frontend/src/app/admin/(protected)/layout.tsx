"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/spinner";
import { delay } from "@/utils/functions";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  async function checkAuth() {
    await delay(1000); // ⏳ 0.5s de delay

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
    <>
      {authenticated && (
        <>
          {/* Botão de logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>

          {/* Conteúdo do layout */}
          <div>{children}</div>
        </>
      )}
    </>
  );
}
