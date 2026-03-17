import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updatePassword
} from "../services/user";
import { User, UserFormData } from "../types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // READ
  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  // CREATE
  const addUser = async (user: UserFormData) => {
    const roles = user.roles.map((opt) => opt.value);

    const newExp = await createUser(user.name, user.username, user.password, roles);
    setUsers((prev) => [...prev, newExp]);
  };

  // UPDATE
  const editUser = async (id: string, user: UserFormData) => {
    const roles = user.roles.map((opt) => opt.value);

    const updated = await updateUser(id, user.name, user.username, roles);

    setUsers((prev) =>
      prev.map((exp) => (exp.userId === id ? updated : exp))
    );
  };

  // UPDATE
  const editPassword = async (id: string, password: string) => {
    const updated = await updatePassword(id, password);

    setUsers((prev) =>
      prev.map((exp) => (exp.userId === id ? updated : exp))
    );
  };


  // DELETE
  const removeUser = async (id: string) => {
    await deleteUser(id);

    setUsers((prev) =>
      prev.filter((exp) => exp.userId !== id)
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    addUser,
    editUser,
    editPassword,
    removeUser
  };
}