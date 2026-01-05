import { AxiosError, AxiosResponse } from "axios";
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

export type CreateUserResult =
  | { success: true; response: AxiosResponse }
  | { success: false; response: AxiosError };