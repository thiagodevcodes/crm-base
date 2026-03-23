"use client";

import { ReactNode } from "react";
import { RoleProvider } from "@/modules/roles/contexts/context";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <RoleProvider>
      {children}
    </RoleProvider>
  );
}