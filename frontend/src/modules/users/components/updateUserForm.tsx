"use client";

import { Controller, useForm } from "react-hook-form";
import Select, {
  StylesConfig,
} from "react-select";
import { useEffect, useState } from "react";

import { User, UserFormData } from "../types/user";
import { getRoles } from "@/modules/roles/services/role";
import { Role, RoleOption } from "@/modules/roles/types/role";

type Props = {
  title: string;
  onSubmit: (data: UserFormData) => Promise<void>;
  selectedUser?: User | null;
};

export function UpdateUserForm({
  onSubmit,
  selectedUser,
  title,
}: Props) {
  const [roles, setRoles] = useState<Role[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      username: "",
      roles: [],
    },
  });

  const roleOptions: RoleOption[] = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));


  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    reset({
      name: selectedUser.name,
      username: selectedUser.username,
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
          className="w-full bg-[#0d8cd7] hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
