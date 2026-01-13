package com.sos.base.core.users.dtos;

import java.util.Set;

public record CreateUserRequest(
      String name,
      String username,
      String password,
      Set<String> roles) {
}