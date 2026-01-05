"use client";

import { User, UserFormData } from "@/types/user";
import { deleteUser, updatePassword, updateUser } from "@/services/user";
import { useState } from "react";
import { ConfirmAlert } from "./confirmAlert";
import { PasswordModal } from "./passwordModal";
import { UpdateUserModal } from "./updateUserModal";

type Props = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>; // adiciona para atualizar lista
};

export function UsersTable({ users, setUsers }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleUpdate(data: UserFormData) {
    if (!selectedUser) return;

    try {
      const roles = data.roles.map((opt) => opt.value);

      const updatedUser = await updateUser(
        selectedUser.userId,
        data.name,
        data.username,
        roles
      );

      setUsers((prev) =>
        prev.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
      );

      setOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Erro ao atualizar usuário", err);
    }
  }

  async function handleUpdatePassword(data: UserFormData) {
    if (!selectedUser) return;

    try {
      const updatedUser = await updatePassword(
        selectedUser.userId,
        data.password
      );

      setUsers((prev) =>
        prev.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
      );

      setModalPasswordOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Erro ao atualizar usuário", err);
    }
  }

  async function handleDelete() {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.userId);
      setUsers((prev) => prev.filter((u) => u.userId !== selectedUser.userId));
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
                        setModalPasswordOpen(true);
                      }}
                      className="rounded-md bg-green-500/20 px-3 py-1 text-xs text-green-400 hover:bg-green-500/30 transition cursor-pointer"
                    >
                      Alterar Senha
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setOpen(true);
                      }}
                      className="rounded-md bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400 hover:bg-yellow-500/30 transition cursor-pointer"
                    >
                      Editar
                    </button>

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

      <PasswordModal
        title={`Senha de ${selectedUser?.name}`}
        isOpen={modalPasswordOpen}
        onClose={() => setModalPasswordOpen(false)}
        onSubmit={handleUpdatePassword}
        selectedUser={selectedUser}
      />

      <UpdateUserModal
        title={`Editar ${selectedUser?.name}`}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleUpdate}
        selectedUser={selectedUser}
      />

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
