"use client";

import { User, UserFormData } from "../types";
import { useEffect, useState } from "react";
import { ConfirmAlert } from "../../../shared/components/ui/confirmAlert";
import { canAccess } from "@/shared/utils/canAccess";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Spinner } from "@/shared/components/ui/spinner";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface UsersTableProps {
  data: User[];
  loadingData?: boolean;
  onDelete: (id: string) => void;
}

export function UsersTable({
  data,
  loadingData,
  onDelete,
}: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { permissions } = useAuth();
  const pathname = usePathname();


  async function handleDelete() {
    if (!selectedUser) return;
    onDelete(selectedUser.userId);
    setConfirmModalOpen(false);
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 w-full">
        <table className="w-full border-collapse text-sm text-white">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Perfis do Usuário</th>
              {(canAccess(permissions, ["UPDATE_USER"]) ||
                canAccess(permissions, ["UPDATE_PASSWORD_USER"]) ||
                canAccess(permissions, ["DELETE_USER"])) && (
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
                  Nenhum usuário encontrado
                </td>
              </tr>
            ) : (
              data.map((user) => (
                <tr
                  key={user.userId}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-white/80">{user.username}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <span
                          key={role.roleId}
                          className="rounded-md bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400"
                        >
                          {role.name}
                        </span>
                      ))}
                    </div>
                  </td>

                  {(canAccess(permissions, ["UPDATE_USER"]) ||
                    canAccess(permissions, ["UPDATE_PASSWORD_USER"]) ||
                    canAccess(permissions, ["DELETE_USER"])) && (
                    <td className="px-4 py-3 text-right flex justify-center">
                      <div className="flex justify-end gap-2">
                        {canAccess(permissions, ["UPDATE_PASSWORD_USER"]) && (
                          <Link
                            href={`/admin/users/reset-password/${user.userId}`}
                          >
                            <button className="rounded-md bg-green-500/20 px-3 py-1 text-xs text-green-400 hover:bg-green-500/30 transition cursor-pointer">
                              Alterar Senha
                            </button>
                          </Link>
                        )}

                        {canAccess(permissions, ["UPDATE_USER"]) && (
                          <Link href={`/admin/users/edit/${user.userId}`}>
                            <button className="rounded-md bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-500/30 transition cursor-pointer">
                              Editar
                            </button>
                          </Link>
                        )}

                        {canAccess(permissions, ["DELETE_USER"]) && (
                          <button
                            onClick={() => {
                              setSelectedUser(user);
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

      {canAccess(permissions, ["DELETE_USER"]) && (
        <ConfirmAlert
          isOpen={confirmModalOpen}
          title="Excluir Usuário"
          message={`Deseja realmente excluir ${selectedUser?.name}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmModalOpen(false);
          }}
        />
      )}
    </>
  );
}
