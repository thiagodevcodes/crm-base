package com.sos.base.core.permissions.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdatePermissionRequest(
      @NotBlank(message = "Nome da permissão é obrigatório") String name) {
}