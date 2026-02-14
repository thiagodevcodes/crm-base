package com.sos.base.core.permissions.dtos;

import java.util.List;

import com.sos.base.core.users.UserEntity;

public record PermissionDto(
      UserEntity user,
      List<String> roles,
      List<String> permissions) {
}