import DashboardClient from "@/pages/dashboard";
import Users from "@/pages/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Usuários",
  description: "Página de visualização de dados",
};

export default function UsersPage() {
  // Aqui você pode fazer fetch server-side se precisar
  // Ex: dados iniciais ou verificações via cookies

  return <Users />;
}