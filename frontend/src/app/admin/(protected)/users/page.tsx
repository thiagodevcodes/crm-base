import Users from "@/components/admin/pages/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Usuários",
  description: "Página de visualização de dados",
};

export default async function UsersPage() {
  return <Users />;
}
