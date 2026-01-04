package com.sos.base.controllers.dto;

public record CreateUserRequest(
    String name,
    String email,
    String password
) {}