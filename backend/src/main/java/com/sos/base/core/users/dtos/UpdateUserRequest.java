package com.sos.base.core.users.dtos;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record UpdateUserRequest(
      @NotBlank String name,
      @NotBlank String username,
      @NotEmpty Set<String> roles) {
}