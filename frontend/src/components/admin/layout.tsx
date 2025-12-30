"use client";

import { ReactNode, useEffect, useState } from "react";
import { Header } from "@/components/admin/header";
import { Footer } from "@/components/admin/footer";
import { Aside } from "@/components/admin/aside";
import MobileMenu from "./menuMobile";
import { useMobileMenu } from "@/hooks/useMobileMenu";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { isOpen, closeMenu } = useMobileMenu();

  return (
    <div
      className="
            grid 
            min-h-screen 
            grid-rows-[auto_1fr_auto]
            grid-cols-1
            lg:grid-cols-[260px_1fr]
        "
    >
      <aside className="hidden lg:block row-span-3">
        <Aside />
      </aside>

      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-white
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:hidden
        `}
      >
        <Aside />
      </aside>

      <header className="lg:col-start-2">
        <Header />
      </header>

      <main>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMenu}
          />
        )}
        {children}
      </main>

      <footer className="lg:col-start-2">
        <Footer />
      </footer>
    </div>
  );
}
