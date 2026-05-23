"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { canAccess } from "@/shared/utils/canAccess";
import { RolesTable } from "../components/rolesTable";
import Link from "next/link";
import { useRoles } from "../hooks/useRoles";

export default function Roles() {
  const { roles, loadingData, removeRole } = useRoles();
  const { authenticated, loading, permissions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (!loading && authenticated && !canAccess(permissions, ["GET_ROLES"])) {
      router.replace("/admin/dashboard");
    }
  }, [loading, authenticated, router, permissions]);

  if (loading || !authenticated || !canAccess(permissions, ["GET_ROLES"]))
    return <SpinnerLoading />;

  return (
    <div className="p-6 gap-4 w-full">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">Perfis de Usuários</h1>
          <p>Bem-vindo ao painel de Perfis de Usuários!</p>
        </div>

        {canAccess(permissions, ["ADD_EXPERIENCE"]) && (
          <Link
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
            href={"/admin/roles/new"}
          >
            Adicionar Perfil
          </Link>
        )}
      </div>

      <RolesTable
        data={roles}
        loadingData={loadingData}
        onDelete={removeRole}
      />
    </div>
  );
}
