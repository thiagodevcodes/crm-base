import { EditView } from "@/modules/experiences/views/edit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Editar Experiência",
  description: "Editar Experiência",
};

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditView title="Editar Experiência" id={id} />;
}
