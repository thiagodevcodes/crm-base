import { createContext, ReactNode, useContext } from "react";
import { useExperiences } from "../hooks/useExperiences";
import React from "react";
import { Experience } from "../types";

type ExperienceContextType = {
  experiences: Experience[];
  loading: boolean;
  fetchExperiences: () => Promise<void>;
  addExperience: (experience: Experience) => Promise<void>;
  fetchExperience: (id: string) => Promise<Experience>;
  editExperience: (id: string, experience: Experience) => Promise<void>;
  removeExperience: (id: string) => Promise<void>;
};

const ExperienceContext = createContext<ExperienceContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function ExperienceProvider({ children }: Props) {
  const experiencesState = useExperiences();

  return (
    <ExperienceContext.Provider value={experiencesState}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperienceContext() {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error("useExperienceContext must be used within ExperienceProvider");
  }

  return context;
}