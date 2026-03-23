import { useEffect, useState } from "react";
import { getRoles, createRole, updateRole, deleteRole } from "../services/role";
import { delay } from "@/shared/utils/functions";
import { Role, RoleFormData } from "../types/role";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  // READ
  const fetchRoles = async () => {
    setLoading(true);
    const data = await getRoles();
    await delay(1000);
    setRoles(data);
    setLoading(false);
  };

  // CREATE
  const addRole = async (role: RoleFormData) => {
    const permissions = role.permissions.map((opt) => opt.value);

    const newExp = await createRole(role.name, permissions);
    setRoles((prev) => [...prev, newExp]);
  };

  // UPDATE
  const editRole = async (id: string, role: RoleFormData) => {
    const permissions = role.permissions.map((opt) => opt.value);

    const updated = await updateRole(id, role.name, permissions);

    setRoles((prev) => prev.map((exp) => (exp.roleId === id ? updated : exp)));
  };

  // DELETE
  const removeRole = async (id: string) => {
    await deleteRole(id);

    setRoles((prev) => prev.filter((exp) => exp.roleId !== id));
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    fetchRoles,
    addRole,
    editRole,
    removeRole,
  };
}
