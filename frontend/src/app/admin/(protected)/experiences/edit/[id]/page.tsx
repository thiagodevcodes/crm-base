import { UpdateExperienceForm } from "@/modules/experiences/components/updateExperienceForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Experiências",
  description: "Editar Experiência",
};

export default async function ExperiencesPage({ params }: { params: { id: string } }) {
  return <UpdateExperienceForm title="Editar Experiência" id={params.id} />;
}
