import { Role, ROLES } from "./roles";

export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  "/admin/dashboard": [ROLES.ADMIN, ROLES.BASIC],
  "/admin/users": [ROLES.ADMIN],
};