package com.sos.base.core.users.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdatePasswordRequest(
      @NotBlank String password) {
}