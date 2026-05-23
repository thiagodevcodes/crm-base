import { useEffect, useState } from "react";
import {
  getBannerCategories,
  createBannerCategory,
  updateBannerCategory,
  deleteBannerCategory,
  getBannerCategory,
  getCount,
} from "../services/banner_categories";
import { BannerCategory } from "../types";
import { delay } from "@/shared/utils/functions";

export function useBannerCategories() {
  const [banner_categories, setBannerCategories] = useState<BannerCategory[]>(
    [],
  );
  const [loadingData, setLoadingData] = useState(false);

  const [countBannerCategories, setCountBannerCategories] = useState<number>(0);

  // COUNT
  const getCountBannerCategories = async () => {
    const data = await getCount();
    setCountBannerCategories(data);
    return data;
  };


  // READ  
  const fetchBannerCategory = async (id: string) => {
    const data = await getBannerCategory(id);
    return data;
  };

  // READ
  const fetchBannerCategories = async () => {
    setLoadingData(true);
    const data = await getBannerCategories();
    await delay(1000);
    setBannerCategories(data);
    setLoadingData(false);
  };

  // CREATE
  const addBannerCategory = async (bannerCategory: BannerCategory) => {
    const newBannerCategory = await createBannerCategory(
      bannerCategory.title,
      bannerCategory.width,
      bannerCategory.height,
    );
    setBannerCategories((prev) => [...prev, newBannerCategory]);
  };

  // UPDATE
  const editBannerCategory = async (
    id: string,
    bannerCategory: BannerCategory,
  ) => {
    const updated = await updateBannerCategory(
      id,
      bannerCategory.title,
      bannerCategory.width,
      bannerCategory.height,
    );

    setBannerCategories((prev) =>
      prev.map((cat) => (cat.bannerCategoryId === id ? updated : cat)),
    );
  };

  // DELETE
  const removeBannerCategory = async (id: string) => {
    await deleteBannerCategory(id);

    setBannerCategories((prev) =>
      prev.filter((cat) => cat.bannerCategoryId !== id),
    );
  };

  useEffect(() => {
    fetchBannerCategories();
  }, []);

  return {
    banner_categories,
    loadingData,
    fetchBannerCategories,
    fetchBannerCategory,
    addBannerCategory,
    editBannerCategory,
    countBannerCategories,
    getCountBannerCategories,
    removeBannerCategory,
  };
}
