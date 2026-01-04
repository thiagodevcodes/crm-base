"use client";

import { User } from "@/types/user";
import { deleteUser } from "@/services/user";
import { useState } from "react";
import { ConfirmAlert } from "./confirmAlert";

type Props = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>; // adiciona para atualizar lista
};

export function UsersTable({ users, setUsers }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleDelete() {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.userId);
      setUsers((prev) =>
        prev.filter((u) => u.userId !== selectedUser.userId)
      );
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
    } finally {
      setConfirmOpen(false);
      setSelectedUser(null);
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 w-full">
        <table className="w-full border-collapse text-sm text-white">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Permissões</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}

            {users.map((user) => (
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

                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setConfirmOpen(true);
                      }}
                      className="rounded-md bg-red-500/20 px-3 py-1 text-xs text-red-400 hover:bg-red-500/30 transition cursor-pointer"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmAlert
        isOpen={confirmOpen}
        title="Excluir Usuário"
        message={`Deseja realmente excluir ${selectedUser?.name}?`}
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
}
