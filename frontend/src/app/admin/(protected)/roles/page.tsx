
import Roles from "@/modules/roles/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Perfis de Usuários",
  description: "Página de visualização de dados",
};

export default async function RolesPage() {
  return <Roles />;
}
