package com.sos.base.controllers.dto;

public record UpdateUserRequest(
    String name,
    String username
) {}