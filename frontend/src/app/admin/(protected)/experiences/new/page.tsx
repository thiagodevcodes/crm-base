import { RegisterExperienceForm } from "@/modules/experiences/components/registerExperienceForm";
import Experiences from "@/modules/experiences/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Experiências",
  description: "Cadastro de Experiências",
};

export default async function ExperiencesPage() {
  return <RegisterExperienceForm title="Cadastrar Experiência" />;
}
