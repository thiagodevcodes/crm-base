'use client'

import { Sidebar, SidebarItem } from "@/components/sidebar";
import { Building, Home, Users, Search, Settings, ChevronFirst, LucideIcon, EllipsisVertical } from "lucide-react"
import { ReactNode } from "react";
import { Dropdown, DropdownButton } from "@/components/dropdown";
import { useDeviceType } from "@/hooks/useDeviceType";
import { SidebarProvider, useSidebar } from "@/contexts/sidebarContext";
import { usePathname } from "next/navigation";
import { SidebarItemsType } from "@/types";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type AdminLayoutProps = {
  children: ReactNode;
}

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const device = useDeviceType();
  const pathname = usePathname()
  const { expanded, setExpanded } = useSidebar();

  return (
    <div className={`layout-grid ${expanded ? "grid-cols-[270px_1fr]" : "grid-cols-[80px_1fr]"} transition-all`}>
      <header className="area-header bg-slate-200 w-full border-b border-gray-300 flex justify-between p-5 z-50">
        <div className="flex border-gray-300 items-center gap-2">
          <Image className={`overflow-hidden transition-all`} alt="Logo SOS" src="/sos.png" width={80} height={80} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </header>

      {device == "desktop" &&
        <aside className="area-sidebar z-100">
          <Sidebar>
            <SidebarItem icon={<Home width={25} />} text="Home" url={"/admin"} active={pathname == '/admin'} />
            <SidebarItem icon={<Building width={25} />} text="Equipe" url={"/admin/equipe"} active={pathname == '/admin/equipe'} options={[{ text: 'Adicionar', url: '/admin/equipe/adicionar' }, { text: 'Listar', url: '/admin/equipe' }]} />
            <SidebarItem icon={<Users width={25} />} text="Usuários" url={"/admin/usuarios"} active={pathname == '/admin/usuarios'} />
            <SidebarItem icon={<Settings width={25} />} text="Configurações" url={"#"} />
          </Sidebar>
        </aside>
      }

      <main className={`area-main`}>

        {device != "desktop" &&
          <div className="fixed z-100">
            <Sidebar>
              <SidebarItem icon={<Home width={25} />} text="Home" url={"/admin"} active={pathname == '/admin'} />
              <SidebarItem icon={<Building width={25} />} text="Equipe" url={"/admin/equipe"} active={pathname == '/admin/equipe'} options={[{ text: 'Adicionar', url: '/admin/equipe/adicionar' }, { text: 'Listar', url: '/admin/equipe' }]} />
              <SidebarItem icon={<Users width={25} />} text="Usuários" url={"/admin/usuarios"} active={pathname == '/admin/usuarios'} />
              <SidebarItem icon={<Settings width={25} />} text="Configurações" url={"#"} />
            </Sidebar>
          </div>
        }
        <div className={`px-10 ${device != "desktop" && "pl-28 pr-10"} relative`}>
          {children}
        </div>
      </main>
      {/* <footer className="area-footer"></footer> */}
    </div>
  );
}

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </SidebarProvider>
  );
}