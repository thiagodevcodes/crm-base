import { BannerFile } from "@/types/image";
import axios from "axios";

export async function uploadFile(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", image); // nome deve bater com @RequestParam do backend

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/banners/upload`,

    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data; // pode retornar o nome do arquivo ou caminho
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

export async function deleteFile(bannerId: string): Promise<void> {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/banners/${bannerId}`, {
    withCredentials: true,
  });
}
