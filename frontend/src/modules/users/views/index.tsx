"use client";

import { UsersTable } from "@/modules/users/components/usersTable";
import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect } from "react";
import { canAccess } from "@/shared/utils/canAccess";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useUsers } from "../hooks/useUsers";

export default function Users() {
  const { authenticated, loading, permissions } = useAuth();
  const { users, loadingData, removeUser } = useUsers();
  const router = useRouter();

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
          <Link
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
            href={"/admin/users/new"}
          >
            Adicionar Usuário
          </Link>
        )}
      </div>

      <UsersTable
        data={users}
        loadingData={loadingData}
        onDelete={removeUser}
      />
    </div>
  );
}
