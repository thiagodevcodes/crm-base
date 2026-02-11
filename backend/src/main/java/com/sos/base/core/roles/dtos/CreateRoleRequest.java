package com.sos.base.core.roles.dtos;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;

public record CreateRoleRequest(
      String roleId,
      @NotBlank(message = "Nome da role é obrigatório") String name,
      @NotBlank(message = "Permissões são obrigatórias") Set<String> permissions) {
}