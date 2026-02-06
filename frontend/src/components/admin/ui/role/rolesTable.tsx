"use client";

import { Modal } from "@/components/global/modal";
import { useAuth } from "@/hooks/useAuth";
import { Role, RoleFormData } from "@/types/role";
import { canAccess } from "@/utils/canAccess";
import { ConfirmAlert } from "@/components/global/confirmAlert";
import { deleteRole, updateRole } from "@/services/role";
import { useState } from "react";
import { UpdateRoleModal } from "./updateRoleModal";

type Props = {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
};

export function RolesTable({ roles, setRoles }: Props) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { permissions } = useAuth();

  async function handleUpdate(data: RoleFormData) {
    if (!selectedRole) return;

    try {
      const permissions = data.permissions.map((opt) => opt.value);

      const updatedRole = await updateRole(
        selectedRole.roleId,
        data.name,
        permissions,
      );

      setRoles((prev) =>
        prev.map((role) =>
          role.roleId === updatedRole.roleId ? updatedRole : role,
        ),
      );

      setUpdateModalOpen(false);
      setSelectedRole(null);
    } catch (err) {
      console.error("Erro ao atualizar função", err);
    }
  }

  async function handleDelete() {
    if (!selectedRole) return;

    try {
      await deleteRole(selectedRole.roleId);
      setRoles((prev) => prev.filter((r) => r.roleId !== selectedRole.roleId));
    } catch (err) {
      console.error("Erro ao deletar função:", err);
    } finally {
      setConfirmModalOpen(false);
      setSelectedRole(null);
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 w-full">
        <table className="w-full border-collapse text-sm text-white">
          <thead className="bg-white/5 text-center">
            <tr>
              <th className="px-4 py-3 text-start">Nome</th>
              <th className="px-4 py-3 text-start">Permissões</th>
              {(canAccess(permissions, ["UPDATE_ROLE"]) ||
                canAccess(permissions, ["DELETE_ROLE"])) && (
                <th className="px-4 py-3 text-center">Ações</th>
              )}
            </tr>
          </thead>

          <tbody>
            {roles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  Nenhuma grupo de permissões encontrado
                </td>
              </tr>
            )}

            {roles.map((role) => (
              <tr
                key={role.roleId}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 text-white/80">{role.name}</td>

                <td className="px-4 py-3 text-white/80 ">
                  <div className="flex justify-start gap-2">
                    {role.permissions.map((p) => (
                      <span
                        key={p.permissionId}
                        className="rounded-md bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </td>

                {(canAccess(permissions, ["UPDATE_ROLE"]) ||
                  canAccess(permissions, ["DELETE_ROLE"])) && (
                  <td className="px-4 py-3 text-right flex justify-center">
                    <div className="flex justify-end gap-2">
                      {canAccess(permissions, ["UPDATE_ROLE"]) && (
                        <button
                          onClick={() => {
                            setSelectedRole(role);
                            setUpdateModalOpen(true);
                          }}
                          className="rounded-md bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-500/30 transition cursor-pointer"
                        >
                          Editar
                        </button>
                      )}

                      {canAccess(permissions, ["DELETE_ROLE"]) && (
                        <button
                          onClick={() => {
                            setSelectedRole(role);
                            setConfirmModalOpen(true);
                          }}
                          className="rounded-md bg-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/30 transition cursor-pointer"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {canAccess(permissions, ["UPDATE_ROLE"]) && (
        <Modal
          isOpen={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        >
          <UpdateRoleModal
            title={`Editar ${selectedRole?.name}`}
            isOpen={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            onSubmit={handleUpdate}
            selectedRole={selectedRole}
          />
        </Modal>
      )}

      {canAccess(permissions, ["DELETE_ROLE"]) && (
        <ConfirmAlert
          isOpen={confirmModalOpen}
          title="Excluir Função"
          message={`Deseja realmente excluir ${selectedRole?.name}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmModalOpen(false);
          }}
        />
      )}
    </>
  );
}
