package com.sos.base.core.users.dtos;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record CreateUserRequest(
      @NotBlank String name,
      @NotBlank String username,
      String password,
      @NotEmpty Set<String> roles) {
}