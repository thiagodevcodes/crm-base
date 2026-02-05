package com.sos.base.core.roles.dtos;

import java.util.Set;

public record UpdateRoleRequest(
      String name,
      String username,
      Set<String> permissions) {
}