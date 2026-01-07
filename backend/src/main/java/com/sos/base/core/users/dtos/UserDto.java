package com.sos.base.core.users.dtos;

import java.util.List;

import com.sos.base.core.users.User;

public record UserDto(
    User user,
    List<String> roles,
    List<String> permissions
) {}