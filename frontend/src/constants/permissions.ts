import { UserRole, ROLES } from "./roles";

export const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  "/admin/dashboard": [ROLES.ADMIN, ROLES.BASIC],
  "/admin/users": [ROLES.ADMIN],
};