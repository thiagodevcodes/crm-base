import { createContext, ReactNode, useContext } from "react";
import { useBannerCategories } from "../hooks/useBannerCategories";
import React from "react";
import { BannerCategory } from "../types";

type BannerCategoryContextType = {
  banner_categories: BannerCategory[];
  loading: boolean;
  fetchBannerCategories: () => Promise<void>;
  fetchBannerCategory: (id: string) => Promise<BannerCategory | null>;
  addBannerCategory: (bannerCategory: BannerCategory) => Promise<void>;
  editBannerCategory: (id: string, bannerCategory: BannerCategory) => Promise<void>;
  removeBannerCategory: (id: string) => Promise<void>;
};

const BannerCategoryContext = createContext<BannerCategoryContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function BannerCategoryProvider({ children }: Props) {
  const bannerCategoriesState = useBannerCategories();

  return (
    <BannerCategoryContext.Provider value={bannerCategoriesState}>
      {children}
    </BannerCategoryContext.Provider>
  );
}

export function useBannerCategoryContext() {
  const context = useContext(BannerCategoryContext);

  if (!context) {
    throw new Error("useBannerCategoryContext must be used within BannerCategoryProvider");
  }

  return context;
}