import { useEffect, useState } from "react";
import { getBanners, deleteFile, createBanner, getBannersById, getBannersByCategory } from "../services/banners";
import { BannerFile, BannerFormData } from "../types/banner";
import { delay } from "@/shared/utils/functions";

export function useBanners() {
  const [banners, setBanners] = useState<BannerFile[]>([]);
  const [loading, setLoading] = useState(false);

  // CREATE
  const addBanner = async (banner: BannerFormData) => {
    const newExp = await createBanner(banner.file, banner.bannerCategoryId);
    const data = await getBannersById(newExp.bannerId);

    setBanners((prev) => [...prev, data]);
  };

  // READ
  const fetchBanners = async () => {
    setLoading(true);
    const data = await getBanners();
    await delay(1000);
    setBanners(data);
    setLoading(false);
  };

// READ
  const fetchBannersByCategory = async (id: string) => {
    setLoading(true);
    const data = await getBannersByCategory(id);
    await delay(1000);
    setBanners(data);
    setLoading(false);
  };


  // DELETE
  const removeBanner = async (id: string) => {
    await deleteFile(id);

    setBanners((prev) => prev.filter((exp) => exp.bannerId !== id));
  };

  return {
    banners,
    loading,
    fetchBanners,
    removeBanner,
    fetchBannersByCategory,
    addBanner
  };
}
