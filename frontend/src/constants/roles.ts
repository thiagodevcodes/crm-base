export const ROLES = {
  ADMIN: "ADMIN",
  BASIC: "BASIC",
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];