package com.sos.base.core.roles.dtos;

import java.util.Set;

public record CreateRoleRequest(
      String roleId,
      String name,
      Set<String> permissions) {
}