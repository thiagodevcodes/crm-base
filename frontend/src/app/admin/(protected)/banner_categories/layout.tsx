"use client";

import { ReactNode } from "react";
import { BannerCategoryProvider } from "@/modules/banner_categories/contexts/context";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <BannerCategoryProvider>
      {children}
    </BannerCategoryProvider>
  );
}