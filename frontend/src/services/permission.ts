import { Permission } from "@/types/permission";
import axios from "axios";

export async function getPermissions(): Promise<Permission[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/permissions`,
    {
      withCredentials: true,
    },
  );

  return response.data;
}

export async function createPermission(name: string): Promise<Permission> {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/permissions`,
    { name },
    { withCredentials: true },
  );

  return response.data;
}
