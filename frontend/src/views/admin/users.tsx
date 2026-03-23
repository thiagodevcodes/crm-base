"use client";

import { RegisterUserForm } from "@/modules/users/components/registerUserForm";
import { UsersTable } from "@/modules/users/components/usersTable";
import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { canAccess } from "@/shared/utils/canAccess";
import { useRouter } from "next/navigation";
import { Modal } from "../../shared/components/ui/modal";
import { UserFormData } from "@/modules/users/types/user";

import { useUserContext } from "@/modules/users/contexts/context";

export default function Users() {
  const { authenticated, loading, permissions } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { addUser } = useUserContext();

  async function handleSubmit(data: UserFormData) {
    try {
      await addUser(data);
      setOpen(false);
    } catch (err) {
      console.error("Erro ao criar usuário", err);
    }
  }

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (!loading && authenticated && !canAccess(permissions, ["GET_USERS"])) {
      router.replace("/admin/dashboard");
    }
  }, [loading, authenticated, router, permissions]);

  if (loading || !authenticated || !canAccess(permissions, ["GET_USERS"]))
    return <SpinnerLoading />;

  return (
    <div className="p-6 gap-4 w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Usuários</h1>
          <p>Bem-vindo ao painel de Usuários!</p>
        </div>

        {canAccess(permissions, ["ADD_USER"]) && (
          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Adicionar Usuário
          </button>
        )}
      </div>

      {canAccess(permissions, ["ADD_USER"]) && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <RegisterUserForm
            title="Criar Usuário"
            onSubmit={handleSubmit}
          />
        </Modal>
      )}

      <UsersTable />
    </div>
  );
}
