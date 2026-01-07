import Users from "@/components/pages/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Usuários",
  description: "Página de visualização de dados",
};

export default async function UsersPage() {
//   const isAuth = await checkAuth();

//   if (!isAuth) redirect("/admin");

  return <Users />;
}