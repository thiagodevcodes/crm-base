import { Role } from "@/types/role";
import axios from "axios";

export async function getRoles(): Promise<Role[]> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
    withCredentials: true,
  });

  return response.data;
}

export async function createRole(
  name: string,
  permissions: string[],
): Promise<Role> {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/roles`,
    { name, permissions },
    { withCredentials: true },
  );

  return response.data;
}

export async function deleteRole(roleId: string): Promise<void> {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`, {
    withCredentials: true,
  });
}

export async function updateRole(
  id: string,
  name: string,
  permissions: string[],
): Promise<Role> {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/roles/${id}`,
    { name, permissions },
    { withCredentials: true },
  );

  return response.data;
}
