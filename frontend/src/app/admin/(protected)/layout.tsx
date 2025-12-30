"use client";

import { ReactNode } from "react";
import { Layout } from "@/components/admin/layout";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    <Layout>
      {children}
    </Layout> 
  );
}
