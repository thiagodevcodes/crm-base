"use client";

import { Controller, useForm } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { useEffect, useState } from "react";
import { getPermissions } from "@/modules/permissions/services/permission";
import {
  Permission,
  PermissionOption,
} from "@/modules/permissions/types/permission";
import { Role, RoleFormData } from "../types/role";

type Props = {
  title: string;
  onSubmit: (data: RoleFormData) => Promise<void>;
};

export function RegisterRoleForm({ onSubmit, title }: Props) {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoleFormData>();

  async function handleFormSubmit(data: RoleFormData) {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      console.error("Erro ao cadastrar role:", err);
    }
  }

  async function loadPermissions() {
    const res = await getPermissions();
    setPermissions(res);
  }

  const permissionOptions: PermissionOption[] = permissions.map(
    (permission) => ({
      value: permission.name,
      label: permission.name,
    }),
  );

  useEffect(() => {
    loadPermissions();
  }, []);

  const darkSelectStyles: StylesConfig<PermissionOption, true> = {
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

        <div>
          <Controller
            control={control}
            name="permissions"
            rules={{
              validate: (value) =>
                (value && value.length > 0) ||
                "Selecione pelo menos uma permissão",
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={permissionOptions}
                isMulti
                placeholder="Selecione as permissões"
                styles={darkSelectStyles}
              />
            )}
          />

          {errors.permissions && (
            <p className="text-red-400 text-sm">
              {errors.permissions.message as string}
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
