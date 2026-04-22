"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { canAccess } from "@/shared/utils/canAccess";
import { useAuth } from "@/modules/auth/hooks/useAuth";

type SubItem = {
  label: string;
  href: string;
  permission: string;
};

type AccordionMenuItemProps = {
  title: string;
  icon?: React.ReactNode;
  items: SubItem[];
};

export default function AccordionMenuItem({
  title,
  icon,
  items,
}: AccordionMenuItemProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? "active" : "");
  const { permissions } = useAuth();

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2 transition nav-link cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-bold">{title}</span>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`ml-6 mt-1 overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {items.map(
          (item, index) =>
            canAccess(permissions, [item.permission]) && (
              <Link
                key={index}
                href={item.href}
                className={`block py-2 text-gray-300 transition nav-link ${isActive(item.href)}`}
              >
                {item.label}
              </Link>
            ),
        )}
      </div>
    </div>
  );
}
