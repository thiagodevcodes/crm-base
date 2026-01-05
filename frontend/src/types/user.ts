import { Role, RoleOption } from "./role";

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
