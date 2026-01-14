"use client";

import { Role } from "@/types/role";

type Props = {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
};

export function RolesTable({ roles }: Props) {
  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900 w-full">
        <table className="w-full border-collapse text-sm text-white">
          <thead className="bg-white/5 text-left">
            <tr>
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Permissões</th>
            </tr>
          </thead>

          <tbody>
            {roles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                  Nenhuma grupo de permissões encontrado
                </td>
              </tr>
            )}

            {roles.map((role) => (
              <tr
                key={role.roleId}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 font-medium">{role.roleId}</td>
                <td className="px-4 py-3 text-white/80">{role.name}</td>

                <td className="px-4 py-3 text-white/80">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions?.map((p) => (
                      <span
                        key={p.permissionId}
                        className="rounded-md bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
