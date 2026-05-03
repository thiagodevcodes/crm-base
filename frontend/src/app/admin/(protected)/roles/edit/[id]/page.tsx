import { EditView } from "@/modules/roles/views/edit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Editar Perfil",
  description: "Editar Perfil",
};

export default async function RolesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;

  return <EditView title="Editar Função" id={id} />;
}
