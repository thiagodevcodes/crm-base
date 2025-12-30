import { useState } from "react";
import { Dropdown, DropdownItem } from "../global/dropdown";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);
  const { user } = useAuth();

  async function handleLogout() {
    try {
      await axios.post("http://localhost:8080/auth/sign_out", null, {
        withCredentials: true,
      });
      setAuthenticated(false);
      router.replace("/admin"); // redireciona para login
    } catch (err) {
      console.error("Erro ao deslogar", err);
    }
  }

  return (
    <header
      className="
        col-start-2 bg-black px-8 py-3 flex items-center justify-between
        z-20
        "
    >
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <Dropdown
        trigger={
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm">Olá, {user?.name}</span>
            <div className="w-9 h-9 rounded-full bg-[#0d8cd7] flex items-center text-white justify-center font-bold">
              T
            </div>
          </div>
        }
      >
        <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
      </Dropdown>
    </header>
  );
}
