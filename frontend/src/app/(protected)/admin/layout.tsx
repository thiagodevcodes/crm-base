"use client";

import { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return <div>{children}</div>;
}
