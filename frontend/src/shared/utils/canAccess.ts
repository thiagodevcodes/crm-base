export function canAccess(
  userPermissions: string[],
  allowedPermissions: string[]
): boolean {
  // Se o usuário tiver ALL_ACCESS, libera tudo
  if (userPermissions.includes("ALL_ACCESS")) return true;

  // Verifica permissões normais
  return userPermissions.some((p) => allowedPermissions.includes(p));
}
