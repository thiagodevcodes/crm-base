import { useEffect, useState } from "react";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} from "../services/experiences";
import { Experience } from "../types/experiences";

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);

  // READ
  const fetchExperiences = async () => {
    setLoading(true);
    const data = await getExperiences();
    setExperiences(data);
    setLoading(false);
  };

  // CREATE
  const addExperience = async (experience: Experience) => {
    const newExp = await createExperience(experience.title, experience.description, experience.period, experience.technologies);
    setExperiences((prev) => [...prev, newExp]);
  };

  // UPDATE
  const editExperience = async (id: string, experience: Experience) => {
    const updated = await updateExperience(id, experience.title, experience.description, experience.period, experience.technologies);

    setExperiences((prev) =>
      prev.map((exp) => (exp.experienceId === id ? updated : exp))
    );
  };

  // DELETE
  const removeExperience = async (id: string) => {
    await deleteExperience(id);

    setExperiences((prev) =>
      prev.filter((exp) => exp.experienceId !== id)
    );
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loading,
    fetchExperiences,
    addExperience,
    editExperience,
    removeExperience
  };
}