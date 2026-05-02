import { UpdateRoleForm } from "@/modules/roles/components/updateRoleForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Experiências",
  description: "Editar Experiência",
};

export default async function RolesPage({ params }: { params: { id: string } }) {
  return <UpdateRoleForm title="Editar Função" id={params.id} />;
}
