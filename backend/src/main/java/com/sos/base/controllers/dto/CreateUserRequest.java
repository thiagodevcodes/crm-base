package com.sos.base.controllers.dto;

import java.util.Set;

public record CreateUserRequest(
    String name,
    String username,
    String password,
    Set<String> roles
) {}