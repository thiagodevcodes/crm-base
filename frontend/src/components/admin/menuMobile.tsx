"use client";

import Image from "next/image";

import { useMobileMenu } from "@/hooks/useMobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Aside } from "./aside";

export default function MobileMenu() {
  const { isOpen, closeMenu } = useMobileMenu();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Menu */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-white p-4
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `}
      >
        <Aside/>
      </aside>
    </>
  );
}
