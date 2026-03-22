import { BannerFile, BannerFormData } from "@/modules/banners/types/banner";
import axios from "axios";

export async function createBanner(data: FileList): Promise<BannerFile> {
  const formData = new FormData();

  console.log(data)

  const file = data[0]

  formData.append("file", file); // nome deve bater com @RequestParam do backend
  formData.append("name", file.name);
  formData.append("size", String(file.size));
  formData.append("type", file.type);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/banners`,
    formData,
    { withCredentials: true },
  );

  return response.data;
}

export async function getBanners(): Promise<BannerFile[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/banners`,
    {
      withCredentials: true,
    },
  );

  return response.data;
}

export async function getBannersById(id: string): Promise<BannerFile> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/banners/${id}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
}

export async function deleteFile(bannerId: string): Promise<void> {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/banners/${bannerId}`, {
    withCredentials: true,
  });
}
