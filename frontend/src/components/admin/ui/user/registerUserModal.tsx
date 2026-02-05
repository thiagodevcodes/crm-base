"use client";

import { Controller, useForm } from "react-hook-form";
import { User, UserFormData } from "@/types/user";
import Select, { ControlProps, GroupBase, StylesConfig } from "react-select";
import { Role, RoleOption } from "@/types/role";
import { CSSObjectWithLabel } from "react-select";
import { useEffect, useState } from "react";
import { getRoles } from "@/services/role";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => Promise<void>; // recebe dados do formulário
  selectedUser?: User | null;
};

export function RegisterUserModal({ onSubmit, selectedUser, title }: Props) {
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
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (selectedUser) {
      reset({
        name: selectedUser.name,
        username: selectedUser.username,
        password: "",
        confirmPassword: "",
        roles: selectedUser.roles.map((role) => ({
          value: role.name,
          label: role.name,
        })),
      });
    } else {
      reset();
    }
  }, [selectedUser, reset]);

  async function handleFormSubmit(data: UserFormData) {
    try {
      await onSubmit(data); // chama o prop onSubmit do pai
      reset(); // limpa o formulário // fecha o modal
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
    }
  }

  async function loadRoles() {
    const res = await getRoles();
    setRoles(res);
  }

  const roleOptions: RoleOption[] = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  useEffect(() => {
    loadRoles();
  }, []);

  const darkSelectStyles: StylesConfig<
    RoleOption,
    true,
    GroupBase<RoleOption>
  > = {
    control: (
      base: CSSObjectWithLabel,
      state: ControlProps<RoleOption, true, GroupBase<RoleOption>>
    ) => ({
      ...base,
      backgroundColor: "#1e293b",
      borderColor: state.isFocused ? "white" : "#1e293b",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#1e293b",
      },
    }),

    placeholder: (base: CSSObjectWithLabel) => ({
      ...base,
      color: "#94a3b8",
    }),
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">{title}</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Nome */}
        <div>
          <input
            type="text"
            placeholder="Nome"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("name", {
              required: "Nome é obrigatório",
            })}
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-slate-800 text-white"
            {...register("username", {
              required: "Email é obrigatório",
              minLength: {
                value: 3,
                message: "Mínimo de 3 caracteres",
              },
            })}
          />
          {errors.username && (
            <p className="text-red-400 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Senha */}
        <div>
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
        </div>

        {/* Confirmação */}
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

        {/* Role */}
        <div>
          <Controller
            control={control}
            name="roles"
            rules={{
              validate: (value) =>
                (value && value.length > 0) || "Selecione pelo menos uma role",
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={roleOptions}
                isMulti
                placeholder="Selecione as roles"
                styles={darkSelectStyles}
              />
            )}
          />

          {errors.roles && (
            <p className="text-red-400 text-sm">
              {errors.roles.message as string}
            </p>
          )}
        </div>

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
