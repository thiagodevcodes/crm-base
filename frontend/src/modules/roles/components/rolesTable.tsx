"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { canAccess } from "@/shared/utils/canAccess";
import { ConfirmAlert } from "@/shared/components/ui/confirmAlert";
import { useState } from "react";
import { Role, RoleFormData } from "../types";
import { Spinner } from "@/shared/components/ui/spinner";
import Link from "next/link";

interface RoleTableProps {
  data: Role[];
  loadingData?: boolean;
  onDelete: (id: string) => void;
}

export function RolesTable({ data, loadingData, onDelete }: RoleTableProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { permissions } = useAuth();

  async function handleDelete() {
    if (!selectedRole) return;
    onDelete(selectedRole.roleId);
    setConfirmModalOpen(false);
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
            {loadingData ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  <Spinner width="30px" height="30px" />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  Nenhuma função encontrada
                </td>
              </tr>
            ) : (
              data.map((role) => (
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
                          <Link href={`/admin/roles/edit/${role.roleId}`}>
                            <button className="rounded-md bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-500/30 transition cursor-pointer">
                              Editar
                            </button>
                          </Link>
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
              ))
            )}
          </tbody>
        </table>
      </div>

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
