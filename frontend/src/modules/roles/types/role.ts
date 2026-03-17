import { Permission, PermissionOption } from "@/modules/permissions/types/permission";

export type Role = {
  roleId: string;
  name: string;
  permissions: Permission[];
}
export type RoleOption = {
  value: string;
  label: string;
};

export type RoleFormData = {
  name: string;
  permissions: PermissionOption[];
};