'use client'

import {ChevronFirst, ChevronLast } from "lucide-react"
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

type SidebarContextType = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div className={`h-[calc(100vh-64px)] ${expanded ? "w-72" : "w-0"} flex z-100 relative`}>
      <nav className="border-r bg-slate-200 shadow-sm border-gray-300 h-full flex flex-col justify-between px-2 ">
        <div>
          <div className="flex items-center justify-between px-3 py-3">
            <img className={`overflow-hidden transition-all ${expanded ? "w-36" : "w-0"}`} src="https://img.logoipsum.com/243.svg" alt="" />

            <button onClick={() => setExpanded(curr => !curr)} className="p-2 bg-slate-300 rounded-lg cursor-pointer">
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>

          </div>
          <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <ul>{children}</ul>
          </SidebarContext.Provider>
        </div>
      </nav>
    </div>
  )
}

export function SidebarItem({ icon, text, url, active }: SidebarItemProps) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarItem must be used within a SidebarProvider");
  }

  const { expanded } = context;

  return (
    <li>
      <Link href={url} className={`flex gap-2 py-2  ${active ? "bg-gradient-to-tr from-indigo-300 to-indigo-200 text-indigo-800 rounded-lg font-bold" : ""} transition-all duration-300 hover:bg-slate-300 hover:rounded-lg my-1 pl-5 cursor-pointer`}>
        {icon}
        <span className={`overflow-hidden transition-all block ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      </Link>
    </li>
  );
}