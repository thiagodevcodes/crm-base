import { createContext, ReactNode, useContext } from "react";
import { useRoles } from "../hooks/useRoles";
import React from "react";
import { Role, RoleFormData } from "../types/role";

type RoleContextType = {
  roles: Role[];
  loading: boolean;
  fetchRoles: () => Promise<void>;
  addRole: (role: RoleFormData) => Promise<void>;
  editRole: (id: string, role: RoleFormData) => Promise<void>;
  removeRole: (id: string) => Promise<void>;
};

const RoleContext = createContext<RoleContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function RoleProvider({ children }: Props) {
  const rolesState = useRoles();

  return (
    <RoleContext.Provider value={rolesState}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRoleContext() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useExperienceContext must be used within ExperienceProvider");
  }

  return context;
}