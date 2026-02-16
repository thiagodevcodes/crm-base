import { ImageFile } from "@/types/image";
import axios from "axios";

export async function uploadFile(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", image); // nome deve bater com @RequestParam do backend

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/images/upload`,

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

export async function getFiles(): Promise<ImageFile[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/images`,
    {
      withCredentials: true,
    },
  );

  return response.data;
}

export async function deleteFile(uploadId: string): Promise<void> {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/images/${uploadId}`, {
    withCredentials: true,
  });
}
