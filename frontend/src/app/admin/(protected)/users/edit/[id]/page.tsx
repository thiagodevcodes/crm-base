import { UpdateExperienceForm } from "@/modules/experiences/components/updateExperienceForm";
import { UpdateUserForm } from "@/modules/users/components/updateUserForm";
import { Metadata } from "next";

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <UpdateUserForm title="Editar Usuário" id={id} />;
}
