'use client'

import { Sidebar, SidebarItem } from "@/components/sidebar";
import { Building, Home, Users, Search, Settings, ChevronFirst, LucideIcon, EllipsisVertical } from "lucide-react"
import { ReactNode, useEffect, useState } from "react";
import { Dropdown, DropdownButton, DropdownMenu } from "@/components/dropdown";
import { useDeviceType } from "@/hooks/useDeviceType";
import { SidebarProvider, useSidebar } from "@/contexts/sidebarContext";
import { usePathname } from "next/navigation";

type AdminLayoutProps = {
  children: ReactNode;
}

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const device = useDeviceType();
  const pathname = usePathname()
  const [url, setUrl] = useState('')

  useEffect(() => {
    console.log(pathname)
  }, [pathname])

  return (
    <div className={`layout-grid grid ${device == 'mobile' ? "grid-cols-[100px_1fr]" : "grid-cols-[250px_1fr]"}`}>
      <header className="area-header bg-slate-200 w-full border-b border-gray-300 flex justify-between p-5">
        <div className="flex border-gray-300 items-center gap-2">
          <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" className="rounded-full w-10" alt="" />
          <p className="font-bold">John Doe</p>
        </div>

        <Dropdown>
          <DropdownButton>
            <EllipsisVertical />
          </DropdownButton>
          <DropdownMenu />
        </Dropdown>
      </header>

      <aside className="area-sidebar">
        <Sidebar>
          <SidebarItem icon={<Home />} text="Home" url={"/admin"} active={pathname == '/admin'}/>
          <SidebarItem icon={<Building />} text="Equipe" url={"/admin/equipe"} active={pathname == '/admin/equipe'}/>
          <SidebarItem icon={<Users />} text="Usuários" url={"/admin/usuarios"} active={pathname == '/admin/usuarios'}/>
          <SidebarItem icon={<Settings />} text="Configurações" url={"#"} />
        </Sidebar>
      </aside>

      <main className="area-main">
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