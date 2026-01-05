import { UserRole } from "@/constants/roles"

export function canAccess(
  userRoles: UserRole[],
  allowedRoles: UserRole[]
): boolean {
  return userRoles.some(role => allowedRoles.includes(role));
};