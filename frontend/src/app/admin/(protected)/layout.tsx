"use client";

import { ReactNode } from "react";
import { Layout } from "@/shared/components/ui/layout";
import { MobileMenuProvider } from "@/shared/contexts/mobileMenuContext";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    <MobileMenuProvider>
      <Layout>{children}</Layout>
    </MobileMenuProvider>
  );
}
