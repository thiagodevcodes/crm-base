import { RegisterRoleForm } from "@/modules/roles/components/registerRoleForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Perfis",
  description: "Cadastro de Perfis",
};

export default async function RolesPage() {
  return <RegisterRoleForm title="Cadastrar Perfil" />;
}
