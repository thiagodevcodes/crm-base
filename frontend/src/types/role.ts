import { UserRole } from "@/constants/roles";

export interface Role {
  roleId: string;
  name: UserRole; // 👈 AQUI está o segredo
}

export type RoleOption = {
  value: UserRole;
  label: UserRole;
};
