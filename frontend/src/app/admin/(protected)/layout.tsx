"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get('http://localhost:8080/auth/me', { withCredentials: true });

        if (res.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push("/admin"); // redireciona se não autenticado
        }
      } catch (err) {
        setAuthenticated(false);
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      await axios.post("http://localhost:8080/sign_out", null, { withCredentials: true });
      setAuthenticated(false);
      router.push("/admin"); // redireciona para login
    } catch (err) {
      console.error("Erro ao deslogar", err);
    }
  }

  if (loading) return <div>Carregando...</div>; // skeleton ou spinner

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
