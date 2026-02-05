package com.sos.base.core.roles.dtos;

import java.util.List;

import com.sos.base.core.users.UserEntity;

public record RoleDto(
      UserEntity user,
      List<String> roles,
      List<String> permissions) {
}