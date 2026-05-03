import { NewView } from "@/modules/roles/views/new";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Cadastrar Perfil",
  description: "Cadastro de Perfis",
};

export default async function RolesPage() {
  return <NewView title="Cadastrar Perfil" />;
}
