import Users from "@/components/pages/users";
import { checkAuth } from "@/utils/checkAuth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CRM - Usuários",
  description: "Página de visualização de dados",
};

export default async function UsersPage() {
  const authenticated = await checkAuth();

  if (!authenticated) redirect("/admin");

  return <Users />;
}