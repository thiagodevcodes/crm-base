"use client";

import { RegisterUserModal } from "@/components/admin/ui/user/registerUserModal";
import { UsersTable } from "@/components/admin/ui/user/usersTable";
import { SpinnerLoading } from "@/components/global/spinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getUsers, createUser } from "@/services/user";
import { User, UserFormData } from "@/types/user";
import { canAccess } from "@/utils/canAccess";
import { useRouter } from "next/navigation";
import { Modal } from "../../global/modal";
import { Spinner } from "@/components/global/spinner";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { authenticated, loading, permissions } = useAuth();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function loadUsers() {
    setDataLoading(true);
    const res = await getUsers();
    setUsers(res);
    setDataLoading(false);
  }

  async function handleSubmit(data: UserFormData) {
    try {
      const roles = data.roles.map((opt) => opt.value);

      const createdUser = await createUser(
        data.name,
        data.username,
        data.password,
        roles,
      );

      if ("userId" in createdUser) {
        setUsers((prev) => [...prev, createdUser]);
        setOpen(false);
      } else {
        console.error("Erro ao criar usuário:", createdUser);
      }
    } catch (err) {
      console.error("Erro ao criar usuário", err);
    }
  }

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (!loading && authenticated && !canAccess(permissions, ["GET_USERS"])) {
      router.replace("/admin/dashboard");
    }

    if (authenticated && canAccess(permissions, ["GET_USERS"])) {
      loadUsers();
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
          <RegisterUserModal
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
        users && <UsersTable users={users} setUsers={setUsers} />
      )}
    </div>
  );
}
