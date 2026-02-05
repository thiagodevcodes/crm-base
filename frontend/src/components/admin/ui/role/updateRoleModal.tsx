"use client";

import { Controller, useForm } from "react-hook-form";
import Select, { ControlProps, GroupBase, StylesConfig } from "react-select";
import { Role, RoleFormData, RoleOption } from "@/types/role";
import { CSSObjectWithLabel } from "react-select";
import { useEffect, useState } from "react";
import { Permission } from "@/types/permission";
import { getPermissions } from "@/services/permission";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RoleFormData) => Promise<void>; // recebe dados do formulário
  selectedRole?: Role | null;
};

export function UpdateRoleModal({
  isOpen,
  onClose,
  onSubmit,
  selectedRole,
  title,
}: Props) {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RoleFormData>({
    defaultValues: {
      name: selectedRole?.name,
    },
  });

  useEffect(() => {
    if (selectedRole) {
      reset({
        name: selectedRole.name,
        permissions: selectedRole.permissions.map((permission) => ({
          value: permission.name,
          label: permission.name,
        })),
      });
    } else {
      reset();
    }
  }, [selectedRole, reset]);

  async function handleFormSubmit(data: RoleFormData) {
    try {
      await onSubmit(data);
      reset();
      onClose();
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
    if (isOpen) {
      loadPermissions();
    }
  }, [isOpen, selectedRole]);

  const darkSelectStyles: StylesConfig<
    RoleOption,
    true,
    GroupBase<RoleOption>
  > = {
    control: (
      base: CSSObjectWithLabel,
      state: ControlProps<RoleOption, true, GroupBase<RoleOption>>,
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

        {/* Role */}
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
                options={roleOptions}
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
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
