import { EditView } from "@/modules/users/views/edit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Editar Usuário",
  description: "Página de edição de usuário",
};

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditView title="Editar Usuário" id={id} />;
}
