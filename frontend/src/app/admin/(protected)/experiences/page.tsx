import Experiences from "@/modules/experiences/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Experiências",
  description: "Página de visualização de dados",
};

export default async function ExperiencesPage() {
  return <Experiences />;
}
