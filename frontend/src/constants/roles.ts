export const ROLES = {
  ADMIN: "ADMIN",
  BASIC: "BASIC",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];