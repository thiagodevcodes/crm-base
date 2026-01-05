package com.sos.base.controllers.dto;

import java.util.Set;

public record CreateUserRequest(
    String name,
    String email,
    String password,
    Set<String> roles
) {}