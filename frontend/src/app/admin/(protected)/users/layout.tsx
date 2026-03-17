"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/modules/users/contexts/context";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}