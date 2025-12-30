import { useState } from "react";
import { Dropdown, DropdownItem } from "../global/dropdown";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "../global/spinnerLoading";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header
      className="
        col-start-2 bg-black px-8 py-3 flex items-center justify-between
        z-20
        "
    >
      <h2 className="text-xl font-semibold text-white">Dashboard</h2>

      <Dropdown
        trigger={
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm">Olá, {user?.name}</span>

            {user?.roles.map(role => (
              <span key={role.roleId} className="text-white">{role.name}</span>
            ))}

            <div className="w-9 h-9 rounded-full bg-[#0d8cd7] flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        }
      >
        <DropdownItem onClick={logout}>Sair</DropdownItem>
      </Dropdown>
    </header>
  );
}
