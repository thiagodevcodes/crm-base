package com.sos.base.core.roles.dtos;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record UpdateRoleRequest(
      @NotBlank String name,
      @NotEmpty Set<String> permissions) {
}