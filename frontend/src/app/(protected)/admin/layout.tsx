'use client'

import { Sidebar, SidebarItem, CollapsibeSidebarBox } from "@/components/sidebar";
import { Building, Home, Users, Settings } from "lucide-react"
import { ReactNode } from "react";
import { useDeviceType } from "@/hooks/useDeviceType";
import { SidebarProvider, useSidebar } from "@/contexts/sidebarContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Collapsible from "@/components/collapsibe";

type AdminLayoutProps = {
  children: ReactNode;
}

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const device = useDeviceType();
  const pathname = usePathname()
  const { expanded, setExpanded } = useSidebar();

  return (
    <div className={`layout-grid transition-all`}>
      <header className="area-header bg-slate-200 w-full border-b border-gray-300 flex justify-between p-5 z-50">
        <div className="flex border-gray-300 items-center gap-2">
          <Image className={`overflow-hidden transition-all`} alt="Logo SOS" src="/sos.png" width={80} height={80} />

        </div>
      </header>

      <aside className="area-sidebar z-100 hidden md:block">
        <Sidebar>
          <CollapsibeSidebarBox text="Equipe" icon={<Building width={25} />}>
            <SidebarItem text="Adicionar" url={"/admin/equipe/adicionar"} active={pathname == '/admin/equipe/adicionar'} />
            <SidebarItem text="Listar" url={"/admin/equipe"} active={pathname == '/admin/equipe'} />
          </CollapsibeSidebarBox>
          
          <SidebarItem icon={<Home width={25} />} text="Home" url={"/admin"} active={pathname == '/admin'} />
          <SidebarItem icon={<Users width={25} />} text="Usuários" url={"/admin/usuarios"} active={pathname == '/admin/usuarios'} />
          <SidebarItem icon={<Settings width={25} />} text="Configurações" url={"#"} />
        </Sidebar>
      </aside>

      <main className={`area-main m-10`}>
        {children}
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