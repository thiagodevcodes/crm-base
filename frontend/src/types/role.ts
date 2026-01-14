export interface Role {
  roleId: string;
  name: string;
  permissions: { name: string }[];
}

export type RoleOption = {
  value: string;
  label: string;
};

export type RoleFormData = {
  roleId: string;
  name: string;
};
