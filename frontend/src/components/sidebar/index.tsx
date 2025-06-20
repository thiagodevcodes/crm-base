'use client'

import { useSidebar } from "@/contexts/sidebarContext";
import { useDeviceType } from "@/hooks/useDeviceType";
import Link from "next/link"
import { ReactNode } from "react";
import { SidebarItemsType } from "@/types";
import Collapsible from "../collapsibe";

type SidebarItemProps = {
  icon?: ReactNode;
  text: string;
  active?: boolean;
  url: string;
};

type CollapsibeSidebarItemProps = {
  icon?: ReactNode;
  text: string;
  active?: boolean;
  url?: string;
  collapsibe?: boolean;
  children: ReactNode;
};

type SidebarProps = {
  children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  const { expanded, setExpanded } = useSidebar();
  const device = useDeviceType()

  return (
    <div className={`h-dvh w-full`}>
      <nav className={`border-r bg-slate-200 shadow-sm border-gray-300 h-full flex flex-col justify-between px-2`}>
        <div>
          <div className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-1.5">
              <img src="https://ui-avatars.com/api/?background=black&color=fff&bold=true" className="rounded-full w-10" alt="" />

              {expanded &&
                <div className="flex flex-col">
                  <p className="font-bold">John Doe</p>
                  <p className="text-sm font-light">johndoe@gmail.com</p>
                </div>
              }
            </div>

          </div>
          <ul>{children}</ul>
        </div>
      </nav>
    </div>
  );
}

export function SidebarItem({ icon, text, url, active }: SidebarItemProps) {
  const { expanded } = useSidebar();

  return (
    <li className="flex justify-between">
      <Link href={url} className={`w-full flex gap-2 py-2 ${active ? "bg-gradient-to-tr from-sky-300 to-sky-200 text-black rounded-lg font-bold" : ""} duration-200 hover:bg-slate-300 hover:rounded-lg my-1 pl-5 cursor-pointer`}>
        {icon}
        <span className={`overflow-hidden transition-all block text-start ${expanded ? "w-full ml-3" : "w-0"}`}>{text}</span>
      </Link>
    </li>
  );
}

export function CollapsibeSidebarBox({ icon, text, children, active }: CollapsibeSidebarItemProps) {
  const { expanded } = useSidebar();

  return (
    <Collapsible trigger={
      <div className={`w-full flex gap-2 py-2 ${active ? "bg-gradient-to-tr from-sky-300 to-sky-200 text-black rounded-lg font-bold" : ""} duration-200 hover:bg-slate-300 hover:rounded-lg my-1 pl-5 cursor-pointer`}>
        {icon}
        <span className={`overflow-hidden transition-all block text-start ${expanded ? "w-full ml-3" : "w-0"}`}>{text}</span>
      </div>
    }
    >
      {children}
    </Collapsible>
  );
}

