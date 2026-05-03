import { NewView } from "@/modules/experiences/views/new";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Cadastrar Experiência",
  description: "Cadastro de Experiências",
};

export default async function ExperiencesPage() {
  return <NewView title="Cadastrar Experiência" />;
}
