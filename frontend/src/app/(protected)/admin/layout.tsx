import { Sidebar, SidebarItem } from "@/components/sidebar";
import { Building, Home, Users, Search, Settings, ChevronFirst, LucideIcon, EllipsisVertical } from "lucide-react"
import { ReactNode } from "react";
import { Dropdown, DropdownButton, DropdownMenu } from "@/components/dropdown";

type AdminLayoutProps = {
  children: ReactNode;
}

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    <body>
      <div className="layout-grid">
        <header className="area-header bg-slate-200 w-full border-b border-gray-300 flex justify-between p-5">
          <div className="flex  border-gray-300 items-center gap-2">
            <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" className="rounded-full w-10" alt="" />
            <p className={`font-bold`}>John Doe</p>
          </div>

          <Dropdown>
            <DropdownButton>
              <EllipsisVertical />
            </DropdownButton>
            <DropdownMenu></DropdownMenu>
          </Dropdown>
        </header>
        <aside className="area-sidebar">
          <Sidebar>
            <SidebarItem icon={<Home />} text="Home" url={"#"} active />
            <SidebarItem icon={<Building />} text="Equipe" url={"#"} />
            <SidebarItem icon={<Users />} text="Usuários" url={"#"} />
            <SidebarItem icon={<Settings />} text="Configurações" url={"#"} />
          </Sidebar>
        </aside>

        <main className="area-main">
          {children}
        </main>
        {/* <footer className="area-footer"></footer> */}
      </div>

    </body>
  );
}
