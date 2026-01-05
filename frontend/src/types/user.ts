import { UserRole } from "@/constants/roles";
import { AxiosError, AxiosResponse } from "axios";

export interface Role {
  roleId: string;
  name: UserRole; // 👈 AQUI está o segredo
}

export interface User {
  userId: string;
  name: string;
  username: string;
  roles: Role[];
}

export type UserFormData = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: RoleOption[]
};

export type RoleOption = {
  value: UserRole;
  label: string;
};

export type CreateUserResult =
  | { success: true; response: AxiosResponse }
  | { success: false; response: AxiosError };