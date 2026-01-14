export interface Role {
  roleId: string;
  name: string;
  permissions: { permissionId: string; name: string }[];
}

export type RoleOption = {
  value: string;
  label: string;
};

export type RoleFormData = {
  roleId: string;
  name: string;
};
