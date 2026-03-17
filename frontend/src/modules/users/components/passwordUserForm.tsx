"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { User, UserFormData } from "../types/user";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => Promise<void>; // recebe dados do formulário
  selectedUser?: User | null;
};

export function PasswordForm({
  onClose,
  onSubmit,
  selectedUser,
  title,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>();

  const password = watch("password");

  useEffect(() => {
    if (!selectedUser) return;

    reset({
      name: selectedUser.name,
      username: selectedUser.username,
      password: "",
      confirmPassword: "",
    });
  }, [selectedUser, reset]);

  async function handleFormSubmit(data: UserFormData) {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">{title}</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: { value: 6, message: "Mínimo de 6 caracteres" },
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirmar senha"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("confirmPassword", {
              required: "Confirme a senha",
              validate: (value) =>
                value === password || "As senhas não coincidem",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
