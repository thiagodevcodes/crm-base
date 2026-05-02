import { Permission } from "@/modules/permissions/types";
import { Role, RoleOption } from "@/modules/roles/types";

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


