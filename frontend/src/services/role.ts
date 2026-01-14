import { Role } from "@/types/role";
import axios from "axios";

export async function getRoles(): Promise<Role[]> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
    withCredentials: true,
  });

  return response.data;
}
