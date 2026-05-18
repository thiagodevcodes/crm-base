import { useState } from "react";
import {
  getBanners,
  deleteFile,
  createBanner,
  getBannersById,
  getBannersByCategory,
} from "../services/banners";
import { BannerFile, BannerFormData } from "../types/banner";
import { delay } from "@/shared/utils/functions";

export function useBanners() {
  const [banners, setBanners] = useState<BannerFile[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // CREATE
  const addBanner = async (banner: BannerFormData) => {
    const newBanners = await createBanner(
      banner.files,
      banner.bannerCategoryId,
    );

    const bannersData = await Promise.all(
      newBanners.map((item) => getBannersById(item.bannerId)),
    );

    setBanners((prev) => [...prev, ...bannersData]);
  };

  // READ
  const fetchBanners = async () => {
    setLoadingData(true);
    const data = await getBanners();
    await delay(1000);
    setBanners(data);
    setLoadingData(false);
  };

  // READ
  const fetchBannersByCategory = async (id: string) => {
    setLoadingData(true);
    const data = await getBannersByCategory(id);
    await delay(1000);
    setBanners(data);
    setLoadingData(false);
  };

  // DELETE
  const removeBanner = async (id: string) => {
    await deleteFile(id);

    setBanners((prev) => prev.filter((exp) => exp.bannerId !== id));
  };

  return {
    banners,
    loadingData,
    fetchBanners,
    removeBanner,
    fetchBannersByCategory,
    addBanner,
  };
}
