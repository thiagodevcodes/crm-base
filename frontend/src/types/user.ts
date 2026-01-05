import { Role, RoleOption } from "./role";

export interface User {
  userId: string;
  name: string;
  username: string;
  permissions: string[];
}

export type UserFormData = {
  userId: string;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: RoleOption[]
};
