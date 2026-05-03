
import { PasswordView } from "@/modules/users/views/password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM - Redefinir Senha",
  description: "Página para redefinir a senha do usuário",
};

export default async function UserPasswordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PasswordView title="Editar Senha" id={id} />;
}
