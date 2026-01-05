package com.sos.base.controllers.dto;

import java.util.Set;

public record UpdateUserRequest(
    String name,
    String username,
    Set<String> roles
) {}