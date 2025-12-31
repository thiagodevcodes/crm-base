import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { Dropdown, DropdownItem } from "../global/dropdown";

export function Aside() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      <div className=" z-10 bg-slate-900 h-full px-4">
        <div className="flex items-center gap-2 text-white font-bold py-3">
          <Image
            className="py-3"
            src={"/logo-prime.png"}
            width={50}
            height={50}
            alt=""
          ></Image>
          <h2>Painel Admin</h2>
        </div>

        <nav className="mt-4">
          <Link
            href={"/admin/dashboard"}
            className={`nav-link ${
              pathname == "/admin/dashboard" ? "active" : ""
            }`}
          >
            <LayoutDashboard width={20} />
            Dashboard
          </Link>

          {user?.roles?.some((role) => role.name === "ADMIN") && (
            <Link
              href="/admin/users"
              className={`nav-link ${
                pathname === "/admin/users" ? "active" : ""
              }`}
            >
              <Users width={20} />
              Usuários
            </Link>
          )}
        </nav>

        <div className="lg:hidden flex justify-center w-full mt-2">
          <Dropdown align="center"
            trigger={
              <div className="items-center gap-4justify-center lg:hidden flex gap-2">
                <span className="text-white/80 text-sm ">
                  Olá, {user?.name}
                </span>

                <div className="w-9 h-9 rounded-full bg-[#0d8cd7] flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                {/* {user?.roles.map(role => (
                <span key={role.roleId} className="text-white">{role.name}</span>
              ))} */}
              </div>
            }
          >
            <DropdownItem onClick={logout}>Sair</DropdownItem>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
