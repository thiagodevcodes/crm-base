import { useEffect, useState } from "react";
import { getRoles } from "../services/role";
import { Role } from "../types/role";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRoles();
      setRoles(data);
    }

    fetchData();
  }, []);

  return { roles, setRoles };
}