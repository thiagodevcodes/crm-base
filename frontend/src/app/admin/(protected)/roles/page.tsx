import Roles from "@/components/admin/pages/roles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Usuários",
  description: "Página de visualização de dados",
};

export default async function RolesPage() {
  //   const isAuth = await checkAuth();

  //   if (!isAuth) redirect("/admin");

  return <Roles />;
}
