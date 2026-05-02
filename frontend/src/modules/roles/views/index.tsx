"use client";

import { SpinnerLoading } from "@/shared/components/ui/spinnerLoading";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { canAccess } from "@/shared/utils/canAccess";
import { Modal } from "@/shared/components/ui/modal";
import { RoleFormData } from "@/modules/roles/types";
import { useRoleContext } from "@/modules/roles/contexts/context";
import { RegisterRoleForm } from "../components/registerRoleForm";
import { RolesTable } from "../components/rolesTable";
import Link from "next/link";

export default function Roles() {
  const { authenticated, loading, permissions } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { addRole } = useRoleContext();

  async function handleSubmit(data: RoleFormData) {
    try {
      await addRole(data);
      setOpen(false);
    } catch (err) {
      console.error("Erro ao criar role", err);
    }
  }

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

      <RolesTable />
    </div>
  );
}
