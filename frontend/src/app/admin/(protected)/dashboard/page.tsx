import DashboardClient from "@/components/pages/dashboard";
import { checkAuth } from "@/utils/checkAuth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CRM - Dashboard",
  description: "Página de visualização de dados",
};

export default async function DashboardPage() {
  const authenticated = await checkAuth();

  if (!authenticated) redirect("/admin");

  return <DashboardClient />;
}
