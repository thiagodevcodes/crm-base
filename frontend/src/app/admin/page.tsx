import LoginForm from "@/components/pages/login";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkAuth } from "@/utils/checkAuth";

export const metadata: Metadata = {
  title: "CRM - Login",
  description: "Página para logar no sistema",
};

export default async function LoginPage() {
  const authenticated = await checkAuth();

  if (authenticated) redirect("/admin/dashboard");

  return <LoginForm />;
}