import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updatePassword
} from "../services/user";
import { User, UserFormData } from "../types";
import { delay } from "@/shared/utils/functions";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // READ
  const fetchUser = async (id: string) => {
    const data = await getUser(id);
    return data;
  };

  // READ
  const fetchUsers = async () => {
    setLoadingData(true);
    const data = await getUsers();
    await delay(1000);
    setUsers(data);
    setLoadingData(false);
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
    loadingData,
    fetchUsers,
    fetchUser,
    addUser,
    editUser,
    editPassword,
    removeUser
  };
}