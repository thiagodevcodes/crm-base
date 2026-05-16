import { createContext, ReactNode, useContext } from "react";
import { useBanners } from "../hooks/useBanners";
import React from "react";
import { BannerFile, BannerFormData } from "../types/banner";

type BannerContextType = {
  banners: BannerFile[];
  loading: boolean;
  fetchBanners: () => Promise<void>;
  fetchBannersByCategory: (id: string) => Promise<void>;
  removeBanner: (id: string) => Promise<void>;
  addBanner: (banner: BannerFormData) => Promise<void>;
};

const BannerContext = createContext<BannerContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function BannerProvider({ children }: Props) {
  const bannersState = useBanners();

  return (
    <BannerContext.Provider value={bannersState}>
      {children}
    </BannerContext.Provider>
  );
}

export function useBannerContext() {
  const context = useContext(BannerContext);

  if (!context) {
    throw new Error("useExperienceContext must be used within ExperienceProvider");
  }

  return context;
}