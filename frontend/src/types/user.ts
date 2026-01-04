import { Role } from "@/constants/roles";
import { AxiosError, AxiosResponse } from "axios";

export interface RoleEntity {
  roleId: string;
  name: Role; // 👈 AQUI está o segredo
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: RoleEntity[];
}

export type CreateUserResult =
  | { success: true; response: AxiosResponse }
  | { success: false; response: AxiosError };