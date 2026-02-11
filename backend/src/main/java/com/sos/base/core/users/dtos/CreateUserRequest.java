package com.sos.base.core.users.dtos;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record CreateUserRequest(
      @NotBlank(message = "Nome é obrigatório") String name,
      @NotBlank(message = "Nome de usuário é obrigatório") String username,
      @NotBlank(message = "Senha é obrigatória") String password,
      @NotEmpty(message = "Pelo menos uma role deve ser informada") Set<String> roles) {
}