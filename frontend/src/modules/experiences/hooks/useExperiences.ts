import { useEffect, useState } from "react";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getExperience,
  getCount,
} from "../services/experiences";
import { Experience } from "../types";
import { delay } from "@/shared/utils/functions";

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [countExperiences, setCountExperiences] = useState<number>(0);
  const [loadingData, setLoadingData] = useState(false);

  // COUNT
  const getCountExperiences = async () => {
    const data = await getCount();
    setCountExperiences(data);
    return data;
  };

  // READ
  const fetchExperience = async (id: string) => {
    const data = await getExperience(id);
    return data;
  };

  // READ
  const fetchExperiences = async () => {
    setLoadingData(true);
    const data = await getExperiences();
    await delay(1000);
    setExperiences(data);
    setLoadingData(false);
  };

  // CREATE
  const addExperience = async (experience: Experience) => {
    const newExp = await createExperience(
      experience.title,
      experience.description,
      experience.period,
      experience.technologies,
    );
    setExperiences((prev) => [...prev, newExp]);
  };

  // UPDATE
  const editExperience = async (id: string, experience: Experience) => {
    const updated = await updateExperience(
      id,
      experience.title,
      experience.description,
      experience.period,
      experience.technologies,
    );

    setExperiences((prev) =>
      prev.map((exp) => (exp.experienceId === id ? updated : exp)),
    );
  };

  // DELETE
  const removeExperience = async (id: string) => {
    await deleteExperience(id);

    setExperiences((prev) => prev.filter((exp) => exp.experienceId !== id));
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loadingData,
    fetchExperiences,
    fetchExperience,
    addExperience,
    getCountExperiences,
    editExperience,
    removeExperience,
    countExperiences
  };
}
