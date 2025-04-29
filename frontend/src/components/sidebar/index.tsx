'use client'

import { useSidebar } from "@/contexts/sidebarContext";
import { useDeviceType } from "@/hooks/useDeviceType";
import { ChevronFirst, ChevronLast } from "lucide-react"
import Link from "next/link"
import { createContext, ReactNode, useContext, useState } from "react";


type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
  url: string;
};

type SidebarProps = {
  children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  const { expanded, setExpanded } = useSidebar();
  const device = useDeviceType()

  return (
    <div className={`h-[calc(100vh-64px)] ${expanded ? "w-full" : "w-0"} flex z-100 relative`}>
      <nav className={`${device != "mobile" && "w-full" }  border-r bg-slate-200 shadow-sm border-gray-300 h-full flex flex-col justify-between px-2`}>
        <div>
          <div className="flex items-center justify-between px-3 py-3">
            <img className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} src="https://img.logoipsum.com/243.svg" alt="" />

            { device == "mobile" &&
              <button onClick={() => setExpanded(curr => !curr)} className="p-2 bg-slate-300 rounded-lg cursor-pointer">
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            }

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
    <li>
      <Link href={url} className={`flex gap-2 py-2 ${active ? "bg-gradient-to-tr from-indigo-300 to-indigo-200 text-indigo-800 rounded-lg font-bold" : ""} transition-all duration-200 hover:bg-slate-300 hover:rounded-lg my-1 pl-5 cursor-pointer`}>
        {icon}
        <span className={`overflow-hidden transition-all block ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      </Link>
    </li>
  );
}