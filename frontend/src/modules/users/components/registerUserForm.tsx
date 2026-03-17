"use client";

import { Controller, useForm } from "react-hook-form";
import Select, { ControlProps, GroupBase, StylesConfig } from "react-select";
import { CSSObjectWithLabel } from "react-select";
import { useEffect, useState } from "react";
import { getRoles } from "@/modules/roles/services/role";
import { User, UserFormData } from "../types/user";
import { Role, RoleOption } from "@/modules/roles/types/role";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => Promise<void>; // recebe dados do formulário
  selectedUser?: User | null;
};

export function RegisterUserForm({
  onSubmit,
  selectedUser,
  title,
  isOpen,
}: Props) {
  const [roles, setRoles] = useState<Role[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      username: selectedUser?.username,
      name: selectedUser?.name,
      roles: [],
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (!selectedUser) return;

    reset({
      username: selectedUser.username,
      name: selectedUser.name,
      roles: selectedUser.roles.map((role) => ({
        value: role.name,
        label: role.name,
      })),
    });
  }, [selectedUser, reset]);

  async function handleFormSubmit(data: UserFormData) {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
    }
  }

  const roleOptions: RoleOption[] = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  useEffect(() => {
    if (!isOpen) return;

    getRoles().then(setRoles);
  }, [isOpen]);

  const darkSelectStyles: StylesConfig<RoleOption, true> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#1e293b",
      borderColor: state.isFocused ? "white" : "#1e293b",
      boxShadow: "none",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
    }),
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">{title}</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 rounded bg-slate-800 text-white"
          {...register("name", { required: "Nome é obrigatório" })}
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-800 text-white"
          {...register("username", {
            required: "Email é obrigatório",
            minLength: { value: 3, message: "Mínimo de 3 caracteres" },
          })}
        />
        {errors.username && (
          <p className="text-red-400 text-sm">{errors.username.message}</p>
        )}

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 rounded bg-slate-800 text-white"
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "Mínimo de 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}

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

        <Controller
          control={control}
          name="roles"
          render={({ field }) => (
            <Select<RoleOption, true>
              options={roleOptions}
              isMulti
              placeholder="Selecione as roles"
              value={field.value}
              onChange={field.onChange}
              styles={darkSelectStyles}
            />
          )}
        />

        {errors.roles && (
          <p className="text-red-400 text-sm">
            {errors.roles.message as string}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
