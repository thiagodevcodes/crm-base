import { useEffect, useState } from "react";
import {
  getBannerCategories,
  createBannerCategory,
  updateBannerCategory,
  deleteBannerCategory,
} from "../services/banner_categories";
import { BannerCategory } from "../types/bannerCategory";
import { delay } from "@/shared/utils/functions";

export function useBannerCategories() {
  const [banner_categories, setBannerCategories] = useState<BannerCategory[]>([]);
  const [loading, setLoading] = useState(false);

  // READ
  const fetchBannerCategories = async () => {
    setLoading(true);
    const data = await getBannerCategories();
    await delay(1000);
    setBannerCategories(data);
    setLoading(false);
  };

  // CREATE
  const addBannerCategory = async (bannerCategory: BannerCategory) => {
    const newBannerCategory = await createBannerCategory(
      bannerCategory.title,
      bannerCategory.width,
      bannerCategory.height
    );
    setBannerCategories((prev) => [...prev, newBannerCategory]);
  };

  // UPDATE
  const editBannerCategory = async (id: string, bannerCategory: BannerCategory) => {
    const updated = await updateBannerCategory(
      id,
      bannerCategory.title,
      bannerCategory.width,
      bannerCategory.height
    );

    setBannerCategories((prev) =>
      prev.map((cat) => (cat.bannerCategoryId === id ? updated : cat)),
    );
  };

  // DELETE
  const removeBannerCategory = async (id: string) => {
    await deleteBannerCategory(id);

    setBannerCategories((prev) => prev.filter((cat) => cat.bannerCategoryId !== id));
  };

  useEffect(() => {
    fetchBannerCategories();
  }, []);

  return {
    banner_categories,
    loading,
    fetchBannerCategories,
    addBannerCategory,
    editBannerCategory,
    removeBannerCategory,
  };
}
