"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  trigger: React.ReactNode;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

export function Dropdown({ trigger, children, align="right" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* TRIGGER */}
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>

      <div
        className={`
        absolute z-50 mt-3 min-w-[180px] origin-top
        rounded-md border border-slate-700 bg-slate-900 shadow-lg
        transition-all duration-150 ease-out

        ${align === "right" ? "right-0" : ""}
        ${align === "left" ? "left-0" : ""}
        ${align === "center" ? "left-1/2 -translate-x-1/2" : ""}

        ${
          open
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-95 opacity-0 -translate-y-1 pointer-events-none"
        }
      `}
      >
        {children}
      </div>
    </div>
  );
}

interface DropdownItemProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function DropdownItem({ href, onClick, children }: DropdownItemProps) {
  const className =
    "flex justify-center w-full text-center px-4 py-2 text-sm text-white/80 hover:bg-slate-800 hover:text-white transition cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
