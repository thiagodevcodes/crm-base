"use client";

import { SpinnerLoading } from "@/components/global/spinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RolesTable } from "../ui/role/rolesTable";
import { getRoles } from "@/services/role";
import { Role } from "@/types/role";
import { canAccess } from "@/utils/canAccess";
import { Spinner } from "@/components/global/spinner";

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const { authenticated, loading, permissions } = useAuth();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const router = useRouter();

  async function loadRoles() {
    setDataLoading(true);
    const res = await getRoles();
    setRoles(res);
    setDataLoading(false);
  }

  useEffect(() => {
    if (!loading && !authenticated) router.replace("/admin");

    if (!loading && authenticated && !canAccess(permissions, ["GET_ROLES"])) {
      router.replace("/admin/dashboard");
    }

    if (authenticated && canAccess(permissions, ["GET_ROLES"])) {
      loadRoles();
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
      </div>

      {dataLoading ? (
        <Spinner width="2.5rem" height="2.5rem" />
      ) : (
        roles && <RolesTable roles={roles} setRoles={setRoles}></RolesTable>
      )}
    </div>
  );
}
