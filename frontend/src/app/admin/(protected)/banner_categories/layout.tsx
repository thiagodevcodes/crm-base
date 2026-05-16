"use client";

import { ReactNode } from "react";
import { BannerCategoryProvider } from "@/modules/banner_categories/contexts/context";
import { BannerProvider } from "@/modules/banners/contexts/context";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <BannerCategoryProvider>
      <BannerProvider>{children}</BannerProvider>
    </BannerCategoryProvider>
  );
}
