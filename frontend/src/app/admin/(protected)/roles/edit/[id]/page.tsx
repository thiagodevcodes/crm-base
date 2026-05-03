import { UpdateRoleForm } from "@/modules/roles/components/updateRoleForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Experiências",
  description: "Editar Experiência",
};

export default async function RolesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;

  return <UpdateRoleForm title="Editar Função" id={id} />;
}
