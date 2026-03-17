import { createContext, ReactNode, useContext } from "react";
import React from "react";
import { User, UserFormData } from "../types/user";
import { useUsers } from "@/modules/users/hooks/useUsers";

type UserContextType = {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (user: UserFormData) => Promise<void>;
  editUser: (id: string, user: UserFormData) => Promise<void>;
  editPassword: (id: string, password: string) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const usersState = useUsers();

  return (
    <UserContext.Provider value={usersState}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useExperienceContext must be used within ExperienceProvider");
  }

  return context;
}