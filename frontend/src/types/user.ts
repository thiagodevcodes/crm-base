import { Role, RoleOption } from "./role";

export interface User {
  name: string;
  username: string;
  permissions: string[];
  roles: Role[]
}

export type UserFormData = {
  userId: string;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: RoleOption[]
};
