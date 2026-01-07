package com.sos.base.core.users.dtos;

import java.util.Set;

public record UpdateUserRequest(
    String name,
    String username,
    Set<String> roles
) {}