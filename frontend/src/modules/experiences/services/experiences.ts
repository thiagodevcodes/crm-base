import { Experience } from "@/modules/experiences/types/experiences";
import axios from "axios";

export async function getExperiences(): Promise<Experience[]> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/experiences`, {
    withCredentials: true,
  });

  return response.data;
}

export async function createExperience(
  title: string,
  description: string,
  period: string,
  technologies: string
): Promise<Experience> {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/experiences`,
    { title, description, period, technologies },
    { withCredentials: true },
  );

  return response.data;
}

export async function deleteExperience(experienceId: string): Promise<void> {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/experiences/${experienceId}`, {
    withCredentials: true,
  });
}

export async function updateExperience(
  id: string,
  title: string,
  description: string,
  period: string,
  technologies: string
): Promise<Experience> {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/experiences/${id}`,
    { title, description, period, technologies },
    { withCredentials: true },
  );

  return response.data;
}
