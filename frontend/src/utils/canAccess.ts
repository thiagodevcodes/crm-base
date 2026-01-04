import { Role } from "@/constants/roles"

export function canAccess(
  userRoles: Role[],
  allowedRoles: Role[]
): boolean {
  return userRoles.some(role => allowedRoles.includes(role));
};