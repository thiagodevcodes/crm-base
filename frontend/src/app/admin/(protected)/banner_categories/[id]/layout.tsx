"use client";

import { ReactNode } from "react";
import { BannerProvider } from "@/modules/banners/contexts/context";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <BannerProvider>
      {children}
    </BannerProvider>
  );
}