import { NewView } from "@/modules/users/views/new";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Cadastrar Usuário",
  description: "Cadastro de Usuários",
};

export default async function ExperiencesPage() {
  return <NewView title="Cadastrar Usuário" />;
}
