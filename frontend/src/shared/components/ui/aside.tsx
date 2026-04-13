import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Dropdown, DropdownItem } from "./dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faChartBar,
  faImages,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import { canAccess } from "@/shared/utils/canAccess";
import AccordionMenuItem from "@/shared/components/ui/accordion";

export function Aside() {
  const pathname = usePathname();
  const { user, logout, permissions } = useAuth();
  const isActive = (path: string) => (pathname === path ? "active" : "");

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
          {canAccess(permissions, ["VIEW_DASHBOARD"]) && (
            <Link
              href="/admin/dashboard"
              className={`nav-link flex items-center ${isActive("/admin/dashboard")}`}
            >
              <FontAwesomeIcon icon={faChartBar} />
              Dashboard
            </Link>
          )}

          {canAccess(permissions, ["GET_USERS"]) && (
            <AccordionMenuItem
              title="Usuários"
              icon={<FontAwesomeIcon icon={faUserGroup} />}
              items={[
                { label: "Lista", href: "/admin/users" },
                { label: "Perfis de Usuários", href: "/admin/roles" },
              ]}
            />
          )}

          {canAccess(permissions, ["GET_BANNER_CATEGORIES"]) && (
            <Link
              href="/admin/banner_categories"
              className={`nav-link flex items-center ${isActive("/admin/banner_categories")}`}
            >
              <FontAwesomeIcon icon={faImages} />
              Banners
            </Link>
          )}

          {canAccess(permissions, ["GET_EXPERIENCES"]) && (
            <Link
              href="/admin/experiences"
              className={`nav-link flex items-center ${isActive("/admin/experiences")}`}
            >
              <FontAwesomeIcon icon={faBriefcase} />
              Experiências
            </Link>
          )}
        </nav>

        <div className="lg:hidden flex justify-center w-full mt-2">
          <Dropdown
            align="center"
            trigger={
              <div className="items-center gap-4justify-center lg:hidden flex gap-2">
                <span className="text-white/80 text-sm ">
                  Olá, {user?.name}
                </span>

                <div className="w-9 h-9 rounded-full bg-[#0d8cd7] flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
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
