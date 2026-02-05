"use client";

import { SpinnerLoading } from "@/components/global/spinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RolesTable } from "../ui/role/rolesTable";
import { createRole, getRoles } from "@/services/role";
import { Role, RoleFormData } from "@/types/role";
import { canAccess } from "@/utils/canAccess";
import { Spinner } from "@/components/global/spinner";
import { RegisterRoleModal } from "../ui/role/registerRoleModal";
import { Modal } from "@/components/global/modal";

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const { authenticated, loading, permissions } = useAuth();
  const [open, setOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const router = useRouter();

  async function loadRoles() {
    setDataLoading(true);
    const res = await getRoles();
    setRoles(res);
    setDataLoading(false);
  }

  async function handleSubmit(data: RoleFormData) {
    try {
      const permissions = data.permissions.map((opt) => opt.value);

      const createdRole = await createRole(data.name, permissions);

      if ("roleId" in createdRole) {
        setRoles((prev) => [...prev, createdRole]);
        setOpen(false);
      } else {
        console.error("Erro ao criar perfil:", createdRole);
      }
    } catch (err) {
      console.error("Erro ao criar perfil", err);
    }
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

        {canAccess(permissions, ["ADD_ROLE"]) && (
          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Adicionar Perfil
          </button>
        )}

        {canAccess(permissions, ["ADD_ROLE"]) && (
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <RegisterRoleModal
              title="Criar Perfil"
              isOpen={open}
              onClose={() => setOpen(false)}
              onSubmit={handleSubmit}
            />
          </Modal>
        )}
      </div>

      {dataLoading ? (
        <Spinner width="2.5rem" height="2.5rem" />
      ) : (
        roles && <RolesTable roles={roles} setRoles={setRoles}></RolesTable>
      )}
    </div>
  );
}
