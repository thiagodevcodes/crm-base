import axios from "axios";
import { BannerCategory } from "../types/bannerCategory";

export async function getBannerCategories(): Promise<BannerCategory[]> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/banner_categories`, {
    withCredentials: true,
  });

  return response.data;
}

export async function createBannerCategory(
  title: string,
  width: number,
  height: number
): Promise<BannerCategory> {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/banner_categories`,
    { title, width, height },
    { withCredentials: true },
  );

  return response.data;
}

export async function deleteBannerCategory(bannerCategoryId: string): Promise<void> {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/banner_categories/${bannerCategoryId}`, {
    withCredentials: true,
  });
}

export async function updateBannerCategory(
  id: string,
  title: string,
  width: number,
  height: number
): Promise<BannerCategory> {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/banner_categories/${id}`,
    { title, width, height },
    { withCredentials: true },
  );

  return response.data;
}
