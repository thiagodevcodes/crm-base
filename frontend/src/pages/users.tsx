"use client";

import { RegisterModal } from "@/components/admin/registerModal";
import { SpinnerLoading } from "@/components/global/spinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Users() {
  const { authenticated, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return <SpinnerLoading />;

  if (!authenticated) return <SpinnerLoading />;

  return (
    <div className="p-6 flex flex-col items-start gap-4">
      <div>
        <h1 className="text-2xl font-bold">Usuários</h1>
        <p>Bem-vindo ao painel de Usuários!</p>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-950 text-white px-4 py-2 rounded-xl cursor-pointer"
      >
        Adicionar Usuário
      </button>

      <RegisterModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
