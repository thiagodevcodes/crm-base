"use client";

import { ReactNode } from "react";
import { Layout } from "@/components/admin/ui/layout";
import { MobileMenuProvider } from "@/contexts/mobileMenuContext";

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
