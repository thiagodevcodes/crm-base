"use client";

import { Controller, useForm } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { Role, RoleFormData, RoleOption } from "../types";
import { useEffect, useState } from "react";
import { Permission } from "@/modules/permissions/types";
import { getPermissions } from "@/modules/permissions/services/permission";
import { useRoles } from "../hooks/useRoles";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  title: string;
};

export function UpdateRoleForm({ id, title }: Props) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const { editRole, fetchRole } = useRoles();
  const [roleData, setRoleData] = useState<Role | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const data = await fetchRole(id);
      setRoleData(data);
    }
    if (id) load();
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoleFormData>({
    defaultValues: {
      name: roleData?.name,
    },
  });

  useEffect(() => {
    if (roleData) {
      reset({
        name: roleData.name,
        permissions: roleData.permissions.map((permission) => ({
          value: permission.name,
          label: permission.name,
        })),
      });
    } else {
      reset();
    }
  }, [roleData, reset]);

  async function handleFormSubmit(data: RoleFormData) {
    try {
      await editRole(id, data);
      reset();
      router.push("/admin/roles");
      router.refresh();
    } catch (err) {
      console.error("Erro ao atualizar função:", err);
    }
  }

  async function loadPermissions() {
    const allPermissions = await getPermissions();
    setPermissions(allPermissions);
  }

  const roleOptions: RoleOption[] = permissions.map((permission) => ({
    value: permission.name,
    label: permission.name,
  }));

  useEffect(() => {
    loadPermissions();
  }, [roleData]);

  const darkSelectStyles: StylesConfig<RoleOption, true> = {
    control: (base, state) => ({
      ...base,
      boxShadow: "none",
      marginTop: "0.75rem",
      padding: "0.15rem",
      borderColor: state.isFocused ? "black" : "#d1d5dc",
      outline: state.isFocused ? "1px solid black" : "none",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
    }),
  };

  return (
    <div className="px-10">
      <div className="py-8">
        <h1 className="text-2xl font-bold">{title} - {roleData?.name}</h1>
        <p>Bem-vindo ao painel de edição de Perfis de Usuário!</p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="font-bold" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              placeholder="Nome"
              className="w-full p-2 rounded text-black border border-gray-300 mt-3 focus:outline-2"
              {...register("name", {
                required: "Nome é obrigatório",
              })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="font-bold" htmlFor="permissions">
              Permissões
            </label>
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
                  options={roleOptions}
                  isMulti
                  placeholder="Selecione as permissões"
                  styles={darkSelectStyles}
                  instanceId="permissions-select"
                />
              )}
            />

            {errors.permissions && (
              <p className="text-red-400 text-sm">
                {errors.permissions.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-start gap-5 items-center mt-10">
          <button
            disabled={isSubmitting}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50 cursor-pointer max-w-60"
          >
            {isSubmitting ? "Atualizando..." : "Atualizar"}
          </button>
          <Link
            href={"/admin/roles"}
            className="w-full bg-[#0d8cd7] hover:bg-blue-700 transition text-white text-center py-2 rounded disabled:opacity-50 cursor-pointer max-w-60 "
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
