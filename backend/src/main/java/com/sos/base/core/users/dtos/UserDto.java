package com.sos.base.core.users.dtos;

import java.util.List;

import com.sos.base.core.users.UserEntity;

public record UserDto(
      UserEntity user,
      List<String> roles,
      List<String> permissions) {
}