"use client";

import { RegisterUserForm } from "@/modules/users/components/registerUserForm";
import { UsersTable } from "@/modules/users/components/usersTable";
import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { getUsers, createUser } from "@/modules/users/services/user";
import { canAccess } from "@/shared/utils/canAccess";
import { useRouter } from "next/navigation";
import { Modal } from "../../shared/components/ui/modal";
import { Spinner } from "@/shared/components/ui/spinner";
import { User, UserFormData } from "@/modules/users/types/user";

import { useUserContext } from "@/modules/users/contexts/context";

export default function Users() {
  const { authenticated, loading, permissions } = useAuth();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { users, addUser } = useUserContext()

  async function handleSubmit(data: UserFormData) {
    try {
      const roles = data.roles.map((opt) => opt.value);

      const createdUser = await addUser(data);

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
            isOpen={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}

      {dataLoading ? (
        <Spinner width="2.5rem" height="2.5rem" />
      ) : (
        users && <UsersTable />
      )}
    </div>
  );
}
