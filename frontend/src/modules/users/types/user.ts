import { Role, RoleOption } from "@/modules/roles/types/role";

export interface User {
  userId: string;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  permissions: string[];
  roles: Role[];
}

export type UserFormData = {
  userId: string;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: RoleOption[];
};


