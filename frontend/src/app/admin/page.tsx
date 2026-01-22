import LoginForm from "@/components/admin/pages/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Login",
  description: "Página para logar no sistema",
};

export default async function LoginPage() {
  return <LoginForm />;
}
