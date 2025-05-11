'use client'

import { useSidebar } from "@/contexts/sidebarContext";
import Image from "next/image";
import { useDeviceType } from "@/hooks/useDeviceType";
import { ChevronFirst, ChevronLast, EllipsisVertical, Settings } from "lucide-react"
import Link from "next/link"
import { createContext, ReactNode, useContext, useState } from "react";
import { SidebarItemsType } from "@/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
  options?: SidebarItemsType[];
  url: string;
};

type SidebarProps = {
  children: ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  const { expanded, setExpanded } = useSidebar();
  const device = useDeviceType()

  return (
    <div className={`h-[calc(100vh-64px)] ${expanded ? "w-60" : "w-20"} transition-all duration-200 z-10 relative`}>
      <nav className={`border-r bg-slate-200 shadow-sm border-gray-300 h-full flex flex-col justify-between px-2`}>
        <div>
          <div className="flex items-center justify-between px-3 py-3">

            <Image className={`overflow-hidden transition-all`} alt="Logo SOS" src="/sos.png" width={80} height={80} />
 

            
              <button onClick={() => setExpanded(curr => !curr)} className="p-2 bg-slate-300 rounded-lg cursor-pointer">
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            

          </div>
          <ul>{children}</ul>
        </div>
      </nav>
    </div>
  );
}

export function SidebarItem({ icon, text, url, active, options }: SidebarItemProps) {
  const { expanded } = useSidebar();

  return (
    <li className="flex justify-between">
      <Link href={url} className={`w-full flex gap-2 py-2 ${active ? "bg-gradient-to-tr from-sky-300 to-sky-200 text-black rounded-lg font-bold" : ""} duration-200 hover:bg-slate-300 hover:rounded-lg my-1 pl-5 cursor-pointer`}>
        <div>{icon}</div>
        <span className={`overflow-hidden transition-all block text-start ${expanded ? "w-full ml-3" : "w-0"}`}>{text}</span>

        {options && expanded &&

          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {options?.map((item, index) => {
                return (
                  <Link key={index} href={item.url} className="cursor-pointer">
                    <DropdownMenuItem>
                      {item.text}
                    </DropdownMenuItem>
                  </Link>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

        }
      </Link>
    </li>
  );
}

{/* <Link href={item.url}>{item.text}</Link> */ }








{/* <li className="flex justify-between">
{options ?
  <DropdownMenu>
    <DropdownMenuTrigger className={`w-full flex gap-2 py-2 ${active ? "bg-gradient-to-tr from-indigo-300 to-indigo-200 text-indigo-800 rounded-lg font-bold" : ""} transition-all duration-200 hover:bg-slate-300 hover:rounded-lg my-1 pl-5 cursor-pointer`}>
      {icon}
      <span className={`overflow-hidden transition-all block text-start ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Opções</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {options?.map((item, index) => {
        return (
          <Link key={index} href={item.url} className="cursor-pointer">
            <DropdownMenuItem>
              {item.text}
            </DropdownMenuItem>
          </Link>
        )
      })}
    </DropdownMenuContent>
  </DropdownMenu>

  :

  <Link href={url} className={`w-full flex gap-2 py-2 ${active ? "bg-gradient-to-tr from-indigo-300 to-indigo-200 text-indigo-800 rounded-lg font-bold" : ""} transition-all duration-200 hover:bg-slate-300 hover:rounded-lg my-1 pl-5 cursor-pointer`}>
    {icon}
    <span className={`overflow-hidden transition-all block text-start ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>

    <div>
      <EllipsisVertical />
    </div>
  </Link>
}
</li> */}